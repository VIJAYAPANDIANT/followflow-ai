# End-to-End User Journey Flow — FollowFlow AI

Below is the complete 15-step operational user journey from opening the application to sending a personalized sales follow-up message:

---

```
 [1] User opens Dashboard
          │
          ▼
 [2] Views AI Priority Queue & High-Priority Leads
          │
          ▼
 [3] Navigates to AI Conversation Analyzer (/analyzer)
          │
          ▼
 [4] Pastes sales conversation notes or transcript
          │
          ▼
 [5] Clicks "Analyze Conversation with AI" button
          │
          ▼
 [6] AI extracts lead info, intent, pain points, objections & signals
          │
          ▼
 [7] AI calculates Priority Score (e.g. 96/100 Critical)
          │
          ▼
 [8] AI recommends Next Best Action
          │
          ▼
 [9] User clicks "Add to Follow-Up Queue" button
          │
          ▼
 [10] User navigates to AI Follow-Up Generator (/generator)
          │
          ▼
 [11] User selects channel: Email, LinkedIn, or WhatsApp
          │
          ▼
 [12] User selects tone: Professional, Friendly, Concise, or Persuasive
          │
          ▼
 [13] AI generates personalized follow-up message
          │
          ▼
 [14] Sales representative copies and sends message to prospect
          │
          ▼
 [15] Follow-up task is marked as Complete in queue
```

---

## Detailed Step Description

1. **Dashboard Access**: Sales representative opens `https://followflow-ai.vercel.app` and reviews daily stats.
2. **Priority Inspection**: Representative reviews top urgent follow-ups sorted by score.
3. **Analyzer Launch**: Representative clicks **AI Analyzer** in sidebar.
4. **Input Data**: Pastes raw transcript from a recent sales call or email exchange.
5. **Trigger Analysis**: Clicks **"Analyze Conversation with AI"**.
6. **Intelligence Parsing**: System parses text and displays structured cards for intent, pain points, objections, and buying signals.
7. **Score Generation**: Calculates urgency score (`0–100`) and displays priority badge.
8. **Recommendation**: Displays strategic advice for reps.
9. **Pipeline Addition**: Rep clicks **"Add to Follow-Up Queue"** to persist lead.
10. **Generator Launch**: Rep opens **AI Follow-Up Generator**.
11. **Channel Selection**: Chooses *Email*, *LinkedIn*, or *WhatsApp*.
12. **Tone Selection**: Chooses *Professional*, *Friendly*, *Concise*, or *Persuasive*.
13. **AI Generation**: Gemini AI drafts context-aware message addressing prospect's exact objections.
14. **Communication**: Rep clicks **"Copy Message"** and sends via email/chat.
15. **Task Completion**: Rep clicks **"Mark as Sent"**, updating lead status to *Complete*.
