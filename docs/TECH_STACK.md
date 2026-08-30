# Technology Stack — FollowFlow AI

| Layer | Technology | Purpose & Implementation |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 18** | Enterprise UI component library and state-driven view rendering. |
| **Language** | **TypeScript 5** | End-to-end type safety, strict index signature checking, and robust interface definitions. |
| **Routing Framework** | **TanStack Start / TanStack Router** | File-based client/server routing with full SSR and server function support. |
| **Styling Engine** | **Tailwind CSS 3** | Utility-first responsive styling, custom design tokens, dark mode, and smooth glassmorphism effects. |
| **UI Components** | **shadcn/ui** | Accessible, unstyled Radix UI primitives styled with Tailwind CSS (Modals, Selects, Dropdowns, Cards, Badges). |
| **Iconography** | **Lucide React** | Modern, clean vector icon set. |
| **Data Visualization** | **Recharts** | Interactive charts for pipeline analytics, objection breakdowns, and priority distribution. |
| **AI Language Model** | **Google Gemini API (Gemini 3.7 Flash)** | Server-side LLM engine for structured sales analysis, priority scoring, and multi-channel message generation. |
| **Hosting & Deployment** | **Vercel** | Edge-network serverless deployment with automated CI/CD git integration. |

---

## Detailed Technology Breakdown

### 1. React & TypeScript
Provides a modern declarative UI component model. TypeScript ensures full type safety across lead schemas (`Lead`, `FollowUp`, `AnalysisResult`), store actions, and API payloads.

### 2. TanStack Start & Server Functions
Uses TanStack Start `createServerFn` to execute server-side API calls to Google Gemini. This keeps `GEMINI_API_KEY` credentials strictly secured on the server runtime so keys are never exposed to client-side browser JavaScript.

### 3. Tailwind CSS & shadcn/ui
Delivers an enterprise-grade design system with custom CSS variables, responsive grid layouts, and polished micro-interactions.

### 4. Google Gemini 3.7 Flash AI
Google DeepMind's high-speed LLM model powering structured sales extraction, intent classification, priority scoring, and message synthesis. Built with a multi-model failover pipeline (`gemini-2.5-flash` → `gemini-2.0-flash` → `gemini-1.5-flash`) and an offline smart fallback engine.

### 5. Recharts
Powers the strategic analytics charts on the AI Insights dashboard, rendering responsive SVG bar charts, pie distributions, and progress meters.

### 6. Vercel Deployment
Hosts the production web application at `https://followflow-ai.vercel.app` with instant global CDN caching and automatic GitHub branch synchronization.
