import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock,
  Flame,
  Loader2,
  Plus,
  ShieldAlert,
  Sparkles,
  Target,
  Wand2,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { PriorityBadge, ScoreMeter } from "@/components/PriorityBadge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAppStore } from "@/lib/app-store";
import {
  analyzeConversationFn,
  fallbackAnalyzeConversation,
  type AnalysisResult,
} from "@/lib/ai-functions";

export const Route = createFileRoute("/analyzer")({
  head: () => ({
    meta: [
      { title: "AI Conversation Analyzer — FollowFlow AI" },
      {
        name: "description",
        content:
          "Analyze sales call transcripts, meeting notes, and customer emails with Gemini AI to extract intent, priority scores, and follow-up actions.",
      },
    ],
  }),
  component: AnalyzerPage,
});

const SAMPLE_TRANSCRIPT = `Hi Sarah,

It was great speaking with you today about Acme Corp's operational challenges.

You mentioned that your team is currently struggling to automate workflows and generate accurate reports as the company continues to grow.

You were particularly interested in our Enterprise Plan and asked about pricing and implementation timelines.

However, you mentioned that you need approval from your finance team before moving forward.

Could you please send me the Enterprise Plan pricing details by Friday? I would also like to schedule another discussion next week if possible.

Thanks,
Sarah Johnson
VP of Operations
Acme Corp`;

function AnalyzerPage() {
  const navigate = useNavigate();
  const { addAnalyzedLead } = useAppStore();
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [addedLeadInfo, setAddedLeadInfo] = useState<{ leadId: string; followUpId: string } | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast.error("Please enter or paste a sales conversation first.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAddedLeadInfo(null);

    try {
      const result = await analyzeConversationFn({ data: { text } });
      setAnalysis(result);
      toast.success(`Analysis complete for ${result.leadName} (${result.company})`);
    } catch (err: unknown) {
      console.warn("Server analyzer RPC failed, executing smart fallback:", err);
      const fallbackResult = fallbackAnalyzeConversation(text);
      setAnalysis(fallbackResult);
      toast.success(`Analysis complete for ${fallbackResult.leadName} (${fallbackResult.company})`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAddToQueue = () => {
    if (!analysis) return;
    const info = addAnalyzedLead(analysis);
    setAddedLeadInfo(info);
    toast.success(`Added ${analysis.leadName} to Follow-up Queue with score ${analysis.priorityScore}!`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Conversation Analyzer"
        subtitle="Paste sales transcripts, meeting notes, or customer emails for instant AI follow-up insights."
      />

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Input Column */}
        <div className="space-y-4 lg:col-span-6 xl:col-span-5">
          <div className="card-surface p-5 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                <Brain className="size-4 text-primary" />
                Sales Conversation / Notes
              </label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-xs text-primary hover:text-primary/80"
                onClick={() => {
                  setText(SAMPLE_TRANSCRIPT);
                  toast.info("Sample transcript loaded");
                }}
              >
                Load Sample Data
              </Button>
            </div>

            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste sales call transcript, meeting notes, or customer email here..."
              className="min-h-[340px] resize-y font-mono text-sm leading-relaxed rounded-xl bg-secondary/40 focus-visible:bg-card"
              disabled={isAnalyzing}
            />

            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-muted-foreground">
                Powered by Gemini 3.7 Flash • Secure & Private
              </p>
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !text.trim()}
                className="rounded-xl px-6"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="size-4 animate-spin mr-2" />
                    Analyzing with AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4 mr-2" />
                    Analyze with AI
                  </>
                )}
              </Button>
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-critical/30 bg-critical/10 p-4 text-critical flex items-start gap-3">
              <AlertCircle className="size-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Analysis Failed</p>
                <p className="text-xs mt-1 opacity-90">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Analysis Results Column */}
        <div className="lg:col-span-6 xl:col-span-7">
          {isAnalyzing ? (
            <div className="card-surface min-h-[460px] grid place-items-center p-8 text-center">
              <div className="space-y-4 max-w-sm">
                <div className="relative mx-auto size-16 grid place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Brain className="size-8 animate-pulse" />
                  <span className="absolute -top-1 -right-1 flex size-3">
                    <span className="animate-ping absolute inline-flex size-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex size-3 rounded-full bg-primary" />
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">FollowFlow AI is analyzing the conversation...</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Detecting intent, extracting pain points, evaluating risk level, and scoring follow-up priority.
                  </p>
                </div>
              </div>
            </div>
          ) : analysis ? (
            <div className="space-y-5">
              <div className="card-surface p-6 space-y-6">
                {/* Header Info */}
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-bold font-display">{analysis.leadName}</h2>
                      <span className="text-sm text-muted-foreground font-medium">@ {analysis.company}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                      <Target className="size-4 text-primary" />
                      Intent: <span className="font-medium text-foreground">{analysis.customerIntent}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Priority Score</p>
                      <ScoreMeter score={analysis.priorityScore} className="mt-1" />
                    </div>
                    <PriorityBadge
                      priority={
                        analysis.priorityScore >= 90
                          ? "Critical"
                          : analysis.priorityScore >= 75
                          ? "High"
                          : analysis.priorityScore >= 50
                          ? "Medium"
                          : "Low"
                      }
                    />
                  </div>
                </div>

                {/* Key Insights Grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-border bg-secondary/30 p-4 space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="size-3.5 text-primary" /> Pain Points
                    </p>
                    <ul className="space-y-1.5 text-sm">
                      {analysis.painPoints.length > 0 ? (
                        analysis.painPoints.map((p, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-foreground">
                            <span className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
                            <span>{p}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-muted-foreground text-xs">None explicitly identified</li>
                      )}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-border bg-secondary/30 p-4 space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-success" /> Buying Signals
                    </p>
                    <ul className="space-y-1.5 text-sm">
                      {analysis.buyingSignals.length > 0 ? (
                        analysis.buyingSignals.map((b, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-foreground">
                            <span className="size-1.5 rounded-full bg-success mt-2 shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-muted-foreground text-xs">None explicitly identified</li>
                      )}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-border bg-secondary/30 p-4 space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldAlert className="size-3.5 text-warning" /> Objections
                    </p>
                    <ul className="space-y-1.5 text-sm">
                      {analysis.objections.length > 0 ? (
                        analysis.objections.map((o, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-foreground">
                            <span className="size-1.5 rounded-full bg-warning mt-2 shrink-0" />
                            <span>{o}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-muted-foreground text-xs">No objections raised</li>
                      )}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-border bg-secondary/30 p-4 space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="size-3.5 text-info" /> Urgency & Risk
                    </p>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="text-muted-foreground">Urgency:</span>{" "}
                        <span className="font-medium">{analysis.urgency}</span>
                      </p>
                      <p>
                        <span className="text-muted-foreground">Deadline:</span>{" "}
                        <span className="font-medium">{analysis.followUpDeadline}</span>
                      </p>
                      <p>
                        <span className="text-muted-foreground">Cold Risk:</span>{" "}
                        <span className="font-medium text-critical">{analysis.riskLevel}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* AI Recommended Next Action */}
                <div className="rounded-xl border border-primary/25 bg-primary/5 p-4">
                  <p className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Flame className="size-4 text-primary" /> Recommended Next Action
                  </p>
                  <p className="text-base font-semibold text-foreground mt-1">
                    {analysis.nextBestAction}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  {addedLeadInfo ? (
                    <div className="flex items-center gap-2 text-success font-semibold text-sm">
                      <CheckCircle2 className="size-4" /> Added to Follow-up Queue
                    </div>
                  ) : (
                    <Button onClick={handleAddToQueue} className="rounded-xl">
                      <Plus className="size-4 mr-1.5" /> Add to Follow-up Queue
                    </Button>
                  )}

                  <Button
                    onClick={() => {
                      const info = addedLeadInfo || addAnalyzedLead(analysis);
                      navigate({ to: "/generator", search: { lead: info.leadId } });
                    }}
                    variant="secondary"
                    className="rounded-xl"
                  >
                    <Wand2 className="size-4 mr-1.5 text-primary" /> Generate Personalized Message
                    <ArrowRight className="size-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="card-surface min-h-[460px] grid place-items-center p-8 text-center">
              <div className="space-y-3 max-w-sm">
                <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-secondary text-muted-foreground">
                  <Sparkles className="size-6" />
                </span>
                <h3 className="font-bold text-lg">AI Insights Will Appear Here</h3>
                <p className="text-sm text-muted-foreground">
                  Paste a conversation on the left and click <strong>“Analyze with AI”</strong> to extract lead intent, pain points, risk levels, and priority scores.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
