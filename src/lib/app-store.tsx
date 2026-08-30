import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  initialFollowUps,
  leads as initialLeads,
  type FollowUp,
  type Lead,
  type Priority,
} from "./mock-data";
import type { AnalysisResult } from "@/lib/ai-functions";

type AppState = {
  followUps: FollowUp[];
  leads: Lead[];
  toggleComplete: (id: string) => void;
  markAsSent: (id: string) => void;
  addFollowUp: (item: Omit<FollowUp, "id" | "completed">) => boolean;
  addAnalyzedLead: (analysis: AnalysisResult) => { leadId: string; followUpId: string };
  getLeadById: (id: string) => Lead | undefined;
  dueToday: number;
  criticalCount: number;
};

const AppContext = createContext<AppState | null>(null);

const FOLLOW_UPS_KEY = "followflow_follow_ups_v1";
const LEADS_KEY = "followflow_leads_v1";

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [followUps, setFollowUps] = useState<FollowUp[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(FOLLOW_UPS_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.error("Failed to load followUps from localStorage:", e);
      }
    }
    return initialFollowUps;
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(LEADS_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.error("Failed to load leads from localStorage:", e);
      }
    }
    return initialLeads;
  });

  // Sync to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(FOLLOW_UPS_KEY, JSON.stringify(followUps));
      } catch (e) {
        console.error("Failed to save followUps:", e);
      }
    }
  }, [followUps]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
      } catch (e) {
        console.error("Failed to save leads:", e);
      }
    }
  }, [leads]);

  const toggleComplete = useCallback((id: string) => {
    setFollowUps((prev) =>
      prev.map((f) => (f.id === id ? { ...f, completed: !f.completed } : f)),
    );
  }, []);

  const markAsSent = useCallback((id: string) => {
    setFollowUps((prev) =>
      prev.map((f) => (f.id === id || f.leadId === id ? { ...f, completed: true, status: "Sent" } : f)),
    );
  }, []);

  const addFollowUp = useCallback((item: Omit<FollowUp, "id" | "completed">) => {
    let added = false;
    setFollowUps((prev) => {
      if (prev.some((f) => f.leadId === item.leadId && !f.completed)) return prev;
      added = true;
      return [{ ...item, id: `f-${Date.now()}`, completed: false }, ...prev];
    });
    return added;
  }, []);

  const addAnalyzedLead = useCallback((analysis: AnalysisResult) => {
    const slug = `${analysis.leadName}-${analysis.company}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const leadId = slug || `lead-${Date.now()}`;
    const followUpId = `f-${Date.now()}`;

    // Compute Priority Level:
    // 90-100 = Critical, 75-89 = High, 50-74 = Medium, 0-49 = Low
    let priority: Priority = "Medium";
    const score = Math.max(0, Math.min(100, Math.round(analysis.priorityScore)));
    if (score >= 90) priority = "Critical";
    else if (score >= 75) priority = "High";
    else if (score >= 50) priority = "Medium";
    else priority = "Low";

    const newFollowUp: FollowUp = {
      id: followUpId,
      leadId,
      name: analysis.leadName,
      company: analysis.company,
      priority,
      score,
      due: analysis.followUpDeadline || "Today, 5:00 PM",
      lastInteraction: "Just now",
      action: analysis.nextBestAction,
      completed: false,
    };

    const newLead: Lead = {
      id: leadId,
      name: analysis.leadName,
      company: analysis.company,
      role: "Decision Maker",
      email: `${analysis.leadName.toLowerCase().replace(/\s+/g, ".")}@${analysis.company.toLowerCase().replace(/\s+/g, "")}.com`,
      phone: "+1 (555) 019-2834",
      location: "United States",
      interest: analysis.interestLevel === "Critical" || analysis.interestLevel === "High" ? "High" : analysis.interestLevel === "Low" ? "Low" : "Medium",
      priority,
      score,
      lastInteraction: "Just now",
      nextFollowUp: analysis.followUpDeadline || "Today, 5:00 PM",
      status: "New",
      intent: analysis.customerIntent,
      painPoints: analysis.painPoints,
      objections: analysis.objections.join("; "),
      buyingSignals: analysis.buyingSignals.join("; "),
      urgency: priority,
      nextAction: analysis.nextBestAction,
      timeline: [
        {
          id: `t-${Date.now()}`,
          type: "ai",
          title: "AI Analysis Completed",
          detail: `Extracted intent: "${analysis.customerIntent}". Priority score set to ${score}.`,
          date: "Just now",
        },
      ],
    };

    setLeads((prev) => [newLead, ...prev.filter((l) => l.id !== leadId)]);
    setFollowUps((prev) => [newFollowUp, ...prev.filter((f) => f.leadId !== leadId)]);

    return { leadId, followUpId };
  }, []);

  const getLeadById = useCallback((id: string) => {
    return leads.find((l) => l.id === id || l.name.toLowerCase().includes(id.toLowerCase()));
  }, [leads]);

  const value = useMemo<AppState>(
    () => ({
      followUps,
      leads,
      toggleComplete,
      markAsSent,
      addFollowUp,
      addAnalyzedLead,
      getLeadById,
      dueToday: followUps.filter((f) => !f.completed).length,
      criticalCount: followUps.filter((f) => !f.completed && f.priority === "Critical").length,
    }),
    [followUps, leads, toggleComplete, markAsSent, addFollowUp, addAnalyzedLead, getLeadById],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppStore() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppStore must be used inside AppStoreProvider");
  return ctx;
}
