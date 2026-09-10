import type { GuestTrace, GuestTraceMetadata } from "../data/guestbook";

export interface GuestbookRepository {
  getTraces(): Promise<GuestTrace[]>;
  addTrace(trace: Omit<GuestTrace, "id" | "createdAt">, metadata?: GuestTraceMetadata): Promise<GuestTrace>;
  deleteTrace(id: string): Promise<void>;
}

const traces: GuestTrace[] = [];

type GuestbookRow = {
  id: string;
  name: string;
  image_url: string;
  cloudinary_public_id: string | null;
  created_at: string;
  anonymous: boolean;
};

function fromRow(row: GuestbookRow): GuestTrace {
  return {
    id: row.id,
    name: row.name,
    drawing: row.image_url,
    cloudinaryPublicId: row.cloudinary_public_id ?? undefined,
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
    const response = await fetch("/api/guestbook/traces", { cache: "no-store" });
    if (!response.ok) throw new Error("Guestbook traces could not be loaded.");
    const data = await response.json() as GuestbookRow[];
    return data.map(fromRow);
  },
  async addTrace(input, metadata) {
    const response = await fetch("/api/guestbook/traces", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: input.name,
        imageUrl: input.drawing,
        publicId: input.cloudinaryPublicId,
        anonymous: input.anonymous,
        ...metadata
      })
    });
    if (!response.ok) throw new Error("Guestbook trace could not be saved.");
    return fromRow(await response.json() as GuestbookRow);
  },
  async deleteTrace(id) {
    if (!id.startsWith("local-")) return;
    const index = traces.findIndex((trace) => trace.id === id);
    if (index >= 0) traces.splice(index, 1);
  }
};
