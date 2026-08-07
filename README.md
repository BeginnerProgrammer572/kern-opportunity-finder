# Kern Opportunity Finder

AI-matched scholarships, internships, events, and clubs across Kern County.
Built for NextTech Kern 2026.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a free Supabase project at supabase.com, then in the SQL Editor,
   run everything in `supabase/schema.sql`.

3. Copy `.env.local.example` to `.env.local` and fill in your real keys
   (Supabase URL/anon key from your project settings, Gemini API key -
   free tier - from aistudio.google.com/apikey). `.env.local` is already
   in `.gitignore`,
   it will never get committed even though this repo is public.

4. Add a few rows to the `opportunities` table in Supabase (Table Editor)
   so there's something to match against while testing.

5. Run it locally:
   ```
   npm run dev
   ```
   Open http://localhost:3000

## Project structure

- `pages/index.js` - main page: search, results, save
- `pages/login.js` - magic-link sign in (no passwords to manage)
- `pages/saved.js` - a signed-in user's saved opportunities
- `pages/api/match.js` - matching endpoint (currently keyword-based,
  see the TODO inside for swapping in real Claude matching)
- `pages/api/cron/refresh.js` - placeholder for the weekly AI-driven
  opportunity gathering job, not built out yet
- `supabase/schema.sql` - database tables + row-level security rules
- `lib/rateLimit.js` - basic protection so the AI endpoints can't be spammed

## Deploying

Push this repo to GitHub, then import it in Vercel (vercel.com), it'll
auto-detect Next.js. Add the same environment variables from `.env.local`
in the Vercel project settings before deploying. The weekly cron job in
`vercel.json` will start running automatically once deployed.

## Team notes

- Database schema + AI matching/refresh logic: Bryan + Brandon
- Design (palette, mockups): Meng, see her sketches for the visual direction
  this should move toward, current styling is a placeholder
- Log progress in the shared project doc as you go
