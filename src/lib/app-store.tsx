import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { initialFollowUps, type FollowUp } from "./mock-data";

type AppState = {
  followUps: FollowUp[];
  toggleComplete: (id: string) => void;
  addFollowUp: (item: Omit<FollowUp, "id" | "completed">) => boolean;
  dueToday: number;
  criticalCount: number;
};

const AppContext = createContext<AppState | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [followUps, setFollowUps] = useState<FollowUp[]>(initialFollowUps);

  const toggleComplete = useCallback((id: string) => {
    setFollowUps((prev) =>
      prev.map((f) => (f.id === id ? { ...f, completed: !f.completed } : f)),
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

  const value = useMemo<AppState>(
    () => ({
      followUps,
      toggleComplete,
      addFollowUp,
      dueToday: followUps.filter((f) => !f.completed && f.due.startsWith("Today")).length + 12,
      criticalCount: followUps.filter((f) => !f.completed && f.priority === "Critical").length,
    }),
    [followUps, toggleComplete, addFollowUp],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppStore() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppStore must be used inside AppStoreProvider");
  return ctx;
}
