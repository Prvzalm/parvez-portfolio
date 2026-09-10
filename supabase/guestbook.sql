create table if not exists public.guestbook_traces (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 40),
  drawing text not null,
  anonymous boolean not null default true,
  created_at timestamptz not null default now()
);

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
    and char_length(drawing) between 1 and 2000000
  );

create index if not exists guestbook_traces_created_at_idx
  on public.guestbook_traces (created_at desc);
