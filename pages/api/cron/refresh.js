// Scheduled job (see vercel.json) that's meant to run weekly.
// This is where the AI-driven opportunity gathering happens: search a set
// of approved public sources, structure the results, and update the
// database - removing anything whose deadline has passed.
//
// NOT built out yet - this is a placeholder so the team has the right shape
// to fill in once the core app is working. Talk through the parameters
// (which sites/orgs count as sources) together before wiring this up for
// real, per the abstract's "voluntarily public sources only" rule.

export default async function handler(req, res) {
  // Vercel Cron sends a secret header - check it so randoms can't trigger
  // this endpoint and burn through API calls.
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // --- TODO ---
  // 1. Call Claude with web search, scoped to our approved source list
  //    (school sites, nonprofits, community orgs - see abstract for the
  //    exact sourcing rule we committed to).
  // 2. Have it return structured opportunities: title, description,
  //    category, tags, deadline, source_url.
  // 3. Upsert those into the "opportunities" table in Supabase.
  // 4. Delete/flag any existing rows whose deadline has already passed.

  res.status(200).json({ status: 'not yet implemented' });
}
