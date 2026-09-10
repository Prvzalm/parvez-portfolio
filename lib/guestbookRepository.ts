import type { GuestTrace } from "../data/guestbook";
import { supabase } from "./supabase";

export interface GuestbookRepository {
  getTraces(): Promise<GuestTrace[]>;
  addTrace(trace: Omit<GuestTrace, "id" | "createdAt">): Promise<GuestTrace>;
  deleteTrace(id: string): Promise<void>;
}

const traces: GuestTrace[] = [];

type GuestbookRow = {
  id: string;
  name: string;
  drawing: string;
  created_at: string;
  anonymous: boolean;
};

function fromRow(row: GuestbookRow): GuestTrace {
  return {
    id: row.id,
    name: row.name,
    drawing: row.drawing,
    createdAt: row.created_at,
    anonymous: row.anonymous
  };
}

/**
 * The UI depends on this small repository contract, so a Supabase adapter can
 * replace this in-memory implementation later without changing components.
 */
export const guestbookRepository: GuestbookRepository = {
  async getTraces() {
    if (supabase) {
      const { data, error } = await supabase
        .from("guestbook_traces")
        .select("id, name, drawing, created_at, anonymous")
        .order("created_at", { ascending: false })
        .limit(60);
      if (!error && data) return (data as GuestbookRow[]).map(fromRow);
      if (error) console.warn("Guestbook traces could not be loaded from Supabase.", error.message);
    }
    return [...traces];
  },
  async addTrace(input) {
    if (supabase) {
      const { data, error } = await supabase
        .from("guestbook_traces")
        .insert({
          name: input.name,
          drawing: input.drawing,
          anonymous: input.anonymous
        })
        .select("id, name, drawing, created_at, anonymous")
        .single();
      if (!error && data) return fromRow(data as GuestbookRow);
      if (error) console.warn("Guestbook trace could not be saved to Supabase.", error.message);
    }
    const trace: GuestTrace = {
      ...input,
      id: `local-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    traces.push(trace);
    return trace;
  },
  async deleteTrace(id) {
    if (supabase) {
      const { error } = await supabase.from("guestbook_traces").delete().eq("id", id);
      if (!error) return;
      console.warn("Guestbook trace could not be deleted from Supabase.", error.message);
    }
    const index = traces.findIndex((trace) => trace.id === id);
    if (index >= 0) traces.splice(index, 1);
  }
};
