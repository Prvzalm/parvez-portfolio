import { createClient } from "@supabase/supabase-js";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

function authorized(request: Request) {
  const expected = process.env.ADMIN_PANEL_PASSWORD;
  return Boolean(expected && request.headers.get("x-admin-password") === expected);
}

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase admin configuration is missing.");
  return createClient(url, key, { auth: { persistSession: false } });
}

function configureCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}

export async function GET(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { data, error } = await adminClient()
      .from("guestbook_traces")
      .select("id, name, image_url, cloudinary_public_id, created_at, active, moderation_status, ip_hash, user_agent, referer, language, timezone, screen, platform, anonymous")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Admin trace loading failed.", error);
    return NextResponse.json({ error: "Could not load traces." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null) as { id?: string; publicId?: string } | null;
  if (!body?.id) return NextResponse.json({ error: "Trace id is required." }, { status: 400 });
  try {
    if (body.publicId) {
      configureCloudinary();
      await cloudinary.uploader.destroy(body.publicId, { resource_type: "image" });
    }
    const { error } = await adminClient().from("guestbook_traces").delete().eq("id", body.id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Admin trace deletion failed.", error);
    return NextResponse.json({ error: "Could not delete trace." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null) as { id?: string; active?: boolean; moderationStatus?: string } | null;
  if (!body?.id || typeof body.active !== "boolean") return NextResponse.json({ error: "Trace id and active state are required." }, { status: 400 });
  try {
    const { error } = await adminClient()
      .from("guestbook_traces")
      .update({ active: body.active, moderation_status: body.moderationStatus ?? (body.active ? "approved" : "rejected") })
      .eq("id", body.id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Admin trace moderation update failed.", error);
    return NextResponse.json({ error: "Could not update trace." }, { status: 500 });
  }
}
