// Placeholder matching logic for the demo, keyword overlap against whatever
// is in the "opportunities" table. Replace/upgrade with the real Claude
// call in pages/api/match.js once the team is ready.

import { supabase } from './supabaseClient';

export async function matchOpportunities(interestsInput) {
  const { data: opportunities, error } = await supabase
    .from('opportunities')
    .select('*')
    .gte('deadline', new Date().toISOString().slice(0, 10)) // only still-open ones
    .order('deadline', { ascending: true });

  if (error) throw error;
  if (!opportunities) return [];

  const words = interestsInput.toLowerCase().split(/[\s,]+/).filter(Boolean);
  if (!words.length) return opportunities;

  return opportunities
    .map(o => ({
      ...o,
      score: words.reduce((s, w) => s + (o.tags.includes(w) ? 1 : 0), 0),
    }))
    .filter(o => o.score > 0)
    .sort((a, b) => b.score - a.score);
}
