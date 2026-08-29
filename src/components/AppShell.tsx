import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Brain,
  ChevronLeft,
  LayoutDashboard,
  ListChecks,
  Menu,
  Search,
  Settings,
  Sparkles,
  Users,
  Wand2,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/PriorityBadge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/follow-ups", label: "Follow-ups", icon: ListChecks },
  { to: "/leads", label: "Leads", icon: Users },
  { to: "/analyzer", label: "AI Analyzer", icon: Brain },
  { to: "/generator", label: "AI Generator", icon: Wand2 },
  { to: "/insights", label: "AI Insights", icon: Sparkles },
  { to: "/settings", label: "Settings", icon: Settings },
];

function Logo({ collapsed }: { collapsed: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 overflow-hidden px-1 py-1">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-brand shadow-[var(--shadow-glow)]">
        <Zap className="size-4.5 text-primary-foreground" strokeWidth={2.5} />
      </span>
      {!collapsed && (
        <span className="min-w-0">
          <span className="block truncate font-display text-[0.95rem] font-bold leading-tight">
            FollowFlow AI
          </span>
          <span className="block truncate text-[0.7rem] text-muted-foreground">
            Sales follow-up agent
          </span>
        </span>
      )}
    </Link>
  );
}

function SidebarBody({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      <nav className="flex flex-1 flex-col gap-1 px-3">
        {nav.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              onClick={onNavigate}
              title={label}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-[inset_0_0_0_1px_var(--color-border)]"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                collapsed && "justify-center px-2",
              )}
            >
              <Icon className={cn("size-4.5 shrink-0", active && "text-primary")} />
              {!collapsed && <span className="truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-sidebar-border p-3">
        <div
          className={cn(
            "flex items-center gap-3 rounded-xl bg-secondary/70 p-2.5",
            collapsed && "justify-center bg-transparent p-0",
          )}
        >
          <Avatar name="Alex Morgan" size={collapsed ? "sm" : "md"} />
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Alex Morgan</p>
              <p className="truncate text-xs text-muted-foreground">Sales Manager</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-300 lg:flex",
          collapsed ? "w-[76px]" : "w-[264px]",
        )}
      >
        <div className="flex items-center justify-between gap-2 px-4 py-4">
          <Logo collapsed={collapsed} />
          <button
            onClick={() => setCollapsed((c) => !c)}
            aria-label="Toggle sidebar"
            className={cn(
              "grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
              collapsed && "absolute right-2 top-16",
            )}
          >
            <ChevronLeft className={cn("size-4 transition-transform", collapsed && "rotate-180")} />
          </button>
        </div>
        <SidebarBody collapsed={collapsed} />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/25 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-[264px] flex-col border-r border-sidebar-border bg-sidebar">
            <div className="flex items-center justify-between px-4 py-4">
              <Logo collapsed={false} />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-secondary"
              >
                <X className="size-4" />
              </button>
            </div>
            <SidebarBody collapsed={false} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className={cn("transition-[padding] duration-300", collapsed ? "lg:pl-[76px]" : "lg:pl-[264px]")}>
        <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground lg:hidden"
            >
              <Menu className="size-4" />
            </button>

            <div className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search leads, companies, follow-ups..."
                className="h-10 rounded-xl border-border bg-secondary/60 pl-9 text-sm shadow-none focus-visible:bg-card"
              />
            </div>

            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              <span className="hidden items-center gap-2 rounded-full border border-success/25 bg-success/10 px-3 py-1.5 text-xs font-semibold text-success sm:inline-flex">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-2 animate-ping rounded-full bg-success/70" />
                  <span className="relative inline-flex size-2 rounded-full bg-success" />
                </span>
                AI Active
              </span>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Notifications"
                className="relative rounded-xl border border-border"
              >
                <Bell className="size-4" />
                <span className="absolute right-2 top-2 size-1.5 rounded-full bg-critical" />
              </Button>
              <Avatar name="Alex Morgan" size="sm" />
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
