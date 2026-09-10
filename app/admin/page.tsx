"use client";

import { useState } from "react";

type Trace = { id: string; name: string; image_url: string; cloudinary_public_id?: string; created_at: string; active: boolean; moderation_status: string; user_agent?: string; ip_hash?: string; ip_address?: string; browser_hints?: Record<string, unknown>; client_metadata?: Record<string, unknown>; timezone?: string; screen?: string; language?: string; platform?: string; referer?: string };

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [traces, setTraces] = useState<Trace[]>([]);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  const load = async () => {
    const response = await fetch("/api/admin/traces", { headers: { "x-admin-password": password } });
    const body = await response.json();
    if (!response.ok) { setError(body.error ?? "Access denied."); return; }
    setTraces(body);
    setLoaded(true);
    setError("");
  };

  const remove = async (trace: Trace) => {
    if (!window.confirm("Delete this trace permanently?")) return;
    const response = await fetch("/api/admin/traces", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ id: trace.id, publicId: trace.cloudinary_public_id })
    });
    if (response.ok) setTraces((current) => current.filter((item) => item.id !== trace.id));
  };

  const toggleActive = async (trace: Trace) => {
    const response = await fetch("/api/admin/traces", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ id: trace.id, active: !trace.active })
    });
    if (response.ok) setTraces((current) => current.map((item) => item.id === trace.id ? { ...item, active: !item.active, moderation_status: !item.active ? "approved" : "rejected" } : item));
  };

  return <main className="admin-page">
    <div className="admin-header"><span>PA. / MODERATION</span><h1>Guestbook traces</h1><p>Review and remove anything that does not belong on the wall.</p></div>
    <div className="admin-login"><label htmlFor="admin-password">Admin password</label><input id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} onKeyDown={(event) => event.key === "Enter" && void load()} /><button type="button" onClick={() => void load()}>Unlock</button></div>
    {error ? <p className="admin-error">{error}</p> : null}
    {loaded ? <div className="admin-grid">{traces.map((trace) => <article className={`admin-trace ${trace.active ? "" : "is-inactive"}`} key={trace.id}><img src={trace.image_url} alt={`Trace by ${trace.name}`} /><div><strong>{trace.name} · {trace.active ? "ACTIVE" : "INACTIVE"}</strong><small>{new Date(trace.created_at).toLocaleString("en-GB")}</small><small>{trace.ip_address ?? "IP unavailable"} · hash {trace.ip_hash?.slice(0, 12) ?? "unavailable"}</small><small>{trace.timezone ?? "Timezone unavailable"} · {trace.screen ?? "Screen unavailable"}</small><small title={trace.user_agent}>{trace.platform ?? "Platform unavailable"} · {trace.language ?? "Language unavailable"}</small><details><summary>All metadata</summary><pre>{JSON.stringify({ userAgent: trace.user_agent, referer: trace.referer, browser: trace.browser_hints, client: trace.client_metadata }, null, 2)}</pre></details><button type="button" onClick={() => void toggleActive(trace)}>{trace.active ? "Deactivate" : "Activate"}</button><button type="button" onClick={() => void remove(trace)}>Delete permanently</button></div></article>)}</div> : null}
  </main>;
}
