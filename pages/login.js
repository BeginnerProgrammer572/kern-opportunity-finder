import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

// Simple magic-link login - no passwords to manage ourselves.
// The user types their email, Supabase sends a login link, they click it
// and come back signed in. This is the "account system" piece.

export default function Login() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
  }

  if (sent) {
    return (
      <div className="page">
        <p>Check your email, we sent you a link to sign in.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <form onSubmit={handleSubmit} className="finder">
        <label htmlFor="email">Sign in to save opportunities</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
        <button type="submit" className="find-btn">Send login link</button>
        {error && <p style={{ color: '#b4402a', marginTop: '8px' }}>{error}</p>}
      </form>
    </div>
  );
}
