-- RENT درايف v6.7.20
-- إضافة عمود images (مصفوفة URLs) لجدولي cars و agencies
-- نفّذ من Supabase SQL Editor بعد migration_v6_7_19

-- ── cars ────────────────────────────────────────────────────────────────────
alter table public.cars
  add column if not exists images text[] not null default '{}';

-- ── agencies ────────────────────────────────────────────────────────────────
alter table public.agencies
  add column if not exists images text[] not null default '{}';

-- ── messages: media_url + media_type (مطلوبان لـ ChatView) ──────────────────
alter table public.messages
  add column if not exists media_url text;
alter table public.messages
  add column if not exists media_type text check (media_type in ('image','audio','file'));

-- ── فهارس مساعدة ────────────────────────────────────────────────────────────
create index if not exists cars_type_status_idx on public.cars (type, status);
create index if not exists agencies_wilaya_status_idx on public.agencies (wilaya, status);
create index if not exists messages_user_direction_idx on public.messages (user_id, direction, status);
