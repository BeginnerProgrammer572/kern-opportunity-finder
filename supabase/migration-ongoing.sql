-- Run this in Supabase's SQL Editor to add ongoing-opportunity support
-- to your EXISTING opportunities table (don't re-run schema.sql, that
-- would try to create the table again).

alter table opportunities alter column deadline drop not null;

alter table opportunities
  add column is_ongoing boolean not null default false;

alter table opportunities
  add column end_date date;

alter table opportunities
  add constraint has_deadline_or_ongoing
  check (deadline is not null or is_ongoing = true);
