import { useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
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
  ShieldCheck,
  ArrowRight,
  Flame,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/PriorityBadge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
          <Avatar name="Vijayapandian T" fallback="VJ" size={collapsed ? "sm" : "md"} />
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Vijayapandian T</p>
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
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: "/leads", search: { q: searchQuery.trim() } });
    } else {
      navigate({ to: "/leads" });
    }
  };

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

            <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search leads, companies, follow-ups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 rounded-xl border-border bg-secondary/60 pl-9 text-sm shadow-none focus-visible:bg-card"
              />
            </form>

            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => toast.success("FollowFlow AI Engine: Online & Active (Gemini 3.7 Flash)")}
                className="hidden items-center gap-2 rounded-full border border-success/25 bg-success/10 px-3 py-1.5 text-xs font-semibold text-success sm:inline-flex hover:bg-success/20 transition-all cursor-pointer"
              >
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-2 animate-ping rounded-full bg-success/70" />
                  <span className="relative inline-flex size-2 rounded-full bg-success" />
                </span>
                AI Active
              </button>

              {/* Notification Bell Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Notifications"
                    className="relative rounded-xl border border-border cursor-pointer hover:bg-secondary"
                  >
                    <Bell className="size-4" />
                    <span className="absolute right-2 top-2 size-1.5 rounded-full bg-critical" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 rounded-xl p-2 shadow-lg">
                  <DropdownMenuLabel className="text-xs font-bold text-foreground px-2 py-1.5">
                    AI Intelligence Alerts
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="flex flex-col items-start gap-1 p-2.5 rounded-lg cursor-pointer"
                    onClick={() => navigate({ to: "/leads" })}
                  >
                    <span className="text-xs font-semibold flex items-center gap-1.5 text-critical">
                      <Flame className="size-3.5 text-critical" /> Sarah Johnson (Acme Corp)
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      Critical follow-up due. Requested Enterprise Plan pricing.
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex flex-col items-start gap-1 p-2.5 rounded-lg cursor-pointer"
                    onClick={() => navigate({ to: "/leads" })}
                  >
                    <span className="text-xs font-semibold flex items-center gap-1.5 text-primary">
                      <Sparkles className="size-3.5 text-primary" /> Michael Chen (TechNova)
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      Technical demo confirmed for Friday 10:00 AM.
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex flex-col items-start gap-1 p-2.5 rounded-lg cursor-pointer"
                    onClick={() => navigate({ to: "/leads" })}
                  >
                    <span className="text-xs font-semibold flex items-center gap-1.5 text-warning">
                      <AlertTriangle className="size-3.5 text-warning" /> Emily Davis (BrightLabs)
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      Cold risk flag: 4 days since previous interaction.
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="justify-center text-xs font-semibold text-primary cursor-pointer py-2"
                    onClick={() => navigate({ to: "/follow-ups" })}
                  >
                    View All Follow-Ups <ArrowRight className="ml-1 size-3.5" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Profile Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer">
                    <Avatar name="Vijayapandian T" fallback="VJ" size="sm" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-xl p-2 shadow-lg">
                  <DropdownMenuLabel className="p-2">
                    <p className="text-xs font-semibold text-foreground">Vijayapandian T</p>
                    <p className="text-[11px] text-muted-foreground">Sales Manager • FollowFlow AI</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate({ to: "/" })} className="cursor-pointer">
                    <LayoutDashboard className="mr-2 size-4 text-primary" /> Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate({ to: "/follow-ups" })} className="cursor-pointer">
                    <ListChecks className="mr-2 size-4 text-primary" /> Follow-ups Queue
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate({ to: "/leads" })} className="cursor-pointer">
                    <Users className="mr-2 size-4 text-primary" /> Leads Directory
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate({ to: "/analyzer" })} className="cursor-pointer">
                    <Wand2 className="mr-2 size-4 text-primary" /> AI Analyzer
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate({ to: "/generator" })} className="cursor-pointer">
                    <Sparkles className="mr-2 size-4 text-primary" /> AI Generator
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate({ to: "/insights" })} className="cursor-pointer">
                    <Brain className="mr-2 size-4 text-primary" /> AI Insights
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate({ to: "/settings" })} className="cursor-pointer">
                    <Settings className="mr-2 size-4 text-muted-foreground" /> Settings & Config
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
