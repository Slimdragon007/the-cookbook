-- TASK-026 PR A: tweaks-panel persistence (ADR-006, Option B)
--
-- Per-user preferences row backing the runtime tweaks panel (Voice /
-- Imagery / Paper / Palette). user_id is the PK and a FK to auth.users so
-- deletion cascades cleanly. Column-level defaults guarantee any SELECT
-- returns the documented defaults even when the row is missing; callers
-- can also rely on a constants file in app code (see ADR-006 "Open
-- questions" for the lazy-insert vs. trigger discussion deferred to PR B).
--
-- RLS: per-user read/insert/update via auth.uid() = user_id, matching the
-- existing recipes/ingredients/food_log policy shape.

create table public.user_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  voice text not null default 'editorial',
  imagery text not null default 'photographic',
  paper text not null default 'smooth',
  palette text not null default 'paper',
  updated_at timestamptz not null default now()
);

alter table public.user_preferences enable row level security;

create policy "users read own prefs"
  on public.user_preferences for select
  to authenticated
  using (auth.uid() = user_id);

create policy "users upsert own prefs"
  on public.user_preferences for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "users update own prefs"
  on public.user_preferences for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

comment on table public.user_preferences is 'TASK-026 / ADR-006: per-user runtime preferences for the tweaks panel (voice / imagery / paper / palette). Cross-device sync via Supabase, RLS per-user.';
