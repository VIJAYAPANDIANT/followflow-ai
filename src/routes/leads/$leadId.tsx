import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Mail, MapPin, Phone, ShieldAlert, Sparkles, Target, Wand2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Avatar, PriorityBadge, ScoreMeter } from "@/components/PriorityBadge";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/app-store";

export const Route = createFileRoute("/leads/$leadId")({
  head: ({ params }) => ({
    meta: [{ title: `Lead Details — ${params.leadId}` }],
  }),
  component: LeadDetailPage,
});

function LeadDetailPage() {
  const { leadId } = Route.useParams();
  const { getLeadById, leads } = useAppStore();

  const lead = getLeadById(leadId) || leads[0];

  if (!lead) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="font-semibold">Lead not found</p>
        <Button asChild variant="outline">
          <Link to="/leads">Back to Leads</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Button asChild variant="ghost" size="sm" className="mb-2 text-xs">
          <Link to="/leads">
            <ArrowLeft className="size-3.5 mr-1" /> Back to Leads
          </Link>
        </Button>
        <PageHeader
          title={lead.name}
          subtitle={`${lead.role || "Prospect"} at ${lead.company}`}
          actions={
            <Button asChild className="rounded-xl">
              <Link to="/generator" search={{ lead: lead.id }}>
                <Wand2 className="size-4 mr-1.5" /> Generate Message
              </Link>
            </Button>
          }
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-4">
          <div className="card-surface p-5 space-y-4">
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <Avatar name={lead.name} size="lg" />
              <div>
                <h3 className="font-bold text-lg">{lead.name}</h3>
                <p className="text-xs text-muted-foreground">{lead.company}</p>
                <div className="mt-1.5">
                  <PriorityBadge priority={lead.priority} />
                </div>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-muted-foreground">
              <p className="flex items-center gap-2">
                <Mail className="size-3.5 text-primary" /> {lead.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="size-3.5 text-primary" /> {lead.phone}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="size-3.5 text-primary" /> {lead.location}
              </p>
              <p className="flex items-center gap-2">
                <Calendar className="size-3.5 text-primary" /> Next Follow-up: {lead.nextFollowUp}
              </p>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-xs font-semibold text-muted-foreground mb-1">Priority Score</p>
              <ScoreMeter score={lead.score} />
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-8">
          <div className="card-surface p-6 space-y-5">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Sparkles className="size-5 text-primary" /> AI Insights Summary
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-secondary/30 p-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Target className="size-3.5 text-primary" /> Intent
                </p>
                <p className="text-sm font-medium">{lead.intent}</p>
              </div>

              <div className="rounded-xl border border-border bg-secondary/30 p-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <ShieldAlert className="size-3.5 text-warning" /> Objections
                </p>
                <p className="text-sm font-medium">{lead.objections || "None specified"}</p>
              </div>
            </div>

            <div className="rounded-xl border border-primary/25 bg-primary/5 p-4">
              <p className="text-xs font-bold text-primary">Recommended Action</p>
              <p className="text-sm font-semibold mt-1">{lead.nextAction}</p>
            </div>

            {lead.timeline && lead.timeline.length > 0 && (
              <div className="border-t border-border pt-5 space-y-3">
                <h4 className="font-bold text-sm">Interaction Timeline</h4>
                <div className="space-y-3">
                  {lead.timeline.map((evt) => (
                    <div key={evt.id} className="rounded-xl border border-border/60 p-3 bg-secondary/20 text-xs space-y-1">
                      <div className="flex items-center justify-between font-semibold">
                        <span>{evt.title}</span>
                        <span className="text-muted-foreground text-[11px]">{evt.date}</span>
                      </div>
                      <p className="text-muted-foreground">{evt.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
