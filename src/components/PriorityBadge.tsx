import { cn } from "@/lib/utils";
import type { Priority } from "@/lib/mock-data";

const styles: Record<string, string> = {
  Critical: "bg-critical/10 text-critical border-critical/25",
  High: "bg-warning/15 text-[color:oklch(0.5_0.13_60)] border-warning/35",
  Medium: "bg-primary/10 text-primary border-primary/25",
  Low: "bg-muted text-muted-foreground border-border",
  Completed: "bg-success/10 text-success border-success/25",
};

export function PriorityBadge({
  priority,
  className,
}: {
  priority: Priority | "Completed";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        styles[priority],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {priority}
    </span>
  );
}

export function ScoreMeter({ score, className }: { score: number; className?: string }) {
  const tone =
    score >= 90
      ? "bg-critical"
      : score >= 80
        ? "bg-warning"
        : score >= 60
          ? "bg-primary"
          : "bg-muted-foreground/50";
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
        <div className={cn("h-full rounded-full transition-all", tone)} style={{ width: `${score}%` }} />
      </div>
      <span className="text-sm font-semibold tabular-nums">{score}</span>
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const tone =
    status === "Cold"
      ? "bg-muted text-muted-foreground"
      : status === "Negotiation" || status === "Proposal Sent"
        ? "bg-primary/10 text-primary"
        : status === "In Trial"
          ? "bg-success/10 text-success"
          : "bg-accent text-accent-foreground";
  return (
    <span className={cn("rounded-md px-2 py-1 text-xs font-medium", tone)}>{status}</span>
  );
}

export function Avatar({
  name,
  fallback,
  size = "md",
  className,
}: {
  name: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dims = size === "sm" ? "size-8 text-xs" : size === "lg" ? "size-14 text-lg" : "size-10 text-sm";
  const initials = fallback || name.split(" ").map((p) => p[0]).slice(0, 2).join("");
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-brand font-semibold text-primary-foreground",
        dims,
        className,
      )}
    >
      {initials}
    </span>
  );
}
