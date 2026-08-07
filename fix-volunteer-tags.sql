-- Adds "volunteer" as an explicit tag to entries that are genuinely
-- volunteer opportunities, so searching "volunteering" or "volunteer"
-- actually matches them on merit, not by coincidental word overlap.

update opportunities
set tags = tags || ' volunteer volunteering'
where title in (
  'Kern County Library Volunteering',
  'Kern Medical Junior Volunteer Program (ages 15-17)',
  'Kern Medical College/Adult Volunteer Program (18+)'
);
