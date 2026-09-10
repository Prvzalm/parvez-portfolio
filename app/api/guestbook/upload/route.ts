import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { dataUrl?: string } | null;
  if (!body?.dataUrl || !body.dataUrl.startsWith("data:image/")) {
    return NextResponse.json({ error: "A valid drawing is required." }, { status: 400 });
  }
  if (body.dataUrl.length > 2_000_000) {
    return NextResponse.json({ error: "Drawing is too large." }, { status: 413 });
  }

  try {
    const result = await cloudinary.uploader.upload(body.dataUrl, {
      folder: "parvez-portfolio/guestbook",
      resource_type: "image",
      format: "webp"
    });
    return NextResponse.json({ url: result.secure_url, publicId: result.public_id });
  } catch (error) {
    console.error("Cloudinary guestbook upload failed.", error);
    return NextResponse.json({ error: "Drawing upload failed." }, { status: 502 });
  }
}
