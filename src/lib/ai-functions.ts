import { createServerFn } from "@tanstack/react-start";

export type AnalysisResult = {
  leadName: string;
  company: string;
  interestLevel: string;
  customerIntent: string;
  painPoints: string[];
  objections: string[];
  buyingSignals: string[];
  followUpRequired: boolean;
  urgency: string;
  followUpDeadline: string;
  priorityScore: number;
  nextBestAction: string;
  riskLevel: string;
};

export type GenerateMessageInput = {
  leadName: string;
  company: string;
  customerIntent: string;
  painPoints: string[];
  objections: string[];
  buyingSignals: string[];
  nextBestAction: string;
  channel: "Email" | "LinkedIn Message" | "WhatsApp Message";
  tone: "Professional" | "Friendly" | "Concise" | "Persuasive";
};

export type GeneratedMessageResult = {
  subject?: string;
  body: string;
};

const GEMINI_MODELS = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-1.5-flash",
];

async function callGemini(prompt: string, systemInstruction?: string): Promise<string> {
  const apiKey = process.env["GEMINI_API_KEY"];
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not configured.");
  }

  let lastError: Error | null = null;

  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const payload: Record<string, unknown> = {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      };

      if (systemInstruction) {
        payload["systemInstruction"] = {
          parts: [{ text: systemInstruction }],
        };
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.warn(`Gemini model ${model} failed (${response.status}): ${errText}`);
        lastError = new Error(`Gemini API error (${response.status}): ${errText}`);
        continue;
      }

      const data = (await response.json()) as {
        candidates?: Array<{
          content?: {
            parts?: Array<{ text?: string }>;
          };
        }>;
      };

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return text;
      }
    } catch (err: unknown) {
      console.warn(`Error calling Gemini model ${model}:`, err);
      lastError = err instanceof Error ? err : new Error(String(err));
    }
  }

  throw lastError || new Error("Failed to generate content from Gemini API.");
}

export const analyzeConversationFn = createServerFn({ method: "POST" })
  .validator((data: { text: string }) => data)
  .handler(async ({ data }): Promise<AnalysisResult> => {
    if (!data.text || data.text.trim().length === 0) {
      throw new Error("Conversation text cannot be empty.");
    }

    const systemPrompt = `You are FollowFlow AI, an intelligent AI-powered sales follow-up agent.

Your role is to analyze sales conversations, meeting notes, and customer emails and convert them into actionable sales follow-up insights.

You must:
1. Identify the customer or prospect.
2. Identify the company.
3. Determine customer intent.
4. Identify pain points.
5. Identify objections.
6. Detect buying signals.
7. Determine whether follow-up is required.
8. Identify urgency.
9. Identify deadlines.
10. Calculate a priority score between 0 and 100.
11. Recommend the next best action.
12. Estimate the risk of the lead going cold.

Priority scoring guidelines:
90-100: Critical (The prospect has strong purchase intent and an urgent follow-up requirement.)
75-89: High (Strong interest and follow-up is important.)
50-74: Medium (Moderate interest or follow-up required without immediate urgency.)
0-49: Low (Low engagement or no immediate follow-up required.)

Consider:
- Purchase intent
- Urgency
- Explicit follow-up requests
- Deadlines
- Buying signals
- Objections
- Risk of the lead going cold
- Time since the previous interaction

Return ONLY valid JSON with this exact structure:
{
  "leadName": "",
  "company": "",
  "interestLevel": "",
  "customerIntent": "",
  "painPoints": [],
  "objections": [],
  "buyingSignals": [],
  "followUpRequired": false,
  "urgency": "",
  "followUpDeadline": "",
  "priorityScore": 0,
  "nextBestAction": "",
  "riskLevel": ""
}

Do not surround the JSON with markdown code fences (no \`\`\`json). Return raw JSON only.`;

    const userPrompt = `Analyze the following sales conversation:\n\n${data.text}`;

    const rawResponse = await callGemini(userPrompt, systemPrompt);

    // Clean JSON response (strip any accidental markdown code fences)
    let cleaned = rawResponse.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();
    }

    try {
      const parsed = JSON.parse(cleaned) as AnalysisResult;

      return {
        leadName: parsed.leadName || "Unknown Prospect",
        company: parsed.company || "Unknown Company",
        interestLevel: parsed.interestLevel || "Medium",
        customerIntent: parsed.customerIntent || "Evaluation",
        painPoints: Array.isArray(parsed.painPoints) ? parsed.painPoints : [],
        objections: Array.isArray(parsed.objections) ? parsed.objections : typeof parsed.objections === 'string' ? [parsed.objections] : [],
        buyingSignals: Array.isArray(parsed.buyingSignals) ? parsed.buyingSignals : typeof parsed.buyingSignals === 'string' ? [parsed.buyingSignals] : [],
        followUpRequired: typeof parsed.followUpRequired === "boolean" ? parsed.followUpRequired : true,
        urgency: parsed.urgency || "Medium",
        followUpDeadline: parsed.followUpDeadline || "Within 3 days",
        priorityScore: typeof parsed.priorityScore === "number" ? parsed.priorityScore : 75,
        nextBestAction: parsed.nextBestAction || "Send follow-up email",
        riskLevel: parsed.riskLevel || "Medium",
      };
    } catch (e) {
      console.error("Failed to parse Gemini JSON response:", cleaned);
      throw new Error("Unable to parse AI response. Please try again.");
    }
  });

export const generateFollowUpMessageFn = createServerFn({ method: "POST" })
  .validator((data: GenerateMessageInput) => data)
  .handler(async ({ data }): Promise<GeneratedMessageResult> => {
    const systemPrompt = `You are an expert sales follow-up assistant.

Generate a personalized follow-up message using the provided customer context.

The message must:
- Mention relevant details from the previous conversation.
- Be specific to the customer's pain points.
- Address objections naturally.
- Include the recommended next action.
- Include a clear call to action.
- Be concise.
- Avoid robotic language.

Adapt the format based on the selected communication channel (${data.channel}) and tone (${data.tone}).

For Email:
The first line MUST be: "Subject: <compelling subject line>"
Followed by a blank line, and then the complete email body.

For LinkedIn Message and WhatsApp Message:
Provide ONLY the message body. Do NOT include a Subject line.`;

    const userPrompt = `Customer Context:
- Prospect Name: ${data.leadName}
- Company: ${data.company}
- Customer Intent: ${data.customerIntent}
- Pain Points: ${(data.painPoints || []).join(", ")}
- Objections: ${(data.objections || []).join(", ")}
- Buying Signals: ${(data.buyingSignals || []).join(", ")}
- Recommended Next Action: ${data.nextBestAction}
- Communication Channel: ${data.channel}
- Tone: ${data.tone}`;

    const text = await callGemini(userPrompt, systemPrompt);
    let trimmed = text.trim();

    if (data.channel === "Email") {
      const subjectMatch = trimmed.match(/^Subject:\s*(.+)$/m);
      if (subjectMatch) {
        const subject = subjectMatch[1]?.trim() || `Follow-up for ${data.company}`;
        const body = trimmed.replace(/^Subject:\s*.+\n*/, "").trim();
        return { subject, body };
      }
      return {
        subject: `Follow-up: Next steps for ${data.company}`,
        body: trimmed,
      };
    }

    return { body: trimmed };
  });
