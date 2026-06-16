alter table public.purple_evolution_registrations
  add column if not exists registration_number integer;

with numbered_registrations as (
  select
    id,
    100 + row_number() over (order by created_at asc, id asc) as assigned_number
  from public.purple_evolution_registrations
  where status != 'rejected'
)
update public.purple_evolution_registrations registration
set
  registration_number = numbered_registrations.assigned_number,
  is_first_500 = numbered_registrations.assigned_number <= 500
from numbered_registrations
where registration.id = numbered_registrations.id
  and registration.registration_number is null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'purple_evolution_registrations_registration_number_key'
  ) then
    alter table public.purple_evolution_registrations
      add constraint purple_evolution_registrations_registration_number_key
      unique (registration_number);
  end if;
end $$;

-- New API submissions always receive registration_number = 100 + validCount + 1.
-- Positions 1-100 are reserved internally; public premium eligibility is 101-500.
