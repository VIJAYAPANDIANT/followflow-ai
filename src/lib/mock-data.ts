export type Priority = "Critical" | "High" | "Medium" | "Low";
export type LeadStatus =
  | "Proposal Sent"
  | "Demo Scheduled"
  | "In Trial"
  | "Negotiation"
  | "Cold"
  | "New";

export type Lead = {
  id: string;
  name: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  interest: "High" | "Medium" | "Low";
  priority: Priority;
  score: number;
  lastInteraction: string;
  nextFollowUp: string;
  status: LeadStatus;
  riskScore?: number;
  intent: string;
  painPoints: string[];
  objections: string;
  buyingSignals: string;
  urgency: Priority;
  nextAction: string;
  timeline: TimelineEvent[];
};

export type TimelineEvent = {
  id: string;
  type: "call" | "email" | "meeting" | "ai";
  title: string;
  detail: string;
  date: string;
};

export type FollowUp = {
  id: string;
  leadId: string;
  name: string;
  company: string;
  priority: Priority;
  score: number;
  due: string;
  lastInteraction: string;
  action: string;
  completed: boolean;
};

export const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

export const leads: Lead[] = [
  {
    id: "sarah-johnson",
    name: "Sarah Johnson",
    company: "Acme Corp",
    role: "VP of Operations",
    email: "sarah.johnson@acmecorp.com",
    phone: "+1 (415) 220-8814",
    location: "San Francisco, CA",
    interest: "High",
    priority: "Critical",
    score: 96,
    lastInteraction: "2 days ago",
    nextFollowUp: "Friday, 10:00 AM",
    status: "Proposal Sent",
    intent: "Interested in the Enterprise plan.",
    painPoints: ["Scaling operational workflows", "Limited automation", "Reporting inefficiency"],
    objections: "Needs approval from the finance team.",
    buyingSignals: "Asked about enterprise pricing and implementation timeline.",
    urgency: "Critical",
    nextAction: "Send enterprise pricing proposal",
    timeline: [
      {
        id: "t1",
        type: "ai",
        title: "AI analysis completed",
        detail:
          "Detected high purchase intent and budget-approval objection. Priority score raised to 96.",
        date: "2 days ago",
      },
      {
        id: "t2",
        type: "call",
        title: "Discovery call (38 min)",
        detail:
          "Discussed operational scaling, automation gaps and enterprise pricing structure.",
        date: "2 days ago",
      },
      {
        id: "t3",
        type: "email",
        title: "Email: Follow-up resources",
        detail: "Shared automation case study for operations teams. Opened 4 times.",
        date: "5 days ago",
      },
      {
        id: "t4",
        type: "meeting",
        title: "Intro meeting with ops team",
        detail: "Three stakeholders attended, including the finance director.",
        date: "12 days ago",
      },
    ],
  },
  {
    id: "michael-chen",
    name: "Michael Chen",
    company: "TechNova",
    role: "Head of Revenue Ops",
    email: "m.chen@technova.io",
    phone: "+1 (206) 771-2290",
    location: "Seattle, WA",
    interest: "High",
    priority: "High",
    score: 88,
    lastInteraction: "Yesterday",
    nextFollowUp: "Tomorrow, 2:00 PM",
    status: "Demo Scheduled",
    intent: "Comparing us against an incumbent vendor.",
    painPoints: ["Manual pipeline hygiene", "Slow handoffs"],
    objections: "Wants proof of CRM integration depth.",
    buyingSignals: "Requested a technical demo with their ops lead.",
    urgency: "High",
    nextAction: "Schedule product demo",
    timeline: [
      {
        id: "t1",
        type: "email",
        title: "Email: Demo availability",
        detail: "Confirmed two slots for a technical walkthrough.",
        date: "Yesterday",
      },
      {
        id: "t2",
        type: "call",
        title: "Qualification call (22 min)",
        detail: "Budget confirmed for next quarter.",
        date: "6 days ago",
      },
    ],
  },
  {
    id: "emily-davis",
    name: "Emily Davis",
    company: "BrightLabs",
    role: "Director of Growth",
    email: "emily@brightlabs.com",
    phone: "+1 (312) 559-4471",
    location: "Chicago, IL",
    interest: "Medium",
    priority: "Medium",
    score: 72,
    lastInteraction: "4 days ago",
    nextFollowUp: "Thursday, 9:30 AM",
    status: "In Trial",
    riskScore: 78,
    intent: "Evaluating during a 14-day trial.",
    painPoints: ["Low team adoption", "Unclear reporting"],
    objections: "Needs onboarding support commitment.",
    buyingSignals: "Invited two teammates into the trial workspace.",
    urgency: "Medium",
    nextAction: "Follow up after trial",
    timeline: [
      {
        id: "t1",
        type: "ai",
        title: "AI risk flag",
        detail: "Trial activity dropped 40% week over week.",
        date: "2 days ago",
      },
      {
        id: "t2",
        type: "meeting",
        title: "Trial kickoff",
        detail: "Walked through workspace setup and reporting templates.",
        date: "9 days ago",
      },
    ],
  },
  {
    id: "david-wilson",
    name: "David Wilson",
    company: "DataFlow",
    role: "CTO",
    email: "dwilson@dataflow.ai",
    phone: "+1 (646) 330-1188",
    location: "New York, NY",
    interest: "Low",
    priority: "Low",
    score: 45,
    lastInteraction: "7 days ago",
    nextFollowUp: "Next Monday",
    status: "Cold",
    riskScore: 64,
    intent: "Early exploration, no timeline.",
    painPoints: ["Integration complexity"],
    objections: "No budget owner identified yet.",
    buyingSignals: "Downloaded the integration whitepaper.",
    urgency: "Low",
    nextAction: "Re-engagement email",
    timeline: [
      {
        id: "t1",
        type: "email",
        title: "Email: Integration docs",
        detail: "No reply after two sends.",
        date: "7 days ago",
      },
    ],
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    company: "Northwind Retail",
    role: "Head of Sales",
    email: "priya.nair@northwind.com",
    phone: "+44 20 7946 0212",
    location: "London, UK",
    interest: "High",
    priority: "High",
    score: 84,
    lastInteraction: "3 days ago",
    nextFollowUp: "Friday, 4:00 PM",
    status: "Negotiation",
    intent: "Ready to sign pending legal review.",
    painPoints: ["Multi-region reporting"],
    objections: "Security questionnaire pending.",
    buyingSignals: "Asked for a redlined contract.",
    urgency: "High",
    nextAction: "Send security documentation pack",
    timeline: [
      {
        id: "t1",
        type: "call",
        title: "Commercial review",
        detail: "Agreed on seat count and 12-month term.",
        date: "3 days ago",
      },
    ],
  },
  {
    id: "tom-becker",
    name: "Tom Becker",
    company: "Helios Energy",
    role: "Operations Manager",
    email: "t.becker@helios.energy",
    phone: "+49 30 5557 8821",
    location: "Berlin, DE",
    interest: "Medium",
    priority: "Medium",
    score: 66,
    lastInteraction: "5 days ago",
    nextFollowUp: "Next Tuesday",
    status: "New",
    riskScore: 52,
    intent: "Wants to reduce manual follow-up work.",
    painPoints: ["Manual outreach", "No prioritisation"],
    objections: "Comparing with two other tools.",
    buyingSignals: "Attended the group webinar.",
    urgency: "Medium",
    nextAction: "Send comparison one-pager",
    timeline: [
      {
        id: "t1",
        type: "email",
        title: "Webinar follow-up",
        detail: "Replied asking for pricing tiers.",
        date: "5 days ago",
      },
    ],
  },
  {
    id: "laura-gomez",
    name: "Laura Gomez",
    company: "Vertex Health",
    role: "VP Commercial",
    email: "laura.gomez@vertexhealth.com",
    phone: "+1 (512) 908-3345",
    location: "Austin, TX",
    interest: "High",
    priority: "Critical",
    score: 91,
    lastInteraction: "1 day ago",
    nextFollowUp: "Today, 5:00 PM",
    status: "Proposal Sent",
    intent: "Needs rollout before end of quarter.",
    painPoints: ["Compliance reporting", "Rep ramp time"],
    objections: "Procurement requires two references.",
    buyingSignals: "Asked for an implementation plan.",
    urgency: "Critical",
    nextAction: "Share two customer references",
    timeline: [
      {
        id: "t1",
        type: "ai",
        title: "AI analysis completed",
        detail: "Urgency high — quarter-end deadline referenced twice.",
        date: "1 day ago",
      },
    ],
  },
  {
    id: "james-oduya",
    name: "James Oduya",
    company: "Lumen Freight",
    role: "Founder",
    email: "james@lumenfreight.com",
    phone: "+1 (305) 442-7710",
    location: "Miami, FL",
    interest: "Low",
    priority: "Low",
    score: 38,
    lastInteraction: "11 days ago",
    nextFollowUp: "Unscheduled",
    status: "Cold",
    riskScore: 81,
    intent: "Interest stalled after pricing was shared.",
    painPoints: ["Budget constraints"],
    objections: "Pricing above current budget.",
    buyingSignals: "None in the last 10 days.",
    urgency: "Low",
    nextAction: "Offer starter tier",
    timeline: [
      {
        id: "t1",
        type: "email",
        title: "Pricing sent",
        detail: "No response after initial open.",
        date: "11 days ago",
      },
    ],
  },
];

export const initialFollowUps: FollowUp[] = [
  {
    id: "f1",
    leadId: "sarah-johnson",
    name: "Sarah Johnson",
    company: "Acme Corp",
    priority: "Critical",
    score: 96,
    due: "Today, 4:00 PM",
    lastInteraction: "2 days ago",
    action: "Send enterprise pricing proposal",
    completed: false,
  },
  {
    id: "f2",
    leadId: "laura-gomez",
    name: "Laura Gomez",
    company: "Vertex Health",
    priority: "Critical",
    score: 91,
    due: "Today, 5:00 PM",
    lastInteraction: "1 day ago",
    action: "Share two customer references",
    completed: false,
  },
  {
    id: "f3",
    leadId: "michael-chen",
    name: "Michael Chen",
    company: "TechNova",
    priority: "High",
    score: 88,
    due: "Tomorrow, 2:00 PM",
    lastInteraction: "Yesterday",
    action: "Schedule product demo",
    completed: false,
  },
  {
    id: "f4",
    leadId: "priya-nair",
    name: "Priya Nair",
    company: "Northwind Retail",
    priority: "High",
    score: 84,
    due: "Friday, 4:00 PM",
    lastInteraction: "3 days ago",
    action: "Send security documentation pack",
    completed: false,
  },
  {
    id: "f5",
    leadId: "emily-davis",
    name: "Emily Davis",
    company: "BrightLabs",
    priority: "Medium",
    score: 72,
    due: "Thursday, 9:30 AM",
    lastInteraction: "4 days ago",
    action: "Follow up after trial",
    completed: false,
  },
  {
    id: "f6",
    leadId: "tom-becker",
    name: "Tom Becker",
    company: "Helios Energy",
    priority: "Medium",
    score: 66,
    due: "Next Tuesday",
    lastInteraction: "5 days ago",
    action: "Send comparison one-pager",
    completed: false,
  },
  {
    id: "f7",
    leadId: "david-wilson",
    name: "David Wilson",
    company: "DataFlow",
    priority: "Low",
    score: 45,
    due: "Next Monday",
    lastInteraction: "7 days ago",
    action: "Re-engagement email",
    completed: false,
  },
  {
    id: "f8",
    leadId: "james-oduya",
    name: "James Oduya",
    company: "Lumen Freight",
    priority: "Low",
    score: 38,
    due: "Completed Monday",
    lastInteraction: "11 days ago",
    action: "Offer starter tier",
    completed: true,
  },
];

export const atRiskLeads = [
  {
    id: "emily-davis",
    company: "BrightLabs",
    contact: "Emily Davis",
    risk: "High" as const,
    riskScore: 78,
    lastInteraction: "12 days ago",
    insight:
      "High purchase intent was detected during the previous conversation, but no follow-up has been completed.",
  },
  {
    id: "james-oduya",
    company: "Lumen Freight",
    contact: "James Oduya",
    risk: "High" as const,
    riskScore: 81,
    lastInteraction: "11 days ago",
    insight: "Pricing objection was never addressed. Engagement dropped to zero.",
  },
  {
    id: "david-wilson",
    company: "DataFlow",
    contact: "David Wilson",
    risk: "Medium" as const,
    riskScore: 64,
    lastInteraction: "7 days ago",
    insight: "No budget owner identified after two touchpoints.",
  },
  {
    id: "tom-becker",
    company: "Helios Energy",
    contact: "Tom Becker",
    risk: "Medium" as const,
    riskScore: 52,
    lastInteraction: "5 days ago",
    insight: "Actively comparing competitors without a differentiation follow-up.",
  },
  {
    id: "emily-davis-2",
    company: "BrightLabs (Trial)",
    contact: "Growth team",
    risk: "Medium" as const,
    riskScore: 49,
    lastInteraction: "4 days ago",
    insight: "Trial usage fell 40% week over week.",
  },
];

export const activityData = [
  { day: "Mon", completed: 9, due: 12 },
  { day: "Tue", completed: 14, due: 16 },
  { day: "Wed", completed: 11, due: 13 },
  { day: "Thu", completed: 17, due: 18 },
  { day: "Fri", completed: 13, due: 15 },
  { day: "Sat", completed: 5, due: 6 },
  { day: "Sun", completed: 7, due: 8 },
];

export const priorityDistribution = [
  { name: "Critical", value: 18 },
  { name: "High", value: 34 },
  { name: "Medium", value: 46 },
  { name: "Low", value: 30 },
];

export const completionRate = [
  { week: "W1", rate: 62 },
  { week: "W2", rate: 68 },
  { week: "W3", rate: 74 },
  { week: "W4", rate: 71 },
  { week: "W5", rate: 83 },
  { week: "W6", rate: 88 },
];

export const riskDistribution = [
  { name: "Healthy", value: 74 },
  { name: "Watch", value: 21 },
  { name: "At risk", value: 12 },
  { name: "Cold", value: 5 },
];

export const commonObjections = [
  { label: "Pricing", share: 42 },
  { label: "Integration complexity", share: 31 },
  { label: "Budget approval", share: 27 },
];

export const aiAnalysisResult = {
  leadName: "Sarah Johnson",
  company: "Acme Corp",
  interest: "High",
  intent: "Evaluating Enterprise Plan",
  painPoints: ["Pricing", "Automation", "Team scaling"],
  objections: "Requires management approval",
  followUpRequired: "Yes",
  urgency: "High",
  deadline: "Friday",
  score: 96,
  nextAction: "Send enterprise pricing proposal.",
};

export const sampleTranscript = `Sales call — Acme Corp — Sarah Johnson (VP of Operations)

Alex: Thanks for making time, Sarah. Where are the biggest bottlenecks right now?
Sarah: Honestly, scaling our operational workflows. Everything is manual and reporting takes days.
Alex: How large is the team that would use this?
Sarah: About 60 people this quarter, likely 90 by Q3, so team scaling matters.
Sarah: Can you send over the enterprise pricing? I'll need management approval before we move.
Alex: Of course. What does your implementation timeline look like?
Sarah: We'd want to be live before the end of the quarter. Ideally we decide by Friday.`;

export const generatedMessages: Record<string, { subject: string; body: string }> = {
  email: {
    subject: "Enterprise Plan Details for Acme Corp",
    body: `Hi Sarah,

It was great speaking with you about Acme Corp's operational scaling and automation needs.

As discussed, I'm sharing the Enterprise Plan details, including the automation and reporting capabilities that could help your team streamline workflows.

I understand that pricing approval is an important part of your decision process, so I'd be happy to walk you through the options and answer any questions.

Would you be available for a short call this week?

Best,
Alex`,
  },
  linkedin: {
    subject: "LinkedIn message",
    body: `Hi Sarah — great chatting about Acme Corp's operational scaling.

I've put together the Enterprise Plan details covering the automation and reporting pieces you flagged, plus a short summary you can share with finance for approval.

Open to a 15-minute call this week to walk through it?

— Alex`,
  },
  whatsapp: {
    subject: "WhatsApp message",
    body: `Hi Sarah! Following up on our call about scaling Acme's workflows.

Sending over the Enterprise Plan details now — includes the automation + reporting breakdown, and a one-pager for your finance approval.

Any time this week for a quick 15-min call?

— Alex, FollowFlow`,
  },
};

export const recommendedActions = [
  { title: "Follow up with Sarah Johnson", detail: "Enterprise proposal due today", leadId: "sarah-johnson" },
  { title: "Schedule demo with Michael Chen", detail: "Technical walkthrough requested", leadId: "michael-chen" },
  { title: "Send trial reminder to Emily Davis", detail: "Trial ends in 3 days", leadId: "emily-davis" },
  { title: "Re-engage BrightLabs immediately", detail: "12 days without contact", leadId: "emily-davis" },
];
