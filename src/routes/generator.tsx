import { useEffect, useState } from "react";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import {
  Check,
  CheckCircle2,
  Copy,
  Loader2,
  Mail,
  MessageSquare,
  RefreshCw,
  Send,
  Sparkles,
  User,
  Wand2,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { PriorityBadge } from "@/components/PriorityBadge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  generateFollowUpMessageFn,
  fallbackGenerateMessage,
} from "@/lib/ai-functions";

export const Route = createFileRoute("/generator")({
  validateSearch: (search: Record<string, unknown>) => ({
    lead: typeof search["lead"] === "string" ? search["lead"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "AI Follow-Up Generator — FollowFlow AI" },
      {
        name: "description",
        content:
          "Generate personalized sales follow-up messages for Email, LinkedIn, or WhatsApp using Gemini AI.",
      },
    ],
  }),
  component: GeneratorPage,
});

const CHANNELS = ["Email", "LinkedIn Message", "WhatsApp Message"] as const;
const TONES = ["Professional", "Friendly", "Concise", "Persuasive"] as const;

function GeneratorPage() {
  const search = useSearch({ from: "/generator" });
  const { leads, markAsSent } = useAppStore();

  const [selectedLeadId, setSelectedLeadId] = useState<string>(
    search.lead || (leads[0]?.id ?? "")
  );

  useEffect(() => {
    if (search.lead && leads.some((l) => l.id === search.lead)) {
      setSelectedLeadId(search.lead);
    }
  }, [search.lead, leads]);

  const currentLead = leads.find((l) => l.id === selectedLeadId) || leads[0];

  const [channel, setChannel] = useState<(typeof CHANNELS)[number]>("Email");
  const [tone, setTone] = useState<(typeof TONES)[number]>("Professional");

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSubject, setGeneratedSubject] = useState("");
  const [generatedBody, setGeneratedBody] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleGenerate = async () => {
    if (!currentLead) {
      toast.error("Please select a lead first.");
      return;
    }

    setIsGenerating(true);
    setIsCopied(false);
    setIsSent(false);

    try {
      const painPoints = currentLead.painPoints || [];
      const objections = currentLead.objections ? [currentLead.objections] : [];
      const buyingSignals = currentLead.buyingSignals ? [currentLead.buyingSignals] : [];

      const payload = {
        leadName: currentLead.name,
        company: currentLead.company,
        customerIntent: currentLead.intent || "Follow up on previous conversation",
        painPoints,
        objections,
        buyingSignals,
        nextBestAction: currentLead.nextAction || "Schedule a follow-up call",
        channel,
        tone,
      };

      let result;
      try {
        result = await generateFollowUpMessageFn({ data: payload });
      } catch (e) {
        console.warn("Server generator RPC failed, executing smart message fallback:", e);
        result = fallbackGenerateMessage(payload);
      }

      setGeneratedSubject(result.subject || "");
      setGeneratedBody(result.body || "");
      toast.success(`Generated ${channel} for ${currentLead.name}`);
    } catch (err: unknown) {
      console.error(err);
      toast.error("Unable to generate message. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    const fullText = channel === "Email" && generatedSubject
      ? `Subject: ${generatedSubject}\n\n${generatedBody}`
      : generatedBody;

    navigator.clipboard.writeText(fullText);
    setIsCopied(true);
    toast.success("Message copied to clipboard!");
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleMarkSent = () => {
    if (!currentLead) return;
    markAsSent(currentLead.id);
    setIsSent(true);
    toast.success(`Marked follow-up for ${currentLead.name} as Sent!`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Follow-Up Generator"
        subtitle="Generate highly tailored, non-robotic follow-up messages tailored to your prospect's pain points and intent."
      />

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Controls Column */}
        <div className="space-y-5 lg:col-span-5 xl:col-span-4">
          <div className="card-surface p-5 space-y-4">
            <h3 className="font-semibold text-sm flex items-center gap-2 text-foreground">
              <User className="size-4 text-primary" /> Select Prospect / Lead
            </h3>

            <Select value={selectedLeadId} onValueChange={setSelectedLeadId}>
              <SelectTrigger className="w-full rounded-xl bg-secondary/50">
                <SelectValue placeholder="Choose a lead..." />
              </SelectTrigger>
              <SelectContent>
                {leads.map((l) => (
                  <SelectItem key={l.id} value={l.id}>
                    {l.name} — {l.company} ({l.priority})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {currentLead && (
              <div className="rounded-xl border border-border bg-secondary/30 p-3.5 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">{currentLead.name}</span>
                  <PriorityBadge priority={currentLead.priority} />
                </div>
                <p className="text-muted-foreground">{currentLead.company} • {currentLead.role || "Prospect"}</p>
                <div className="border-t border-border/60 pt-2 space-y-1">
                  <p>
                    <span className="text-muted-foreground">Intent:</span>{" "}
                    <span className="font-medium text-foreground">{currentLead.intent}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Recommended Action:</span>{" "}
                    <span className="font-medium text-primary">{currentLead.nextAction}</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="card-surface p-5 space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                Communication Channel
              </label>
              <div className="grid grid-cols-1 gap-2">
                {CHANNELS.map((ch) => (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => setChannel(ch)}
                    className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-2 text-xs font-medium transition-all ${
                      channel === ch
                        ? "border-primary bg-primary/10 text-primary shadow-sm"
                        : "border-border bg-card text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    {ch === "Email" ? (
                      <Mail className="size-4" />
                    ) : (
                      <MessageSquare className="size-4" />
                    )}
                    {ch}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                Tone
              </label>
              <div className="grid grid-cols-2 gap-2">
                {TONES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTone(t)}
                    className={`rounded-xl border px-3 py-2 text-xs font-medium text-center transition-all ${
                      tone === t
                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                        : "border-border bg-card text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !currentLead}
              className="w-full rounded-xl"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-2" />
                  Generating Message...
                </>
              ) : (
                <>
                  <Wand2 className="size-4 mr-2" />
                  Generate Personalized Message
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Output Column */}
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="card-surface p-6 space-y-4 min-h-[480px]">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="size-5 text-primary" />
                <h2 className="font-bold text-lg">Generated {channel}</h2>
                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  Tone: {tone}
                </span>
              </div>

              {isSent && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-success bg-success/10 border border-success/20 px-3 py-1 rounded-full">
                  <CheckCircle2 className="size-3.5" /> Sent
                </span>
              )}
            </div>

            {isGenerating ? (
              <div className="py-20 grid place-items-center text-center space-y-3">
                <Loader2 className="size-8 animate-spin text-primary mx-auto" />
                <p className="font-semibold text-base">Gemini 3.7 Flash is crafting a personalized follow-up...</p>
                <p className="text-xs text-muted-foreground max-w-sm">
                  Incorporating intent, objections, pain points, and recommended actions.
                </p>
              </div>
            ) : generatedBody ? (
              <div className="space-y-4">
                {channel === "Email" && generatedSubject && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Subject Line
                    </label>
                    <input
                      type="text"
                      value={generatedSubject}
                      onChange={(e) => setGeneratedSubject(e.target.value)}
                      className="w-full font-medium rounded-xl border border-border bg-secondary/40 px-3.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Message Body
                  </label>
                  <Textarea
                    value={generatedBody}
                    onChange={(e) => setGeneratedBody(e.target.value)}
                    className="min-h-[280px] resize-y leading-relaxed text-sm rounded-xl bg-secondary/30 p-4"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="rounded-xl text-xs"
                    >
                      <RefreshCw className="size-3.5 mr-1.5" /> Regenerate
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCopy}
                      className="rounded-xl text-xs"
                    >
                      {isCopied ? (
                        <>
                          <Check className="size-3.5 mr-1.5 text-success" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="size-3.5 mr-1.5" /> Copy Message
                        </>
                      )}
                    </Button>
                  </div>

                  <Button
                    onClick={handleMarkSent}
                    disabled={isSent}
                    className="rounded-xl"
                  >
                    <Send className="size-4 mr-1.5" /> {isSent ? "Marked as Sent" : "Mark as Sent"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="py-24 grid place-items-center text-center">
                <div className="space-y-3 max-w-sm">
                  <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-secondary text-muted-foreground">
                    <Wand2 className="size-6 text-primary" />
                  </span>
                  <h3 className="font-bold text-lg">Ready to Generate Follow-Up</h3>
                  <p className="text-sm text-muted-foreground">
                    Select a prospect on the left, choose your preferred communication channel and tone, then click <strong>“Generate Personalized Message”</strong>.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
