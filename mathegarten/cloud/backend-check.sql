-- Run after setup.sql. All fixtures and progress are rolled back.
begin;
insert into auth.users(id,aud,role,email) values
 ('a5f8041b-45e0-4630-a811-f9f02f07b2b1','authenticated','authenticated','mathegarten-check-a@example.invalid'),
 ('a5f8041b-45e0-4630-a811-f9f02f07b2b2','authenticated','authenticated','mathegarten-check-b@example.invalid');
select set_config('request.jwt.claims','{"sub":"a5f8041b-45e0-4630-a811-f9f02f07b2b1","role":"authenticated"}',true);
set local role authenticated;
do $$ declare a jsonb; b jsonb; c jsonb; begin
 a:=public.mathegarten_save(0,'d0757c77-1eac-48ec-8c46-338e39cdc691','{"version":1,"points":10,"records":{},"days":{},"session":null}');
 if a->>'applied'<>'true' or a->>'revision'<>'1' then raise exception 'First save failed'; end if;
 b:=public.mathegarten_save(0,'d0757c77-1eac-48ec-8c46-338e39cdc691','{"version":1,"points":10,"records":{},"days":{},"session":null}');
 if b->>'revision'<>'1' then raise exception 'Duplicate operation repeated'; end if;
 c:=public.mathegarten_save(0,'d0757c77-1eac-48ec-8c46-338e39cdc692','{"version":1,"points":20,"records":{},"days":{},"session":null}');
 if c->>'applied'<>'false' then raise exception 'Conflict not detected'; end if;
 if (select count(*) from public.mathegarten_progress)<>1 then raise exception 'Own record unreadable'; end if;
 if has_table_privilege('authenticated','public.mathegarten_progress','UPDATE') then raise exception 'Direct update unexpectedly allowed'; end if;
end $$;
reset role;
select set_config('request.jwt.claims','{"sub":"a5f8041b-45e0-4630-a811-f9f02f07b2b2","role":"authenticated"}',true);
set local role authenticated;
do $$ begin
 if exists(select 1 from public.mathegarten_progress) then raise exception 'Foreign progress visible'; end if;
end $$;
reset role;
do $$ begin
 if has_table_privilege('anon','public.mathegarten_progress','SELECT') then raise exception 'Anonymous read allowed'; end if;
 if has_function_privilege('anon','public.mathegarten_save(bigint,uuid,jsonb)','EXECUTE') then raise exception 'Anonymous write allowed'; end if;
end $$;
rollback;
select 'PASS: private rows, idempotency and version conflict; no test data retained' as result;

