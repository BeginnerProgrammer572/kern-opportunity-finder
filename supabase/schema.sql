-- Run this in the Supabase SQL editor (Dashboard > SQL Editor > New query)
-- Supabase Auth already manages its own "auth.users" table automatically.
-- These are the two tables our app needs on top of that.

-- All known opportunities (scholarships, internships, events, competitions, clubs)
create table opportunities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category text not null check (category in ('Scholarship', 'Internship', 'Event', 'Competition', 'Club')),
  tags text not null, -- space-separated keywords used for matching
  source_url text,    -- where this was found (must be a publicly posted page)
  deadline date not null,
  created_at timestamp with time zone default now()
);

-- Which opportunities a logged-in user has saved
create table saved_opportunities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  opportunity_id uuid references opportunities(id) on delete cascade not null,
  saved_at timestamp with time zone default now(),
  unique (user_id, opportunity_id) -- can't save the same one twice
);

-- Row-level security: users can only see/manage their OWN saved opportunities.
-- Opportunities themselves are public (anyone can read them, only the
-- server/cron job can write them, never the browser).
alter table opportunities enable row level security;
alter table saved_opportunities enable row level security;

create policy "Anyone can view opportunities"
  on opportunities for select
  using (true);

create policy "Users can view their own saved opportunities"
  on saved_opportunities for select
  using (auth.uid() = user_id);

create policy "Users can save their own opportunities"
  on saved_opportunities for insert
  with check (auth.uid() = user_id);

create policy "Users can remove their own saved opportunities"
  on saved_opportunities for delete
  using (auth.uid() = user_id);
