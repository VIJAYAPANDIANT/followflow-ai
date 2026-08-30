# Feature Specifications — FollowFlow AI

FollowFlow AI is built with 7 primary core modules designed to streamline sales workflows from raw text ingestion to closed revenue.

---

## 1. 📊 AI Dashboard
The central command hub for sales reps and managers.
- **Active Leads Counter**: Total active deals in the pipeline.
- **Follow-ups Due Today**: Urgent action items requiring contact before EOD.
- **High-Priority Leads**: Summary count of critical and high-intent leads.
- **Leads at Risk**: Proactive alerts for deals stalling past 3+ days.
- **AI Priority Queue**: Dynamically sorted list of top 5 daily follow-up tasks.

---

## 2. 📋 Follow-Up Queue
An AI-ranked execution list that organizes follow-up tasks by priority tier.
- **Priority Tiering**:
  - `90–100` = **Critical** (Urgent follow-up, high purchase intent, firm deadline)
  - `75–89` = **High** (Strong interest, important next steps required)
  - `50–74` = **Medium** (Moderate engagement, routine follow-up)
  - `0–49` = **Low** (Low engagement, general nurturing)
- **Task Metadata**: Prospect name, company, priority score, due date, last interaction timestamp, and recommended next action.
- **Completion Control**: Mark follow-up as complete with 1-click status update.

---

## 3. 👥 Leads Directory
A searchable repository of all sales prospects.
- **Search & Filter**: Live instant search by lead name, company, or intent.
- **Prospect Cards**: Displays company name, email, role, location, status (*Cold*, *In Trial*, *Proposal Sent*, *Negotiation*), interest level, priority score, and last interaction timestamp.

---

## 4. 📄 Lead Details Profile
A 360-degree view of individual prospect relationships (`/leads/$leadId`).
- **Customer Information**: Contact details, company size, deal stage, and priority badge.
- **AI Sales Analysis**: Extracted customer intent, pain points list, objections list, and buying signals tags.
- **Action Recommendations**: Next best action guidance and risk level assessment.
- **Conversation Timeline**: Full chronological record of past emails, calls, notes, and meeting summaries.

---

## 5. 🧠 AI Conversation Analyzer
The intelligence ingestion engine (`/analyzer`).
- **Multi-Format Input**: Accepts raw meeting notes, sales call transcripts, email threads, or text files.
- **1-Click Sample Ingestion**: Built-in test transcript (*Sarah Johnson — Acme Corp*) for instant live demonstration.
- **Structured Extraction**: Gemini AI parses text into structured JSON extracting:
  - Lead Name & Company
  - Interest Level & Intent
  - Pain Points & Objections
  - Buying Signals & Urgency
  - Priority Score (`0–100`)
  - Next Best Action
- **Queue Insertion**: Direct 1-click **"Add to Follow-Up Queue"** button.

---

## 6. 🪄 AI Follow-Up Generator
Multi-channel message drafting tool (`/generator`).
- **Communication Channels**:
  - **Email** (Includes compelling Subject Line + Body)
  - **LinkedIn Message** (Direct message format)
  - **WhatsApp Message** (Short, mobile-friendly chat format)
- **Tone Customization**:
  - *Professional* (Formal, structured)
  - *Friendly* (Warm, relationship-focused)
  - *Concise* (Short, action-oriented)
  - *Persuasive* (ROI & value-focused)
- **Context Preview**: Displays related previous interaction summary and objections.
- **Custom Instructions Field**: Optional user input for specific notes (e.g., *"Offer 10% discount for signing this week"*).
- **Actions**: 1-click **Copy to Clipboard**, **Mark as Sent**, and **Regenerate**.

---

## 7. 📈 AI Insights & Analytics
Strategic pipeline analytics (`/insights`).
- **Cold Lead Risk Detector**: Flags deals with dropping engagement.
- **Common Objections Breakdown**: Visual charts showing top objections across the entire sales pipeline (*Budget*, *Security*, *Approval*, *Timeline*).
- **Follow-Up Velocity**: Completion rates and priority distribution metrics.
- **AI Action Recommendations**: Strategic advice for sales leadership to improve deal velocity.
