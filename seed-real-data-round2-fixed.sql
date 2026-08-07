-- Round 2 (corrected re-run): Events and Clubs that were never actually
-- inserted the first time. Theatre is already formatted as ongoing here,
-- so no separate update step is needed afterward.

insert into opportunities (title, description, category, tags, source_url, deadline, is_ongoing, end_date)
values
(
  'Kern County Library Volunteering',
  'Ongoing volunteer opportunities across Kern County Library branches. Roles vary by age: Special Events (11+), Shelf Organizers (13+), Tech Coach (14+), Homework Helper and Summer Reading (15+), Welcome Ambassador (18+).',
  'Event',
  'library reading education literacy books tutoring',
  'https://kerncountylibrary.org/volunteering/',
  null,
  true,
  null
),
(
  'Kern Medical Junior Volunteer Program (ages 15-17)',
  'Summer-only volunteer program for high school students ages 15-17 (must be full-time 9th-12th grade student). Requires interview, application, and health screening. Applications open mid-April through mid-May each year.',
  'Event',
  'healthcare hospital medical patient-care',
  'https://www.kernmedicalfoundation.com/volunteer/',
  '2027-05-15', -- PLACEHOLDER, based on "mid-May" application window pattern
  false,
  null
),
(
  'Kern Medical College/Adult Volunteer Program (18+)',
  'Ongoing volunteer program for college students and adults age 18+. Rolling application, requires interview, health screening, background check, and a 12-month weekly commitment. Open to both currently-enrolled college students and adults.',
  'Event',
  'healthcare hospital medical patient-care',
  'https://www.kernmedicalfoundation.com/volunteer/',
  null,
  true,
  null
),
(
  'KHSD Honors Theatre',
  'A countywide honors theatre program bringing together top theater students from across Kern High School District campuses for a joint production, similar in structure to honors band or choir. Selection appears to happen through your own school''s theater teacher rather than a direct open application.',
  'Club',
  'theatre drama acting arts performance',
  'https://www.bakersfield.com/entertainment/arts-theater/khsd-highlights-teen-talent-with-honors-theatre/article_da505e20-56ad-4da7-a715-dc236c6fa273.html',
  null,
  true,
  null
);
