# Memento

Digital memory booklet: host onboarding, guest invites, and themed UI (Atelier / Conference). Event data is kept in browser context for local demos.

## Environment variables

Copy `.env.example` to `.env.local` and fill in values. See **Deploy on Vercel** for production.

| Variable | Required for | Notes |
|----------|----------------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase client + server | From Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase client | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | API routes (guests, invites) | **Server only** — never expose to the browser |
| `NEXT_PUBLIC_APP_URL` | Invite links in email | **Recommended** for custom domains. On Vercel, `/api/send-invites` falls back to `VERCEL_URL` if unset. |
| `OPENAI_API_KEY` | `/api/analyze-poster` | Optional — without it, analysis returns demo data |
| `RESEND_API_KEY` | `/api/send-invites` | Optional — without it, guests are created but email is skipped |
| `RESEND_FROM` | Resend | Verified domain/sender in Resend |

If `OPENAI_API_KEY` is unset, `/api/analyze-poster` returns demo placeholder data so the flow still works.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

1. Push this repo to GitHub and [import the project](https://vercel.com/new) in Vercel (framework: Next.js is auto-detected).
2. Under **Settings → Environment Variables**, add every key from `.env.example` for **Production** (and **Preview** if you want PR previews to hit real backends).
3. Set **`NEXT_PUBLIC_APP_URL`** to your Vercel URL after the first deploy (e.g. `https://<project>.vercel.app`), or your custom domain. Invite emails use this for links.
4. Redeploy after changing env vars so serverless functions pick them up.
5. In **Supabase** → Authentication (or API settings), add your Vercel URL to allowed redirect origins if you use auth callbacks later.

`npm run build` is the production build; Node **20.9+** is declared in `package.json` `engines` for Vercel.

See also: [Next.js on Vercel](https://nextjs.org/docs/app/building-your-application/deploying).
