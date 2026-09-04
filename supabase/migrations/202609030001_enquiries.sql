begin;

create table public.enquiries (
  id uuid primary key,
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  email text not null,
  space text not null check (space in ('Hot Desk', 'Studio Setup', 'Meetings & Events', 'Studio Tour')),
  preferred_date date not null,
  preferred_time time not null,
  headcount integer not null check (headcount between 1 and 10000),
  notes text not null default '',
  status text not null default 'New' check (status in ('New','Contacted','Confirmed','Completed','Cancelled')),
  internal_notes text not null default '',
  updated_at timestamptz not null default now(),
  constraint input_lengths check (length(name) between 1 and 120 and length(phone) between 7 and 30 and length(email) between 3 and 254 and length(notes) <= 3000)
);

create table public.enquiry_rate_limits (
  key text primary key,
  window_start timestamptz not null,
  attempts integer not null
);

-- Transactional outbox: saving a booking also saves the notification job.
-- Delivery is enabled separately after an email provider is configured.
create table public.enquiry_notifications (
  enquiry_id uuid primary key references public.enquiries(id) on delete cascade,
  created_at timestamptz not null default now(),
  sent_at timestamptz,
  attempts integer not null default 0,
  next_attempt_at timestamptz not null default now()
);

alter table public.enquiries enable row level security;
alter table public.enquiry_rate_limits enable row level security;
alter table public.enquiry_notifications enable row level security;
revoke all on public.enquiries, public.enquiry_rate_limits, public.enquiry_notifications from anon, authenticated;
grant all on public.enquiries, public.enquiry_rate_limits, public.enquiry_notifications to service_role;

create function public.enquiry_updated_at() returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end;
$$;
create trigger enquiry_updated before update on public.enquiries for each row execute function public.enquiry_updated_at();

create function public.submit_enquiry(p_booking jsonb, p_ip_hash text, p_email_hash text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  existing public.enquiries;
  rate_key text;
  attempt_count integer;
  booking_id uuid := (p_booking->>'id')::uuid;
begin
  -- Serialize retries of the same submission; no duplicate records or alerts.
  perform pg_advisory_xact_lock(hashtextextended(booking_id::text, 0));
  select * into existing from public.enquiries where id = booking_id;
  if found then
    if existing.name = p_booking->>'name' and existing.phone = p_booking->>'phone'
      and existing.email = p_booking->>'email' and existing.space = p_booking->>'space'
      and existing.preferred_date = (p_booking->>'date')::date
      and existing.preferred_time = (p_booking->>'time')::time
      and existing.headcount = (p_booking->>'headcount')::integer and existing.notes = p_booking->>'notes' then
      return jsonb_build_object('id', booking_id);
    end if;
    return jsonb_build_object('error', 'conflict');
  end if;
  -- Hashed IP and email limits are durable across serverless instances.
  foreach rate_key in array array['ip:' || p_ip_hash, 'email:' || p_email_hash] loop
    insert into public.enquiry_rate_limits(key, window_start, attempts) values (rate_key, now(), 1)
    on conflict(key) do update set
      attempts = case when public.enquiry_rate_limits.window_start < now() - interval '1 hour' then 1 else public.enquiry_rate_limits.attempts + 1 end,
      window_start = case when public.enquiry_rate_limits.window_start < now() - interval '1 hour' then now() else public.enquiry_rate_limits.window_start end
    returning attempts into attempt_count;
    if attempt_count > 5 then return jsonb_build_object('error', 'rate_limit'); end if;
  end loop;
  insert into public.enquiries(id,name,phone,email,space,preferred_date,preferred_time,headcount,notes)
  values (booking_id,p_booking->>'name',p_booking->>'phone',p_booking->>'email',p_booking->>'space',
    (p_booking->>'date')::date,(p_booking->>'time')::time,(p_booking->>'headcount')::integer,p_booking->>'notes');
  insert into public.enquiry_notifications(enquiry_id) values (booking_id);
  delete from public.enquiry_rate_limits where window_start < now() - interval '2 days';
  return jsonb_build_object('id', booking_id);
end;
$$;
revoke all on function public.submit_enquiry(jsonb,text,text) from public, anon, authenticated;
grant execute on function public.submit_enquiry(jsonb,text,text) to service_role;
commit;
