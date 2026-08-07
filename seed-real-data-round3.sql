-- Round 3: KHSD Honors Theatre reformatted as ongoing (no fixed application
-- deadline found - selection appears to be via nomination through a
-- student's own school theater teacher, not a direct open application),
-- plus the second Club: Latina Leaders of Kern County Youth Leadership
-- Program.
--
-- Run this in Supabase's SQL Editor.

-- First, update the KHSD Honors Theatre row already inserted in round 2:
update opportunities
set is_ongoing = true,
    deadline = null,
    description = 'A countywide honors theatre program bringing together top theater students from across Kern High School District campuses for a joint production, similar in structure to honors band or choir. Selection appears to happen through your own school''s theater teacher rather than a direct open application.'
where title = 'KHSD Honors Theatre';

-- Then add the second club:
insert into opportunities (title, description, category, tags, source_url, deadline, is_ongoing, end_date)
values
(
  'Latina Leaders of Kern County - Youth Leadership Program',
  'A leadership development program for Latina sophomores and juniors across Kern County, covering teamwork, college admissions, goal setting, and community engagement through a series of workshops, with a full-commitment attendance requirement.',
  'Club',
  'leadership community civic government college-prep',
  'https://kernlatinas.org/youthleadership/',
  null, -- no specific deadline found, recruitment window opens periodically
  true,
  null
);
