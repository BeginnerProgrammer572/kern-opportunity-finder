import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const CATS = ['All', 'Scholarship', 'Internship', 'Event', 'Competition', 'Club'];

const QUICK_TAGS = [
  { label: 'robotics + coding', value: 'robotics coding' },
  { label: 'business', value: 'business' },
  { label: 'art + design', value: 'art design' },
  { label: 'medical', value: 'healthcare medical' },
  { label: 'volunteering', value: 'community service volunteering' },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 13 9 18 20 6" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 16 14" />
    </svg>
  );
}
function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 11a8 8 0 1 0-2.6 6" />
      <polyline points="20 4 20 11 13 11" />
    </svg>
  );
}

const CAT_COLORS = {
  All: 'var(--ink)',
  Scholarship: 'var(--plum)',
  Internship: 'var(--gold-deep)',
  Event: 'var(--teal)',
  Competition: 'var(--slate)',
  Club: 'var(--umber)',
};

export default function Home() {
  const [interests, setInterests] = useState('');
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeCat, setActiveCat] = useState('All');
  const [activeQuickTag, setActiveQuickTag] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [savedIds, setSavedIds] = useState(new Set());

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleFind(overrideInterests) {
    const query = (overrideInterests !== undefined ? overrideInterests : interests).trim();
    setError('');
    if (!query) {
      setError("Type what you're into, or tap a quick tag, before searching.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interests: query }),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || 'Something went wrong.');
      }
      const { results } = await res.json();
      setResults(results);
      setHasSearched(true);
      setActiveCat('All');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleQuickTag(tag) {
    setInterests(tag.label);
    setActiveQuickTag(tag.label);
    handleFind(tag.value);
  }

  async function toggleSave(opportunityId) {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    if (savedIds.has(opportunityId)) {
      await supabase.from('saved_opportunities').delete()
        .eq('user_id', user.id).eq('opportunity_id', opportunityId);
      setSavedIds(prev => { const next = new Set(prev); next.delete(opportunityId); return next; });
    } else {
      await supabase.from('saved_opportunities').insert({ user_id: user.id, opportunity_id: opportunityId });
      setSavedIds(prev => new Set(prev).add(opportunityId));
    }
  }

  function daysUntil(dateStr) {
    return Math.ceil((new Date(dateStr) - new Date()) / 86400000);
  }

  const filtered = results.filter(o => activeCat === 'All' || o.category === activeCat);

  // Count how many results fall in each category, for the filter chip badges
  const categoryCounts = CATS.reduce((acc, c) => {
    acc[c] = c === 'All' ? results.length : results.filter(o => o.category === c).length;
    return acc;
  }, {});

  return (
    <div className="page">
      <header>
        <div className="eyebrow">Kern County, CA</div>
        <h1>Find what's actually open to you.</h1>
        <p className="sub">
          Scholarships, internships, events, and clubs across Kern County, matched to your
          interests, with anything past its registration deadline automatically taken off the board.
        </p>
        <p className="auth-status">
          {user ? `Signed in as ${user.email}` : <a href="/login">Sign in to save opportunities</a>}
        </p>
      </header>

      <div className="finder">
        <label htmlFor="interests">What are you into, or working on right now?</label>
        <textarea
          id="interests"
          value={interests}
          onChange={(e) => { setInterests(e.target.value); setActiveQuickTag(null); }}
          placeholder="e.g. robotics, coding, business, community service, art..."
        />
        <div className="quick-tags">
          {QUICK_TAGS.map(tag => {
            const isSelected = tag.label === activeQuickTag;
            return (
              <button
                key={tag.label}
                type="button"
                className={`quick-tag ${isSelected ? 'selected' : ''}`}
                aria-pressed={isSelected}
                onClick={() => handleQuickTag(tag)}
                disabled={loading}
              >
                {isSelected && <span className="quick-tag-check" aria-hidden="true"><CheckIcon /></span>}
                {tag.label}
              </button>
            );
          })}
        </div>
        <button className="find-btn" onClick={() => handleFind()} disabled={loading || !interests.trim()}>
          {loading && <span className="spinner" aria-hidden="true" />}
          {loading ? 'Searching...' : 'Find Opportunities'}
        </button>
        {error && <p className="error-text">{error}</p>}
      </div>

      {hasSearched && !loading && (
        <div className="filters">
          {CATS.map(c => (
            <button
              key={c}
              className={`filter-chip ${c === activeCat ? 'active' : ''}`}
              style={{ '--chip-color': CAT_COLORS[c] }}
              aria-pressed={c === activeCat}
              onClick={() => setActiveCat(c)}
            >
              <span className="filter-chip-dot" aria-hidden="true" />
              {c} <span className="chip-count">({categoryCounts[c]})</span>
            </button>
          ))}
        </div>
      )}

      {hasSearched && !loading && filtered.length === 0 && (
        <div className="empty-state">
          <p className="empty-title">Nothing here for now!</p>
          <p className="empty-sub">Try a different word, or check back, the board refreshes weekly.</p>
        </div>
      )}

      <div className="board">
        {filtered.map(o => {
          const isSaved = savedIds.has(o.id);
          return (
            <div className="card" key={o.id}>
              <span className={`card-cat cat-${o.category}`}>{o.category}</span>
              <h3>{o.title}</h3>
              <p>{o.description}</p>
              {o.is_ongoing ? (
                <div className="card-deadline ongoing">
                  <span className="deadline-icon" aria-hidden="true"><RefreshIcon /></span>
                  Ongoing enrollment{o.end_date ? ` — runs through ${o.end_date}` : ''}
                </div>
              ) : (
                (() => {
                  const days = daysUntil(o.deadline);
                  return (
                    <div className={`card-deadline ${days <= 7 ? 'soon' : ''}`}>
                      <span className="deadline-icon" aria-hidden="true"><ClockIcon /></span>
                      {days} day{days === 1 ? '' : 's'} left to register
                    </div>
                  );
                })()
              )}
              <button className="save-btn" onClick={() => toggleSave(o.id)}>
                {isSaved ? 'Saved' : 'Save for later'}
              </button>
            </div>
          );
        })}
      </div>

      <footer>
        <span>Kern Opportunity Finder</span>
        <span>Contact: <a href="tel:6618891737">661-889-1737</a> · <a href="mailto:1bryansobalvarro@gmail.com">1bryansobalvarro@gmail.com</a></span>
      </footer>
    </div>
  );
}
