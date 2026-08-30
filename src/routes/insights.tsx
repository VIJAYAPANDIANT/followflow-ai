import { createFileRoute } from "@tanstack/react-router";
import { Brain, Flame, LineChart, ShieldAlert, Sparkles, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useAppStore } from "@/lib/app-store";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [{ title: "AI Insights — FollowFlow AI" }],
  }),
  component: InsightsPage,
});

function InsightsPage() {
  const { leads, followUps } = useAppStore();

  const totalLeads = leads.length;
  const criticalCount = followUps.filter((f) => !f.completed && f.priority === "Critical").length;
  const avgScore = Math.round(leads.reduce((sum, l) => sum + l.score, 0) / (totalLeads || 1));

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Insights & Analytics"
        subtitle="Real-time intelligent recommendations and deal health analytics."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card-surface p-5 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground text-sm font-medium">
            <span>Average Deal Score</span>
            <LineChart className="size-4 text-primary" />
          </div>
          <p className="text-3xl font-bold font-display tabular-nums">{avgScore}</p>
          <p className="text-xs text-success font-medium">↑ High intent across active pipeline</p>
        </div>

        <div className="card-surface p-5 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground text-sm font-medium">
            <span>Critical Follow-ups</span>
            <Flame className="size-4 text-warning" />
          </div>
          <p className="text-3xl font-bold font-display tabular-nums">{criticalCount}</p>
          <p className="text-xs text-muted-foreground">Urgent action required today</p>
        </div>

        <div className="card-surface p-5 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground text-sm font-medium">
            <span>Tracked Pipeline Leads</span>
            <Brain className="size-4 text-info" />
          </div>
          <p className="text-3xl font-bold font-display tabular-nums">{totalLeads}</p>
          <p className="text-xs text-muted-foreground">Active sales conversations analyzed</p>
        </div>
      </div>

      <div className="card-surface p-6 space-y-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Sparkles className="size-5 text-primary" /> Key Strategic Recommendations
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border p-4 bg-secondary/30 space-y-1 text-sm">
            <p className="font-semibold flex items-center gap-2 text-foreground">
              <TrendingUp className="size-4 text-success" /> Enterprise Plan Conversions
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Leads requesting enterprise pricing proposals (like Acme Corp) convert 45% faster when follow-ups are sent within 24 hours.
            </p>
          </div>

          <div className="rounded-xl border border-border p-4 bg-secondary/30 space-y-1 text-sm">
            <p className="font-semibold flex items-center gap-2 text-foreground">
              <ShieldAlert className="size-4 text-warning" /> Finance Objection Mitigation
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              30% of high-priority leads mention budget/finance director approval. Include ROI one-pagers in follow-up emails to shorten cycles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
