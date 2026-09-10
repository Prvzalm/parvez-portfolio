import { v2 as cloudinary } from "cloudinary";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !serviceRoleKey) throw new Error("Supabase environment variables are required.");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const headers = { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}` };
const rowsResponse = await fetch(`${supabaseUrl}/rest/v1/guestbook_traces?select=id,image_url,drawing,cloudinary_public_id&image_url=like.data%3A*&limit=1000`, { headers });
if (!rowsResponse.ok) throw new Error(`Could not load legacy traces: ${await rowsResponse.text()}`);
const rows = await rowsResponse.json();

for (const row of rows) {
  if (!row.image_url?.startsWith("data:image/")) continue;
  const uploaded = await cloudinary.uploader.upload(row.image_url, {
    folder: "parvez-portfolio/guestbook",
    resource_type: "image",
    format: "webp"
  });
  const updateResponse = await fetch(`${supabaseUrl}/rest/v1/guestbook_traces?id=eq.${row.id}`, {
    method: "PATCH",
    headers: { ...headers, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ image_url: uploaded.secure_url, cloudinary_public_id: uploaded.public_id })
  });
  if (!updateResponse.ok) throw new Error(`Could not update trace ${row.id}: ${await updateResponse.text()}`);
  console.log(`Migrated ${row.id}`);
}

console.log(`Migration finished. Processed ${rows.length} legacy rows.`);
