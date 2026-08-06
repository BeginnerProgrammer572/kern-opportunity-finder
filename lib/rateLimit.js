// Very simple in-memory rate limiter to protect our AI API budget.
// Good enough for a demo/hackathon scale. NOTE: this resets whenever the
// server restarts and doesn't share state across multiple server instances -
// if this app gets real traffic later, swap this for a proper solution like
// Upstash Redis (they have a free tier that works great with Vercel).

const requestLog = new Map();

export function isRateLimited(identifier, { maxRequests = 10, windowMs = 60_000 } = {}) {
  const now = Date.now();
  const timestamps = (requestLog.get(identifier) || []).filter(t => now - t < windowMs);

  if (timestamps.length >= maxRequests) {
    return true;
  }

  timestamps.push(now);
  requestLog.set(identifier, timestamps);
  return false;
}
