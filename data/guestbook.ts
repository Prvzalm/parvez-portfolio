export interface GuestTrace {
  id: string;
  name: string;
  drawing: string;
  cloudinaryPublicId?: string;
  createdAt: string;
  anonymous: boolean;
}

export interface GuestTraceMetadata {
  timezone?: string;
  screen?: string;
  language?: string;
  platform?: string;
  clientMetadata?: Record<string, unknown>;
}
