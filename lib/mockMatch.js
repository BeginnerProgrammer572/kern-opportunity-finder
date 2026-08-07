// Placeholder matching logic for the demo, keyword overlap against whatever
// is in the "opportunities" table. Replace/upgrade with the real Gemini
// call in pages/api/match.js once the team is ready.

import { supabase } from './supabaseClient';

// Common filler words that shouldn't count as "interests" - without this,
// short words like "I" match as a substring inside unrelated tags like
// "business" or "agriculture" (since both contain the letter "i").
const STOPWORDS = new Set([
  'i', 'a', 'an', 'the', 'and', 'or', 'but', 'to', 'of', 'in', 'on', 'at',
  'is', 'it', 'my', 'me', 'im', 'like', 'into', 'with', 'for', 'about',
  'right', 'now', 'working', 'currently', 'doing', 'interested', 'also',
  'really', 'very', 'am', 'be', 'been',
]);

function tokenize(str) {
  return (str.toLowerCase().match(/[a-z]+/g) || []);
}

export async function matchOpportunities(interestsInput) {
  const today = new Date().toISOString().slice(0, 10);

  const { data: opportunities, error } = await supabase
    .from('opportunities')
    .select('*')
    // Still relevant if: it has a deadline that hasn't passed yet, OR it's
    // ongoing with no end date, OR it's ongoing but its end date hasn't
    // passed yet.
    .or(`and(is_ongoing.eq.false,deadline.gte.${today}),and(is_ongoing.eq.true,end_date.is.null),and(is_ongoing.eq.true,end_date.gte.${today})`)
    .order('deadline', { ascending: true, nullsFirst: false });

  if (error) throw error;
  if (!opportunities) return [];

  const words = tokenize(interestsInput).filter(w => w.length >= 3 && !STOPWORDS.has(w));
  if (!words.length) return opportunities;

  return opportunities
    .map(o => {
      const tagWords = new Set(tokenize(o.tags));
      const score = words.reduce((s, w) => s + (tagWords.has(w) ? 1 : 0), 0);
      return { ...o, score };
    })
    .filter(o => o.score > 0)
    .sort((a, b) => b.score - a.score);
}
