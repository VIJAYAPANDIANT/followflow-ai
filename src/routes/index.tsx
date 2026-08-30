import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Brain,
  CalendarClock,
  Flame,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader } from "@/components/PageHeader";
import { Avatar, PriorityBadge, ScoreMeter, StatusPill } from "@/components/PriorityBadge";
import { Button } from "@/components/ui/button";
import { activityData, atRiskLeads, leads } from "@/lib/mock-data";
import { useAppStore } from "@/lib/app-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — FollowFlow AI" },
      {
        name: "description",
        content:
          "See your AI priority queue, follow-ups due today and leads at risk of going cold in one dashboard.",
      },
      { property: "og:title", content: "Dashboard — FollowFlow AI" },
      {
        property: "og:description",
        content: "AI-prioritised sales follow-ups, risk alerts and next best actions.",
      },
    ],
  }),
  component: Dashboard,
});

const statTone = {
  primary: "bg-primary/10 text-primary",
  info: "bg-info/10 text-info",
  warning: "bg-warning/15 text-[color:oklch(0.5_0.13_60)]",
  critical: "bg-critical/10 text-critical",
} as const;

function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone,
  hintTone,
}: {
  label: string;
  value: string | number;
  hint: string;
  icon: typeof Users;
  tone: keyof typeof statTone;
  hintTone?: string;
}) {
  return (
    <div className="card-surface card-hover bg-gradient-subtle p-5">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <span className={cn("grid size-9 place-items-center rounded-xl", statTone[tone])}>
          <Icon className="size-4.5" />
        </span>
      </div>
      <p className="mt-4 font-display text-3xl font-bold tabular-nums">{value}</p>
      <p className={cn("mt-1.5 text-xs font-medium text-muted-foreground", hintTone)}>{hint}</p>
    </div>
  );
}

function Dashboard() {
  const { followUps } = useAppStore();
  const queue = [...followUps]
    .filter((f) => !f.completed)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
  const dueToday = followUps.filter((f) => !f.completed).length;
  const critical = followUps.filter((f) => !f.completed && f.priority === "Critical").length;

  return (
    <div className="space-y-6">
      <div className="card-surface overflow-hidden bg-gradient-hero p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/70 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="size-3.5" /> AI ranked your day
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Good morning, Alex 👋
            </h1>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Here's what needs your attention today.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild size="lg" className="rounded-xl">
              <Link to="/analyzer">
                <Brain className="size-4" /> Analyze conversation
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl bg-card/70">
              <Link to="/follow-ups">
                View queue <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Active Leads"
          value={128}
          hint="↑ 12% vs last week"
          hintTone="text-success"
          icon={Users}
          tone="primary"
        />
        <StatCard
          label="Follow-ups Due Today"
          value={dueToday}
          hint="Needs action before 6:00 PM"
          hintTone="text-primary"
          icon={CalendarClock}
          tone="info"
        />
        <StatCard
          label="High-Priority Leads"
          value={critical}
          hint="Score above 85"
          hintTone="text-[color:oklch(0.5_0.13_60)]"
          icon={Flame}
          tone="warning"
        />
        <StatCard
          label="Leads At Risk"
          value={5}
          hint="Going cold — act now"
          hintTone="text-critical"
          icon={AlertTriangle}
          tone="critical"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="card-surface xl:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-5">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <Sparkles className="size-4.5 text-primary" /> AI Priority Queue
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Ranked by intent, urgency and opportunity size.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-xl">
              <Link to="/follow-ups">
                View All Follow-ups <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="divide-y divide-border">
            {queue.map((f) => (
              <div
                key={f.id}
                className="grid gap-3 p-5 transition-colors hover:bg-secondary/50 md:grid-cols-[minmax(0,1.4fr)_auto_minmax(0,1.2fr)] md:items-center"
              >
                <div className="flex items-center gap-3">
                  <Avatar name={f.name} />
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{f.name}</p>
                    <p className="truncate text-sm text-muted-foreground">{f.company}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <PriorityBadge priority={f.priority} />
                  <ScoreMeter score={f.score} />
                  <span className="text-xs text-muted-foreground">{f.lastInteraction}</span>
                </div>

                <div className="flex items-center justify-between gap-3 md:justify-end">
                  <p className="text-sm text-muted-foreground md:text-right">
                    <span className="font-medium text-foreground">Next: </span>
                    {f.action}
                  </p>
                  <Button asChild size="icon" variant="ghost" className="shrink-0 rounded-lg">
                    <Link to="/leads/$leadId" params={{ leadId: f.leadId }} aria-label="View details">
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card-surface p-5">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <AlertTriangle className="size-4.5 text-critical" /> Leads At Risk
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">Detected by the cold-lead model.</p>

          <div className="mt-4 space-y-3">
            {atRiskLeads.slice(0, 2).map((r) => (
              <div key={r.id + r.company} className="rounded-xl border border-critical/20 bg-critical/5 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold">{r.company}</p>
                    <p className="text-xs text-muted-foreground">Last interaction: {r.lastInteraction}</p>
                  </div>
                  <span className="rounded-full border border-critical/25 bg-card px-2 py-0.5 text-xs font-semibold text-critical">
                    Risk: {r.risk}
                  </span>
                </div>
                <p className="mt-3 rounded-lg bg-card/80 p-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground">AI Insight: </span>
                  {r.insight}
                </p>
                <Button asChild variant="outline" className="mt-3 w-full rounded-xl bg-card">
                  <Link to="/leads/$leadId" params={{ leadId: r.id.replace("-2", "") }}>
                    Review Lead
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-border pt-5">
            <h3 className="flex items-center gap-2 text-sm font-bold">
              <TrendingUp className="size-4 text-primary" /> Follow-up Activity
            </h3>
            <p className="text-xs text-muted-foreground">Completed over the last 7 days</p>
            <div className="mt-4 h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData} margin={{ left: -24, right: 4, top: 4 }}>
                  <defs>
                    <linearGradient id="dashFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    fontSize={11}
                    stroke="var(--color-muted-foreground)"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    fontSize={11}
                    stroke="var(--color-muted-foreground)"
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid var(--color-border)",
                      fontSize: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="completed"
                    stroke="var(--color-primary)"
                    strokeWidth={2.5}
                    fill="url(#dashFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>

      <section className="card-surface p-5">
        <PageHeader
          title={<span className="text-lg">Recently analyzed leads</span>}
          subtitle="Conversations processed by the AI agent."
        />
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {leads.slice(0, 4).map((l) => (
            <Link
              key={l.id}
              to="/leads/$leadId"
              params={{ leadId: l.id }}
              className="card-surface card-hover block p-4"
            >
              <div className="flex items-center gap-3">
                <Avatar name={l.name} size="sm" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{l.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{l.company}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <StatusPill status={l.status} />
                <PriorityBadge priority={l.priority} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
