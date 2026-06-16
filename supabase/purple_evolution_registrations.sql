create table if not exists public.purple_evolution_registrations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  telegram_id text,
  instagram_id text,
  email text,
  bitunix_uid text not null unique,
  registration_number integer not null unique,
  registered_with_referral boolean not null,
  trading_level text not null,
  main_challenge text not null,
  consent boolean not null,
  is_first_500 boolean not null default false,
  status text not null default 'pending',
  created_at timestamp default now(),
  constraint purple_evolution_status_check
    check (status in ('pending', 'approved', 'rejected')),
  constraint purple_evolution_trading_level_check
    check (trading_level in ('مبتدی', 'متوسط', 'حرفه‌ای')),
  constraint purple_evolution_main_challenge_check
    check (
      main_challenge in (
        'کنترل هیجان',
        'ضررهای پشت‌سرهم',
        'نداشتن روتین',
        'عجله در ورود',
        'ترس از جا ماندن',
        'مدیریت سرمایه',
        'گزینه دیگر'
      )
    )
);

create index if not exists purple_evolution_registrations_status_idx
  on public.purple_evolution_registrations (status);

create index if not exists purple_evolution_registrations_created_at_idx
  on public.purple_evolution_registrations (created_at);

alter table public.purple_evolution_registrations enable row level security;

-- The landing page writes through the Next.js API route with SUPABASE_SERVICE_ROLE_KEY.
-- Do not create public insert/select policies unless you intentionally expose client access.
