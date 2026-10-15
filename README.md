# Notas Demo — Next.js + Supabase + Vercel

App mínima de notas: escribes una nota, se guarda en Supabase (base de datos Postgres) y la web está publicada en Vercel.

```
Navegador ──► Vercel (Next.js, la web) ──► Supabase (base de datos)
```

**Qué necesitas (todo gratis):**
- Cuenta en [GitHub](https://github.com)
- Cuenta en [Supabase](https://supabase.com) (puedes entrar con GitHub)
- Cuenta en [Vercel](https://vercel.com) (puedes entrar con GitHub)
- [Node.js](https://nodejs.org) 20 o superior y [Git](https://git-scm.com) instalados en tu computadora (solo para probar en local)

---

## Paso 1 — Crear el proyecto en Supabase

1. Entra a <https://supabase.com/dashboard> → **New project**.
2. Ponle nombre (`notas-demo`), crea una contraseña para la base de datos (guárdala) y elige la región más cercana (para Ecuador: **East US** o **São Paulo**).
3. Espera 1–2 minutos a que termine de crearse.

## Paso 2 — Crear la tabla

1. En el menú izquierdo: **SQL Editor** → **New query**.
2. Copia y pega todo el contenido de `supabase/schema.sql`.
3. Pulsa **Run**. Debe decir *Success*.
4. Comprueba en **Table Editor** que existe la tabla `notas` con una fila de ejemplo.

## Paso 3 — Copiar las llaves de Supabase

1. Ve a **Project Settings → API** (o al botón **Connect** arriba).
2. Copia dos valores:
   - **Project URL** → algo como `https://abcd1234.supabase.co`
   - **anon public key** (en proyectos nuevos puede llamarse **publishable key**, empieza con `sb_publishable_…`). Cualquiera de las dos sirve.
3. ⚠️ **Nunca** uses la `service_role` / `secret key` en este proyecto: esa llave salta toda la seguridad.

## Paso 4 — Probar en tu computadora (opcional pero recomendado)

```bash
cd notas-demo
npm install
cp .env.example .env.local      # en Windows: copy .env.example .env.local
```

Abre `.env.local` y pega tus valores:

```
NEXT_PUBLIC_SUPABASE_URL=https://abcd1234.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-llave
```

```bash
npm run dev
```

Abre <http://localhost:3000>. Agrega una nota y verifica que aparece también en el **Table Editor** de Supabase.

## Paso 5 — Subir el código a GitHub

1. En GitHub: **New repository** → nombre `notas-demo` → **Create** (sin README).
2. En la carpeta del proyecto:

```bash
git init
git add .
git commit -m "Primer commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/notas-demo.git
git push -u origin main
```

> El archivo `.env.local` **no** se sube (está en `.gitignore`). Así tus llaves no quedan públicas.

## Paso 6 — Publicar en Vercel

1. Entra a <https://vercel.com/new>.
2. **Import Git Repository** → elige `notas-demo` (si no aparece, da permiso a Vercel sobre tu GitHub).
3. Vercel detecta **Next.js** solo. No cambies nada del build.
4. Abre **Environment Variables** y agrega las dos:

   | Name | Value |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | tu Project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | tu anon / publishable key |

5. Pulsa **Deploy**. En ~1 minuto te da una URL tipo `https://notas-demo-xxxx.vercel.app`. ¡Listo!

## Paso 7 — Actualizar la app

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Describe el cambio"
git push
```

Vercel vuelve a publicar automáticamente.

---

## Problemas comunes

| Síntoma | Causa / solución |
|---|---|
| La web dice "Faltan las variables…" | No agregaste las variables en Vercel, o las agregaste después del deploy. Agrégalas y en **Deployments → ⋯ → Redeploy**. |
| `relation "public.notas" does not exist` | No corriste el SQL del paso 2. |
| `new row violates row-level security policy` | Faltan las políticas del SQL. Vuelve a correr `schema.sql`. |
| `Invalid API key` | Copiaste mal la llave o pegaste la de otro proyecto. |
| El proyecto de Supabase "se pausó" | En el plan gratis se pausa tras ~1 semana sin uso. Entra al dashboard y pulsa **Restore**. |

## Siguiente nivel (cuando quieras)

- **Login de usuarios** con Supabase Auth, y que cada usuario vea solo sus notas (cambiando las políticas RLS a `auth.uid() = user_id`).
- **Dominio propio** en Vercel → Project → Settings → Domains.
- **Integración Vercel ↔ Supabase** desde el Marketplace de Vercel, que sincroniza las variables automáticamente.

## Estructura del proyecto

```
notas-demo/
├── app/
│   ├── layout.js       # plantilla HTML
│   ├── page.js         # la página de notas (leer, crear, borrar)
│   └── globals.css     # estilos
├── lib/supabase.js     # conexión a Supabase
├── supabase/schema.sql # tabla + seguridad (correr en Supabase)
├── .env.example        # plantilla de variables
└── package.json
```
