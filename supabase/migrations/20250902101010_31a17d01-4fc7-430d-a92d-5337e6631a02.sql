-- Update ensure_admin_for_current_user to recognize additional admin email
create or replace function public.ensure_admin_for_current_user()
returns void
language plpgsql
security definer
set search_path to 'public', 'auth'
as $$
declare
  uid uuid := auth.uid();
  uemail text;
begin
  if uid is null then
    return;
  end if;

  select email into uemail from auth.users where id = uid;

  if uemail in ('piyushojha@gmail.com', 'piyushojha50@gmail.com') then
    insert into public.user_roles (user_id, role)
    values (uid, 'admin')
    on conflict (user_id, role) do nothing;
  end if;
end;
$$;