import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../../lib/supabaseAdmin";

export const runtime = "nodejs";

function hashIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || request.headers.get("x-real-ip") || "unknown";
  const salt = process.env.IP_HASH_SALT || "configure-IP_HASH_SALT";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

function requestIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || request.headers.get("cf-connecting-ip")
    || null;
}

export async function GET() {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("guestbook_traces")
      .select("id, name, image_url, cloudinary_public_id, created_at, anonymous")
      .eq("active", true)
      .eq("moderation_status", "approved")
      .order("created_at", { ascending: false })
      .limit(60);
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Guestbook trace loading failed.", error);
    return NextResponse.json({ error: "Could not load traces." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as {
    name?: string;
    imageUrl?: string;
    publicId?: string;
    anonymous?: boolean;
    timezone?: string;
    screen?: string;
    language?: string;
    platform?: string;
    clientMetadata?: Record<string, unknown>;
  } | null;
  const name = body?.name?.trim().slice(0, 40);
  if (!name || !body?.imageUrl || !body.imageUrl.startsWith("https://res.cloudinary.com/")) {
    return NextResponse.json({ error: "Valid name and Cloudinary image are required." }, { status: 400 });
  }

  try {
    const { data, error } = await getSupabaseAdmin()
      .from("guestbook_traces")
      .insert({
        name,
        image_url: body.imageUrl,
        cloudinary_public_id: body.publicId ?? null,
        anonymous: body.anonymous !== false,
        active: true,
        moderation_status: "approved",
        ip_hash: hashIp(request),
        user_agent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
        referer: request.headers.get("referer")?.slice(0, 500) ?? null,
        language: body.language?.slice(0, 32) ?? null,
        timezone: body.timezone?.slice(0, 64) ?? null,
        screen: body.screen?.slice(0, 32) ?? null,
        platform: body.platform?.slice(0, 64) ?? null,
        ip_address: requestIp(request),
        browser_hints: {
          userAgent: request.headers.get("user-agent"),
          secChUa: request.headers.get("sec-ch-ua"),
          secChUaMobile: request.headers.get("sec-ch-ua-mobile"),
          secChUaPlatform: request.headers.get("sec-ch-ua-platform"),
          acceptLanguage: request.headers.get("accept-language")
        },
        client_metadata: body.clientMetadata ?? {}
      })
      .select("id, name, image_url, cloudinary_public_id, created_at, anonymous")
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Guestbook trace creation failed.", error);
    return NextResponse.json({ error: "Could not save trace.", hint: "Run the latest supabase/guestbook.sql migration before retrying." }, { status: 500 });
  }
}
