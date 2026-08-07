// API route: takes a student's interests and returns matched opportunities.
// For the demo/first pass, this uses simple keyword matching (see
// lib/mockMatch.js). Swap in the real Gemini call when ready - see the
// commented block below for where that goes.

import { isRateLimited } from '../../lib/rateLimit';
import { matchOpportunities } from '../../lib/mockMatch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limit by IP so nobody can hammer this endpoint and run up API costs
  const identifier = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  if (isRateLimited(identifier, { maxRequests: 15, windowMs: 60_000 })) {
    return res.status(429).json({ error: 'Too many requests, try again in a minute.' });
  }

  const { interests } = req.body;
  if (!interests || typeof interests !== 'string') {
    return res.status(400).json({ error: 'Missing "interests" in request body.' });
  }

  // --- Current: simple keyword matching against opportunities in Supabase ---
  const results = await matchOpportunities(interests);

  // --- TODO: swap in real AI matching once ready ---
  // import { GoogleGenerativeAI } from '@google/generative-ai';
  // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  // const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
  // const result = await model.generateContent(
  //   `Given these opportunities: ${JSON.stringify(opportunities)},
  //    rank the ones that best match this student's interests: "${interests}".
  //    Return only a JSON array of opportunity IDs, best match first.`
  // );
  // Keep this call server-side only (like it already is here) - never call
  // Gemini directly from the browser, or your API key would be exposed.
  // Free tier is ~15 requests/min and a few hundred-1000/day depending on
  // model - our rate limiter above is tuned to stay under that ceiling.

  res.status(200).json({ results });
}
