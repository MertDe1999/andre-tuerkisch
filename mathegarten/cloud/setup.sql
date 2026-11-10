-- Private, per-account snapshots. Apply once in the selected Supabase project.
create table if not exists public.mathegarten_progress (
 user_id uuid primary key references auth.users(id) on delete cascade,
 revision bigint not null default 0,
 state jsonb not null default '{"version":1,"points":0,"records":{},"days":{},"session":null}'::jsonb,
 operation_ids uuid[] not null default '{}',
 updated_at timestamptz not null default now()
);
alter table public.mathegarten_progress enable row level security;
revoke all on public.mathegarten_progress from anon, authenticated;
grant select on public.mathegarten_progress to authenticated;
drop policy if exists mathegarten_read_own on public.mathegarten_progress;
create policy mathegarten_read_own on public.mathegarten_progress for select to authenticated using ((select auth.uid())=user_id);

create or replace function public.mathegarten_save(expected_revision bigint, operation_id uuid, payload jsonb)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare row_data public.mathegarten_progress; uid uuid := auth.uid();
begin
 if uid is null then raise exception 'Authentication required' using errcode='28000'; end if;
 if operation_id is null or expected_revision < 0 or payload is null or octet_length(payload::text)>500000
    or payload->>'version' is distinct from '1' or jsonb_typeof(payload->'records') is distinct from 'object'
    or jsonb_typeof(payload->'days') is distinct from 'object' then raise exception 'Invalid progress'; end if;
 insert into public.mathegarten_progress(user_id) values(uid) on conflict do nothing;
 select * into row_data from public.mathegarten_progress where user_id=uid for update;
 if operation_id=any(row_data.operation_ids) then
  return jsonb_build_object('applied',true,'revision',row_data.revision,'state',row_data.state);
 end if;
 if row_data.revision<>expected_revision then
  return jsonb_build_object('applied',false,'revision',row_data.revision,'state',row_data.state);
 end if;
 update public.mathegarten_progress set state=payload,revision=revision+1,updated_at=now(),
  operation_ids=array_append(row_data.operation_ids,operation_id)
 where user_id=uid returning * into row_data;
 return jsonb_build_object('applied',true,'revision',row_data.revision,'state',row_data.state);
end $$;
revoke all on function public.mathegarten_save(bigint,uuid,jsonb) from public,anon;
grant execute on function public.mathegarten_save(bigint,uuid,jsonb) to authenticated;
