# FollowFlow AI

Build a modern, premium, responsive SaaS frontend for an AI-powered sales follow-up agent called “FollowFlow AI”.

The product helps sales representatives analyze sales conversations and emails, identify prospects requiring follow-up, prioritize leads, recommend the next best action, detect leads at risk of going cold, and generate personalized follow-up messages.

IMPORTANT:

Build a fully functional frontend prototype with realistic mock data and interactions. Do not build backend authentication or real API integration yet. Focus on premium UI/UX and a polished AI SaaS dashboard.

TECH STACK:

- React

- TypeScript

- Tailwind CSS

- shadcn/ui

- Lucide React icons

- Recharts for charts

DESIGN STYLE:

- Modern AI SaaS product

- Clean, professional, premium

- Minimal layout with plenty of whitespace

- Light theme

- Deep navy/slate text

- Blue as the primary accent

- Soft gradients and subtle borders

- Rounded-xl cards

- Soft shadows

- Responsive design

- Smooth hover effects and transitions

- Avoid excessive colors and clutter

APP STRUCTURE:

Create a collapsible left sidebar with:

- FollowFlow AI logo and icon

- Dashboard

- Follow-ups

- Leads

- AI Analyzer

- AI Insights

- Settings

At the bottom of the sidebar:

- User profile section

- Avatar

- User name: Alex Morgan

- Role: Sales Manager

TOP NAVIGATION:

- Search input

- Notifications button

- AI status indicator showing “AI Active”

- User avatar

====================================

PAGE 1: DASHBOARD

====================================

Create a main dashboard with the heading:

“Good morning, Alex 👋”

Subtitle:

“Here’s what needs your attention today.”

TOP STATISTICS CARDS:

1. Active Leads

   Value: 128

   Show growth indicator +12%

2. Follow-ups Due Today

   Value: 14

   Highlight important status

3. High-Priority Leads

   Value: 8

   Add warning/priority icon

4. Leads At Risk

   Value: 5

   Show risk indicator

Add a “AI Priority Queue” section.

Display a list/table of prioritized leads with:

- Lead name

- Company

- Priority score

- Status

- Last interaction

- Recommended next action

Use realistic mock leads:

1. Sarah Johnson

   Company: Acme Corp

   Priority: Critical

   Score: 96

   Last interaction: 2 days ago

   Action: Send enterprise pricing proposal

2. Michael Chen

   Company: TechNova

   Priority: High

   Score: 88

   Last interaction: Yesterday

   Action: Schedule product demo

3. Emily Davis

   Company: BrightLabs

   Priority: Medium

   Score: 72

   Last interaction: 4 days ago

   Action: Follow up after trial

4. David Wilson

   Company: DataFlow

   Priority: Low

   Score: 45

   Last interaction: 7 days ago

   Action: Re-engagement email

Add a “View All Follow-ups” button.

Add a “Leads At Risk” card on the right side.

Example:

BrightLabs

Risk Level: High

Last interaction: 12 days ago

AI Insight:

“High purchase intent was detected during the previous conversation, but no follow-up has been completed.”

Button:

“Review Lead”

Add a simple “Follow-up Activity” chart showing follow-ups completed over the last 7 days.

====================================

PAGE 2: FOLLOW-UPS

====================================

Create a dedicated Follow-ups page.

Header:

“Follow-up Queue”

Subtitle:

“AI-ranked actions based on urgency, intent, and opportunity.”

Add filter buttons:

- All

- Critical

- High

- Medium

- Low

- Completed

Display follow-up cards or rows.

Each follow-up should show:

- Customer avatar

- Customer name

- Company

- Priority level

- Priority score

- Follow-up due date

- Last interaction

- AI recommended action

Add buttons:

- View Details

- Generate Message

- Mark Complete

Use color-coded priority badges:

- Critical

- High

- Medium

- Low

Add sorting options:

- Highest Priority

- Due Date

- Last Interaction

====================================

PAGE 3: LEADS

====================================

Create a Leads page.

Display a searchable table of all leads.

Columns:

- Lead

- Company

- Email

- Interest Level

- Priority Score

- Last Interaction

- Status

- Action

Use realistic mock data.

Clicking a lead should open a Lead Details page or side panel.

====================================

PAGE 4: LEAD DETAILS

====================================

Create a detailed lead profile page for:

Sarah Johnson

Company: Acme Corp

Role: VP of Operations

Show:

- Contact information

- Lead status

- Priority score: 96/100

- Interest level: High

- Last interaction

- Next follow-up date

Add a large AI Insights card.

Title:

“AI Sales Analysis”

Include sections:

- Customer Intent

- Pain Points

- Objections

- Buying Signals

- Follow-up Required

- Urgency

- Recommended Next Action

Example AI analysis:

Customer Intent:

Interested in the Enterprise plan.

Pain Points:

- Scaling operational workflows

- Limited automation

- Reporting inefficiency

Objections:

Needs approval from the finance team.

Buying Signals:

Asked about enterprise pricing and implementation timeline.

Recommended Next Action:

Send a customized enterprise pricing proposal and offer a follow-up call.

Add a Conversation Timeline showing:

- Call

- Email

- Meeting

- AI analysis

====================================

PAGE 5: AI ANALYZER

====================================

Create an AI Conversation Analyzer page.

Header:

“AI Conversation Analyzer”

Subtitle:

“Turn sales conversations into actionable follow-ups.”

Create two tabs:

1. Paste Conversation

2. Upload File

In Paste Conversation tab:

- Large textarea

- Placeholder text:

“Paste a sales call transcript, meeting notes, or customer email here...”

Add a button:

“Analyze with AI”

For prototype interaction, clicking the button should show a loading state and then display a realistic AI analysis result.

AI Analysis Result should include:

Lead Name:

Sarah Johnson

Company:

Acme Corp

Interest Level:

High

Customer Intent:

Evaluating Enterprise Plan

Pain Points:

- Pricing

- Automation

- Team scaling

Objections:

Requires management approval

Follow-up Required:

Yes

Urgency:

High

Follow-up Deadline:

Friday

Priority Score:

96/100

Next Best Action:

Send enterprise pricing proposal.

Add a button:

“Add to Follow-up Queue”

Add another button:

“Generate Follow-up Message”

====================================

PAGE 6: AI FOLLOW-UP GENERATOR

====================================

Create a page or modal for generating personalized follow-up messages.

Header:

“AI Follow-up Generator”

Show customer context:

- Sarah Johnson

- Acme Corp

- Interested in Enterprise Plan

- Discussed pricing and automation

Allow users to select:

- Email

- LinkedIn Message

- WhatsApp Message

Allow tone selection:

- Professional

- Friendly

- Concise

- Persuasive

Add button:

“Generate Personalized Message”

Show generated message:

Subject: Enterprise Plan Details for Acme Corp

Hi Sarah,

It was great speaking with you about Acme Corp’s operational scaling and automation needs.

As discussed, I’m sharing the Enterprise Plan details, including the automation and reporting capabilities that could help your team streamline workflows.

I understand that pricing approval is an important part of your decision process, so I’d be happy to walk you through the options and answer any questions.

Would you be available for a short call this week?

Best,

Alex

Add actions:

- Copy

- Edit

- Regenerate

- Mark as Sent

====================================

PAGE 7: AI INSIGHTS

====================================

Create an AI Insights page.

Show cards for:

1. Top Insight

“High-intent leads without follow-ups are the biggest risk this week.”

2. Leads Going Cold

Show 5 leads with risk scores.

3. Common Objections

- Pricing

- Integration complexity

- Budget approval

4. Best Performing Follow-up Type

“Personalized follow-up after a product demo”

Add charts:

- Priority distribution

- Follow-up completion rate

- Lead risk distribution

Add an AI Recommendations section:

“Recommended Actions for Today”

1. Follow up with Sarah Johnson

2. Schedule demo with Michael Chen

3. Send trial reminder to Emily Davis

4. Re-engage BrightLabs immediately

====================================

INTERACTIONS

====================================

Implement frontend interactions:

- Sidebar navigation should work

- Buttons should navigate between pages

- Search should filter leads

- Filters should update displayed follow-ups

- Analyze with AI button should show loading state and then AI results

- Generate Message button should generate/display mock AI output

- Copy button should copy message to clipboard

- Mark Complete should update follow-up status

- Add to Follow-up Queue should show a success toast

- View Details should navigate to lead details

====================================

DEMO QUALITY

====================================

The application should feel like a real AI SaaS product ready for a hackathon demo.

Create realistic mock data and polished empty/loading states.

The main demo journey should be:

1. Open Dashboard

2. View AI Priority Queue

3. Open AI Conversation Analyzer

4. Paste a sales conversation

5. Click Analyze with AI

6. Show structured AI insights

7. Add lead to follow-up queue

8. Generate personalized follow-up message

9. Show the lead on the dashboard

Make this user journey visually impressive and easy to demonstrate in a 3-minute hackathon video.

Do not overcomplicate the design.

Focus on clarity, polished UI, strong AI visualization, and excellent UX.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6af04cc8-55b7-424a-ae36-aec5a756f309).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
