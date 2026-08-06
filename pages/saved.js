import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Saved() {
  const [user, setUser] = useState(null);
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (!user) { setLoading(false); return; }

      const { data } = await supabase
        .from('saved_opportunities')
        .select('opportunity_id, opportunities (*)')
        .eq('user_id', user.id);

      setSaved(data?.map(row => row.opportunities) || []);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="page"><p>Loading...</p></div>;
  if (!user) return <div className="page"><p>Sign in to see your saved opportunities. <a href="/login">Sign in</a></p></div>;

  return (
    <div className="page">
      <header>
        <h1>Your saved opportunities</h1>
      </header>
      <div className="board">
        {saved.length === 0 && <p>Nothing saved yet, go find something on the homepage.</p>}
        {saved.map(o => (
          <div className="card" key={o.id}>
            <span className={`card-cat cat-${o.category}`}>{o.category}</span>
            <h3>{o.title}</h3>
            <p>{o.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
