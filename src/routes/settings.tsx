import { createFileRoute } from "@tanstack/react-router";
import { Bell, Key, Settings as SettingsIcon, Shield, User } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [{ title: "Settings — FollowFlow AI" }],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings & Preferences"
        subtitle="Manage agent settings, API credentials, and notification thresholds."
      />

      <div className="max-w-2xl space-y-6">
        <div className="card-surface p-6 space-y-4">
          <h3 className="font-bold text-base flex items-center gap-2">
            <Key className="size-4 text-primary" /> Gemini AI Configuration
          </h3>
          <div className="space-y-2 text-xs text-muted-foreground">
            <p>
              Your Gemini API Key is configured server-side via <code className="bg-secondary px-1.5 py-0.5 rounded font-mono text-foreground">GEMINI_API_KEY</code> environment variable for security.
            </p>
            <div className="rounded-xl border border-success/30 bg-success/10 p-3 text-success font-medium flex items-center gap-2">
              <Shield className="size-4" /> Server-side API key protection active
            </div>
          </div>
        </div>

        <div className="card-surface p-6 space-y-4">
          <h3 className="font-bold text-base flex items-center gap-2">
            <User className="size-4 text-primary" /> Profile Preferences
          </h3>
          <div className="space-y-3 text-sm">
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">User Name</label>
              <input
                type="text"
                readOnly
                value="Alex Morgan"
                className="w-full rounded-xl border border-border bg-secondary/40 px-3.5 py-2 text-sm text-foreground font-medium"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">Role</label>
              <input
                type="text"
                readOnly
                value="Sales Manager"
                className="w-full rounded-xl border border-border bg-secondary/40 px-3.5 py-2 text-sm text-foreground font-medium"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
