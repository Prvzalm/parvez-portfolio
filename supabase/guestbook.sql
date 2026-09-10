create table if not exists public.guestbook_traces (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 40),
  image_url text not null,
  cloudinary_public_id text,
  anonymous boolean not null default true,
  active boolean not null default true,
  moderation_status text not null default 'approved' check (moderation_status in ('approved', 'pending', 'rejected')),
  ip_hash text,
  user_agent text,
  referer text,
  language text,
  timezone text,
  screen text,
  platform text,
  ip_address inet,
  browser_hints jsonb not null default '{}'::jsonb,
  client_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.guestbook_traces add column if not exists image_url text;
alter table public.guestbook_traces add column if not exists cloudinary_public_id text;
alter table public.guestbook_traces add column if not exists drawing text;
alter table public.guestbook_traces add column if not exists active boolean not null default true;
alter table public.guestbook_traces add column if not exists moderation_status text not null default 'approved';
alter table public.guestbook_traces add column if not exists ip_hash text;
alter table public.guestbook_traces add column if not exists user_agent text;
alter table public.guestbook_traces add column if not exists referer text;
alter table public.guestbook_traces add column if not exists language text;
alter table public.guestbook_traces add column if not exists timezone text;
alter table public.guestbook_traces add column if not exists screen text;
alter table public.guestbook_traces add column if not exists platform text;
alter table public.guestbook_traces add column if not exists ip_address inet;
alter table public.guestbook_traces add column if not exists browser_hints jsonb not null default '{}'::jsonb;
alter table public.guestbook_traces add column if not exists client_metadata jsonb not null default '{}'::jsonb;
update public.guestbook_traces
set image_url = drawing
where image_url is null and drawing is not null;
alter table public.guestbook_traces drop constraint if exists guestbook_traces_drawing_check;
alter table public.guestbook_traces alter column image_url set not null;
alter table public.guestbook_traces alter column drawing drop not null;

alter table public.guestbook_traces enable row level security;

drop policy if exists "Anyone can read guestbook traces" on public.guestbook_traces;
create policy "Anyone can read guestbook traces"
  on public.guestbook_traces for select
  to anon, authenticated
  using (true);

drop policy if exists "Anyone can add guestbook traces" on public.guestbook_traces;
create policy "Anyone can add guestbook traces"
  on public.guestbook_traces for insert
  to anon, authenticated
  with check (
    char_length(name) between 1 and 40
    and char_length(image_url) between 1 and 2000
  );

create index if not exists guestbook_traces_created_at_idx
  on public.guestbook_traces (created_at desc);

create index if not exists guestbook_traces_active_idx
  on public.guestbook_traces (active, moderation_status, created_at desc);

revoke all on table public.guestbook_traces from anon, authenticated;
