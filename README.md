# FollowFlow AI 🚀

> **AI-Powered Sales Follow-Up & Lead Prioritization Platform**

FollowFlow AI is a modern, responsive SaaS frontend designed for sales representatives and managers. It analyzes sales conversations, tracks lead interactions, predicts leads at risk of going cold, and recommends the next best action with AI-assisted messaging.

---

## ✨ Features

- 📊 **Interactive Executive Dashboard**: Real-time stats on active leads, urgent follow-ups, high-priority opportunities, and leads at risk.
- ⚡ **AI Priority Queue**: Intelligently scores and ranks leads based on interaction recency, sentiment, and deal probability.
- 🎯 **Recommended Next Actions**: Automated AI recommendations (e.g., enterprise proposal, product demo, re-engagement email).
- ⚠️ **Cold Lead Detection**: Proactively identifies leads showing signs of drop-off or delayed follow-ups.
- 📋 **Follow-Up Management**: Comprehensive view to filter, track, and manage all scheduled and overdue follow-up tasks.
- 🎨 **Modern SaaS Design**: Clean light theme with deep slate accents, soft gradients, responsive layout, and collapsible sidebar navigation.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Routing & SSR**: [TanStack Start](https://tanstack.com/start/latest) & [TanStack Router](https://tanstack.com/router/latest)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have one of the following package managers installed:

- [Bun](https://bun.sh/) (Recommended)
- [Node.js](https://nodejs.org/) (v18+ or v20+) with `npm` or `pnpm`

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/VIJAYAPANDIANT/followflow-ai.git
   cd followflow-ai
   ```

2. **Install dependencies:**

   ```bash
   bun install
   # or
   npm install
   ```

3. **Start the development server:**

   ```bash
   bun run dev
   # or
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` (or the port specified in your terminal output).

---

## 📜 Available Scripts

| Script    | Command           | Description                           |
| --------- | ----------------- | ------------------------------------- |
| `dev`     | `bun run dev`     | Starts the Vite development server    |
| `build`   | `bun run build`   | Builds the application for production |
| `preview` | `bun run preview` | Previews the production build locally |
| `lint`    | `bun run lint`    | Runs ESLint to check for code issues  |
| `format`  | `bun run format`  | Runs Prettier to format source files  |

---

## 📁 Project Structure

```text
followflow-ai/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components & Layouts
│   │   ├── ui/             # Radix / shadcn base UI primitives
│   │   ├── AppShell.tsx    # Main layout with sidebar & header
│   │   ├── PageHeader.tsx  # Header navigation bar
│   │   └── PriorityBadge.tsx # Lead priority badge renderer
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions & helpers
│   ├── routes/             # TanStack file-based routing
│   │   ├── __root.tsx      # Root route layout wrapper
│   │   ├── index.tsx       # Main Dashboard page
│   │   └── follow-ups.tsx  # Follow-ups management page
│   ├── router.tsx          # Router configuration
│   ├── server.ts          # Server entry point
│   ├── start.ts           # TanStack Start initializer
│   └── styles.css         # Tailwind & global CSS styles
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or open a pull request.

---

## 📄 License

This project is licensed under the MIT License.
