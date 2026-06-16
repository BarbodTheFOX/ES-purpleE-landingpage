# Purple Evolution Landing Page

Mobile-first Persian RTL landing page for the Eventum Space Purple Evolution campaign.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP
- ScrollTrigger
- @gsap/react
- React Hook Form
- Zod
- Supabase
- Vercel-ready environment variables

## Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_BITUNIX_REFERRAL_URL=
```

`SUPABASE_SERVICE_ROLE_KEY` is used only in `app/api/register/route.ts` and must never be exposed to the browser.

## Supabase Setup

For a new database, run the SQL in `supabase/purple_evolution_registrations.sql` from the Supabase SQL editor.

For an existing database created before `registration_number`, run:

```txt
supabase/20260615_add_registration_number.sql
```

The table name is:

```txt
purple_evolution_registrations
```

Registration numbering is handled server-side.

## GSAP Setup

GSAP is isolated in client components through `lib/gsap/client.ts`.

- `ScrollTrigger` and `useGSAP` are registered only when `window` exists.
- Sections use scoped `useGSAP` calls for cleanup.
- The implementation checks `prefers-reduced-motion` and skips scroll animation for users who request reduced motion.
- Animated properties are limited to transform, opacity, and lightweight shadow/glow effects.

## Fonts

The app is configured to prefer Peyda for Persian UI and Poppins for Latin accents, then fall back to system sans-serif fonts.

No local Peyda/Poppins font files are currently present in the project. When brand font files are available, add them to the project and replace the TODO comments in `app/globals.css` with real font loading.

## Local Run

```bash
npm install
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Production Build

```bash
npm run build
npm run start
```

## QA Checklist

- Page renders in Persian and RTL on mobile widths.
- Header UID CTA scrolls to the form.
- Bitunix CTA opens `NEXT_PUBLIC_BITUNIX_REFERRAL_URL`.
- Required fields show Persian validation errors.
- Invalid phone and email values show Persian validation errors.
- Empty select fields show Persian validation errors.
- Form cannot submit until both required checkboxes are checked.
- Duplicate `bitunix_uid` returns a Persian duplicate error.
- Successful registrations return a server-generated `registration_number`.
- Registrations with `registration_number <= 500` return `is_first_500: true`.
- Registrations with `registration_number > 500` return `is_first_500: false`.
- Supabase service role key is present only in Vercel server environment variables.
