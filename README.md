# Omni

Landing page for Omni — the card that lets you earn rewards on tuition. Pay your school through Omni, we handle the ACH, you get cash back. No caps, no gimmicks.

## Run it

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Environment

Create a `.env` file and provide your Supabase credentials:

```bash
cp env.example .env
```

Update the values with your Supabase project's `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` so waitlist signups are stored correctly.

## Stack

Next.js, React, TypeScript, Tailwind. The hero has a 3D card that reacts to your mouse.

## Deploy

Works on Vercel (or any Next.js host). Connect the repo and you're good to go.
