import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Plus, Search, Users, Wand2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Avatar, PriorityBadge, ScoreMeter } from "@/components/PriorityBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/lib/app-store";

export const Route = createFileRoute("/leads/")({
  head: () => ({
    meta: [{ title: "Leads Directory — FollowFlow AI" }],
  }),
  component: LeadsPage,
});

function LeadsPage() {
  const { leads } = useAppStore();
  const [search, setSearch] = useState("");

  const filtered = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.company.toLowerCase().includes(search.toLowerCase()) ||
      l.intent.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leads Directory"
        subtitle="Manage and track all prospective leads, intent scores, and AI follow-up actions."
        actions={
          <Button asChild className="rounded-xl">
            <Link to="/analyzer">
              <Plus className="size-4 mr-1.5" /> Analyze New Lead
            </Link>
          </Button>
        }
      />

      <div className="card-surface p-4 flex items-center gap-3">
        <Search className="size-4 text-muted-foreground" />
        <Input
          placeholder="Search leads by name, company, or intent..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-none bg-transparent shadow-none focus-visible:ring-0 text-sm"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((lead) => (
          <div key={lead.id} className="card-surface card-hover p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar name={lead.name} size="md" />
                  <div>
                    <h3 className="font-semibold text-base leading-tight">{lead.name}</h3>
                    <p className="text-xs text-muted-foreground">{lead.company}</p>
                  </div>
                </div>
                <PriorityBadge priority={lead.priority} />
              </div>

              <div className="space-y-1.5 text-xs">
                <p>
                  <span className="text-muted-foreground">Intent:</span>{" "}
                  <span className="font-medium text-foreground">{lead.intent}</span>
                </p>
                <p>
                  <span className="text-muted-foreground">Next Action:</span>{" "}
                  <span className="font-medium text-primary">{lead.nextAction}</span>
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
              <ScoreMeter score={lead.score} />
              <div className="flex items-center gap-1">
                <Button asChild variant="ghost" size="sm" className="rounded-lg text-xs">
                  <Link to="/generator" search={{ lead: lead.id }}>
                    <Wand2 className="size-3.5 mr-1" /> Draft
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="rounded-lg text-xs">
                  <Link to="/leads/$leadId" params={{ leadId: lead.id }}>
                    Details <ArrowUpRight className="size-3.5 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
