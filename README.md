# FollowFlow AI — Intelligent Sales Follow-Up Agent

> **Turn sales conversation notes into closed deals in seconds with Google Gemini 3.7 Flash AI.**

[![Live Web App](https://img.shields.io/badge/Live_App-followflow--ai.vercel.app-0070F3?style=for-the-badge&logo=vercel&logoColor=white)](https://followflow-ai.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/VIJAYAPANDIANT/followflow-ai)
[![AI Engine](https://img.shields.io/badge/AI_Engine-Gemini_3.7_Flash-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white)](https://deepmind.google/technologies/gemini/)

---

## 📌 Project Overview

| Property | Details |
| :--- | :--- |
| **Project Name** | **FollowFlow AI** |
| **Team Name** | **Universe** |
| **Team Member** | **Vijayapandian T** |
| **Project Type** | **AI-Powered Sales Follow-Up Agent** |
| **Hackathon** | **AI Product Hackathon 2026** |
| **Production URL** | [https://followflow-ai.vercel.app](https://followflow-ai.vercel.app) |

---

## 🚨 Problem Statement

> **"Sales teams lose valuable leads because important follow-ups are missed, delayed, or not properly prioritized."**

Sales representatives communicate with dozens of prospects daily across calls, meetings, emails, and chat messages. Managing these interactions manually makes it difficult to track who needs a follow-up, when it should happen, and what message will convert the prospect.

Key problems:
- Important follow-ups are missed or delayed.
- High-intent prospects become cold leads due to slow response times.
- Sales reps struggle to decide which lead to contact first.
- Reviewing long conversations and emails manually takes hours.
- Creating tailored follow-up messages based on previous discussions is difficult.

---

## 💡 Solution

> **"FollowFlow AI analyzes sales conversations using AI and intelligently recommends who to follow up with, when to follow up, what action to take, and what message to send."**

**FollowFlow AI** acts as an autonomous sales co-pilot. By processing unstructured sales text, call transcripts, and meeting notes, the system automatically:
1. Ingests raw sales notes and emails.
2. Identifies customer intent, pain points, objections, and buying signals.
3. Calculates a dynamic priority score (`0–100`) and tiers leads into *Critical*, *High*, *Medium*, and *Low*.
4. Recommends the next best action and flags deals at risk of going cold.
5. Generates personalized follow-up messages for Email, LinkedIn, and WhatsApp in 4 customizable tones.

---

## ✨ Key Features

- 📊 **AI Dashboard**: High-level overview of active leads, follow-ups due today, leads at risk, and AI daily priority queue.
- 📋 **AI-Ranked Follow-Up Queue**: Tasks sorted by priority score (`90–100` Critical, `75–89` High, `50–74` Medium, `0–49` Low).
- 👥 **Leads Directory**: Complete CRM repository with searchable prospect records and deal status.
- 📄 **Lead Details Profile**: Deep-dive 360 view of intent, pain points, objections, and interaction history.
- 🧠 **AI Conversation Analyzer**: 1-click structured sales intelligence extraction from meeting transcripts and emails.
- 🪄 **AI Follow-Up Generator**: Multi-channel message drafting across Email, LinkedIn, and WhatsApp in *Professional*, *Friendly*, *Concise*, or *Persuasive* tones.
- 📈 **AI Insights**: Pipeline health analytics, common customer objection charts, and strategic leadership recommendations.

---

## 🔄 AI Workflow Architecture

```
Sales Conversation / Email / Meeting Notes
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
        Calculate Priority Score (0–100)
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
                    │
                    ▼
     Sales Rep Contacts Customer & Closes Deal
```

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript 5, Tailwind CSS
- **Framework**: TanStack Start & TanStack Router (SSR + Server Functions)
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Iconography**: Lucide React
- **Data Visualization**: Recharts
- **AI Language Model**: Google Gemini API (Gemini 3.7 Flash)
- **Hosting & Deployment**: Vercel

---

## 🎬 Hackathon Demo Flow

1. Open **Dashboard** (`https://followflow-ai.vercel.app`).
2. Review the **AI Priority Queue**.
3. Open **AI Conversation Analyzer**.
4. Click **"Load Sample Data (Sarah Johnson)"**.
5. Click **"Analyze Conversation with AI"**.
6. View extracted intelligence (**Sarah Johnson**, **Acme Corp**, **Score 96/100 Critical**).
7. Click **"Add to Follow-Up Queue"**.
8. Open **AI Follow-Up Generator**.
9. Select **Email** and **Professional** tone, then click **"Generate Follow-Up"**.
10. Review the personalized email addressing her finance objection.
11. View **AI Insights** for pipeline analytics.
12. Return to Dashboard and conclude presentation.

---

## 📁 Documentation Suite

Detailed documentation is available in the `docs/` folder:

- [Bilingual Concept Guide (Tamil & English)](docs/CONCEPT.md)
- [Project Overview](docs/PROJECT_OVERVIEW.md)
- [Problem Statement](docs/PROBLEM_STATEMENT.md)
- [Solution Specification](docs/SOLUTION.md)
- [Feature Breakdown](docs/FEATURES.md)
- [AI Workflow Architecture](docs/AI_WORKFLOW.md)
- [Technology Stack](docs/TECH_STACK.md)
- [User Journey Flow](docs/USER_FLOW.md)
- [Hackathon Demo Guide](docs/DEMO_GUIDE.md)
- [Future Enhancements Roadmap](docs/FUTURE_ENHANCEMENTS.md)

---

## 🚀 Future Enhancements

- 🔄 Salesforce, HubSpot, and Pipedrive 2-way sync
- ✉️ Native Gmail and Outlook integration
- 📅 Automated Google Calendar & Outlook scheduling
- 💬 Official WhatsApp Business API & LinkedIn messaging
- 🔔 Real-time browser and mobile push alerts
- 🤖 AI-powered sales coaching and revenue prediction

---

## 👥 Team Information

- **Team Name**: Universe
- **Team Member**: Vijayapandian T
- **Project**: FollowFlow AI — Sales Follow-Up Agent

---

## 🎯 Conclusion

**FollowFlow AI** empowers sales teams to move at machine speed with human-like personalization. By removing manual lead tracking friction, prioritizing high-intent opportunities, and automating follow-up message creation, sales representatives close deals faster and never lose a lead again.
