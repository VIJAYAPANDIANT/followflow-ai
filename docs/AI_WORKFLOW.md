# AI Workflow & Architecture — FollowFlow AI

## System Data Flow Diagram

```
Sales Conversation / Meeting Notes / Customer Email
                        │
                        ▼
            AI Conversation Analyzer
                        │
                        ▼
           Extract Customer Information
                        │
                        ▼
  Detect Intent, Pain Points, Objections & Buying Signals
                        │
                        ▼
            Calculate Priority Score (0-100)
                        │
                        ▼
           Determine Follow-Up Urgency
                        │
                        ▼
            Recommend Next Best Action
                        │
                        ▼
            Add Lead to Follow-Up Queue
                        │
                        ▼
        Generate Personalized Follow-Up Message
      (Email / LinkedIn / WhatsApp in Selected Tone)
                        │
                        ▼
         Sales Representative Contacts Customer
```

---

## Step-by-Step AI Execution Process

1. **Ingestion**: Raw text (sales call transcripts, notes, emails) is passed to the AI Analyzer module.
2. **Parsing & Inference**: Google Gemini 3.7 Flash AI analyzes the text using structured JSON prompt schemas.
3. **Intelligence Extraction**:
   - Identifies lead name, company name, and job title.
   - Categorizes intent and commercial urgency.
   - Extracts pain points, objections, and buying signals.
4. **Scoring Engine**: Evaluates commercial purchase intent, explicitly stated deadlines, and time sensitivity to generate a score from `0` to `100`.
5. **Action Recommendation**: Formulates the optimal next sales step.
6. **Queue Management**: Saves structured output to application state and local storage.
7. **Contextual Generation**: Converts structured lead metadata into tailored follow-up copy tailored for Email, LinkedIn, or WhatsApp.

---

## Real-World Concrete Example

### 📥 Raw Input (Customer Conversation Summary)
```text
Hi, I'm Sarah Johnson, VP of Operations at Acme Corp. We had a great meeting today discussing our team's operational challenges. We are currently evaluating an Enterprise Plan to automate our manual workflows and eliminate reporting delays. We need finance team approval before finalizing, but if the pricing works for our budget, we want to make a decision by Friday.
```

### 🧠 AI Analysis Output
```json
{
  "leadName": "Sarah Johnson",
  "company": "Acme Corp",
  "role": "VP of Operations",
  "interestLevel": "High",
  "priorityScore": 96,
  "priority": "Critical",
  "customerIntent": "Evaluating Enterprise Plan for workflow automation & reporting",
  "painPoints": [
    "Workflow automation",
    "Reporting inefficiency"
  ],
  "objections": [
    "Requires finance approval"
  ],
  "buyingSignals": [
    "Asked for pricing details",
    "Wants to make a decision by Friday"
  ],
  "followUpRequired": true,
  "urgency": "High",
  "followUpDeadline": "Friday",
  "nextBestAction": "Send Enterprise pricing details and schedule follow-up call.",
  "riskLevel": "High if follow-up is delayed"
}
```

### ✉️ AI-Generated Follow-Up Email Output
```text
Subject: Follow-up: Enterprise Plan next steps for Acme Corp

Dear Sarah,

Thank you for your time during our conversation today regarding Acme Corp.

I am following up regarding your evaluation of our Enterprise Plan to address workflow automation and eliminate reporting delays for your operations team.

Regarding your finance team approval process, we can provide customized pricing options and documentation to make their review seamless before Friday.

As a recommended next step, I would like to send over the Enterprise pricing proposal and schedule a brief 10-minute call tomorrow.

Sincerely,
Vijayapandian T
FollowFlow AI
```
