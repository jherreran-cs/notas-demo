-- Pega todo esto en Supabase → SQL Editor → New query → Run

create table if not exists public.notas (
  id bigint generated always as identity primary key,
  texto text not null,
  created_at timestamptz not null default now()
);

-- Seguridad a nivel de fila (RLS): obligatoria en Supabase
alter table public.notas enable row level security;

-- Políticas ABIERTAS solo para esta demo (cualquiera puede leer, crear y borrar).
-- En un proyecto real se restringen por usuario autenticado.
create policy "leer notas"   on public.notas for select using (true);
create policy "crear notas"  on public.notas for insert with check (true);
create policy "borrar notas" on public.notas for delete using (true);

-- Una nota de ejemplo
insert into public.notas (texto) values ('¡Hola desde Supabase! 🎉');
