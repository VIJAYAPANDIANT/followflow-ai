import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, CalendarClock, Check, Clock, ListChecks, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { Avatar, PriorityBadge, ScoreMeter } from "@/components/PriorityBadge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppStore } from "@/lib/app-store";
import { cn } from "@/lib/utils";
import type { Priority } from "@/lib/mock-data";

export const Route = createFileRoute("/follow-ups")({
  head: () => ({
    meta: [
      { title: "Follow-up Queue — FollowFlow AI" },
      {
        name: "description",
        content:
          "AI-ranked follow-up queue with priority scores, due dates and recommended next actions for every lead.",
      },
      { property: "og:title", content: "Follow-up Queue — FollowFlow AI" },
      {
        property: "og:description",
        content: "AI-ranked actions based on urgency, intent and opportunity.",
      },
    ],
  }),
  component: FollowUpsPage,
});

const filters = ["All", "Critical", "High", "Medium", "Low", "Completed"] as const;
const priorityRank: Record<Priority, number> = { Critical: 0, High: 1, Medium: 2, Low: 3 };

function FollowUpsPage() {
  const { followUps, toggleComplete } = useAppStore();
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [sort, setSort] = useState("priority");

  const visible = useMemo(() => {
    let list = [...followUps];
    if (filter === "Completed") list = list.filter((f) => f.completed);
    else if (filter !== "All") list = list.filter((f) => !f.completed && f.priority === filter);
    else list = list.filter((f) => !f.completed);

    if (sort === "priority") list.sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority] || b.score - a.score);
    if (sort === "due") list.sort((a, b) => a.due.localeCompare(b.due));
    if (sort === "last") list.sort((a, b) => a.lastInteraction.localeCompare(b.lastInteraction));
    return list;
  }, [followUps, filter, sort]);

  const counts = useMemo(
    () => ({
      All: followUps.filter((f) => !f.completed).length,
      Critical: followUps.filter((f) => !f.completed && f.priority === "Critical").length,
      High: followUps.filter((f) => !f.completed && f.priority === "High").length,
      Medium: followUps.filter((f) => !f.completed && f.priority === "Medium").length,
      Low: followUps.filter((f) => !f.completed && f.priority === "Low").length,
      Completed: followUps.filter((f) => f.completed).length,
    }),
    [followUps],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Follow-up Queue"
        subtitle="AI-ranked actions based on urgency, intent, and opportunity."
        actions={
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[190px] rounded-xl bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="priority">Highest Priority</SelectItem>
              <SelectItem value="due">Due Date</SelectItem>
              <SelectItem value="last">Last Interaction</SelectItem>
            </SelectContent>
          </Select>
        }
      />

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
              filter === f
                ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground",
            )}
          >
            {f}
            <span className="ml-2 text-xs opacity-70">{counts[f]}</span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="card-surface grid place-items-center gap-3 p-14 text-center">
          <span className="grid size-12 place-items-center rounded-2xl bg-secondary">
            <ListChecks className="size-5 text-muted-foreground" />
          </span>
          <p className="font-semibold">Nothing here — queue is clear</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            No follow-ups match this filter. Analyze a new conversation to let the AI agent add more.
          </p>
          <Button asChild className="mt-1 rounded-xl">
            <Link to="/analyzer">Open AI Analyzer</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {visible.map((f) => (
            <article
              key={f.id}
              className={cn(
                "card-surface card-hover p-5",
                f.completed && "opacity-70",
                f.priority === "Critical" && !f.completed && "border-l-4 border-l-critical",
              )}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <Avatar name={f.name} size="lg" />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate font-semibold">{f.name}</h3>
                      <PriorityBadge priority={f.completed ? "Completed" : f.priority} />
                    </div>
                    <p className="text-sm text-muted-foreground">{f.company}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarClock className="size-3.5" /> Due {f.due}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="size-3.5" /> Last contact {f.lastInteraction}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:w-40">
                  <p className="text-xs font-medium text-muted-foreground">Priority score</p>
                  <ScoreMeter score={f.score} className="mt-1.5" />
                </div>

                <div className="min-w-0 flex-1 rounded-xl border border-primary/15 bg-primary/5 p-3 lg:max-w-xs">
                  <p className="text-xs font-semibold text-primary">AI recommended action</p>
                  <p className="mt-1 text-sm leading-relaxed">{f.action}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
                <Button asChild variant="outline" className="rounded-xl">
                  <Link to="/leads/$leadId" params={{ leadId: f.leadId }}>
                    View Details <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="secondary" className="rounded-xl">
                  <Link to="/generator" search={{ lead: f.leadId }}>
                    <Wand2 className="size-4" /> Generate Message
                  </Link>
                </Button>
                <Button
                  variant={f.completed ? "ghost" : "default"}
                  className="rounded-xl"
                  onClick={() => {
                    toggleComplete(f.id);
                    toast.success(
                      f.completed ? `${f.name} moved back to the queue` : `Follow-up with ${f.name} completed`,
                    );
                  }}
                >
                  <Check className="size-4" /> {f.completed ? "Reopen" : "Mark Complete"}
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
