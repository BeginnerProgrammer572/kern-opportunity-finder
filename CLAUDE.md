# Kern Opportunity Finder — Project Context

## What this is
An AI-matched web app for scholarships, internships, events, competitions, and
clubs across Kern County. Built for NextTech Kern 2026 (Student Track,
Workshop/Interactive Presentation). Abstract: "Kern Opportunity Finder."

## Team
- **Bryan Sobalvarro** — tech lead, full-stack, AI matching + refresh logic
- **Brandon Buendia** — database, AI, and data cleaning (paired with Bryan)
- **Meng Xu** — visual design (color palette, mockups), source list post-demo

## Stack (locked decisions — don't deviate without asking)
- Next.js + **plain JavaScript** (no TypeScript, team doesn't want to learn it)
- Supabase: Postgres database (plain SQL, no ORM/Prisma) + Auth (magic link,
  no passwords to manage) + row-level security
- Claude API for AI matching — **server-side only**, never called from the
  browser (repo will go public, key must never be exposed)
- Vercel for hosting + weekly Cron job (AI-driven opportunity refresh)
- Rate limiting on all AI-calling endpoints (public repo = cost risk)

## Core rules the product must follow
- Only use opportunity/contact data that sources made **voluntarily public**
  (school/nonprofit/org pages posted to promote their own events) — never
  scrape platforms whose terms prohibit it, never guess emails
- Weekly refresh: drop closed-registration opportunities, add new ones
- Save-for-later requires an account (Supabase Auth), not anonymous

## Bryan's learning goals for this project
- Get real, hands-on practice with Claude Code as an agentic dev tool, not
  just a chat assistant — following Skylar's advice: build with Claude first,
  then gradually understand and take over the "why" behind the code, then
  reintegrate Claude for productivity once the fundamentals are solid
- Learn how AI matching/search (Claude API + web search tool) actually gets
  wired into a real product, not just prompted in chat
- Practice structuring a real full-stack project (auth, database, API
  routes, deployment) end to end

## Team learning goals
- Brandon wants real exposure to the AI/matching logic, not just the
  database — he's paired with Bryan specifically so this happens
- Meng wants to understand how the AI works and how she could rebuild it
  herself, even though her primary contribution is design

## Timeline
- Now – early August: core build, demo done off Meng's notebook sketches
- Rest of August: real build phase, everyone has bandwidth
- September onward: Brandon/Meng shift to sports, Bryan starts Code Ninjas —
  polish only from here (add sources, professionalize), no new build work
- October 28: NextTech Kern conference / presentation

## When helping with this project
- Keep explanations aimed at a learner who's building real understanding,
  not just accepting generated code
- Flag anything that touches cost (AI calls), security (API keys, auth), or
  the sourcing/ethics rules above before implementing it
- Prefer plain SQL over ORM abstractions when touching the database
