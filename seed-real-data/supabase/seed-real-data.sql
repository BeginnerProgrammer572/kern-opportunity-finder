-- Run this in Supabase's SQL Editor to add the 5 real Kern County
-- opportunities we've researched so far.
--
-- IMPORTANT: deadlines marked "PLACEHOLDER" are estimates based on last
-- cycle's pattern - the real orgs haven't published next cycle's exact
-- dates yet. Update these once confirmed, before this goes live for real
-- students.

insert into opportunities (title, description, category, tags, source_url, deadline, is_ongoing, end_date)
values
(
  'Kern Robotics High School League (VEX V5RC)',
  'A VEX V5 Robotics league for Kern County high schoolers, held across four Bakersfield campuses from October 2026 through January 2027, open to any registered VEX team.',
  'Competition',
  'robotics coding stem engineering vex',
  'https://events.vex.com/fr/RE-V5RC-26-4214.html',
  '2026-10-12',
  false,
  null
),
(
  'Kern County Oil Contractors Association Scholarship',
  'Scholarship for Kern County students pursuing higher education, especially those with ties to the oil, gas, construction, agriculture, energy, utility, business, law, or sports management industries.',
  'Scholarship',
  'oil gas construction business law energy utility sports management',
  'https://www.kcoca.org/scholarship/',
  '2027-05-15', -- PLACEHOLDER, based on last cycle's May 15 deadline
  false,
  null
),
(
  'Kern Agricultural Foundation Scholarships',
  'Scholarships for Kern County students pursuing agricultural education, sponsored by the Kern Agricultural Foundation and awarded at their annual Scholarship Banquet.',
  'Scholarship',
  'agriculture farming ag education',
  'http://www.kernagfoundation.com/scholarships.htm',
  '2027-03-01', -- PLACEHOLDER, exact date varies per fund, not yet published
  false,
  null
),
(
  'Boys & Girls Clubs of Kern County Summer Jobs Program',
  'Paid summer internship and workforce-readiness training for Kern County teens ages 15-18, including career development classes in financial literacy and professional etiquette.',
  'Internship',
  'workforce jobs career soft-skills business',
  'https://www.bgckc.org/summerjobsprogram',
  '2027-02-13', -- PLACEHOLDER, based on last cycle's Feb 13 registration close
  false,
  null
),
(
  'Bakersfield Youth Jobs Program - City Hall Summer Internship',
  'An 8-week paid internship for Kern County high schoolers working part-time with City of Bakersfield departments, with a related public works apprenticeship track for older youth.',
  'Internship',
  'government public-service parks-recreation public-works',
  'https://www.kernfoundation.org/bakersfield-youth-jobs-program/',
  '2027-05-01', -- PLACEHOLDER, current cycle already closed
  false,
  null
);
