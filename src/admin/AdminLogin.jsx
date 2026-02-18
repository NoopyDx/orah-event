import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/admin');
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-text-primary mb-2">ORAH</h1>
          <p className="text-sm text-text-muted font-light tracking-wider">Administration</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs uppercase tracking-wider text-text-muted mb-2 font-light">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-accent-orange/10 text-text-primary text-sm font-light focus:outline-none focus:border-accent-orange/40 transition-colors"
              placeholder="admin@orah.be"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs uppercase tracking-wider text-text-muted mb-2 font-light">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-accent-orange/10 text-text-primary text-sm font-light focus:outline-none focus:border-accent-orange/40 transition-colors"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 font-light">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 rounded-xl bg-accent-orange text-bg-light text-sm font-medium uppercase tracking-wide hover:bg-accent-amber transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="text-center mt-8 text-xs text-text-muted/50 font-light">
          &copy; 2025 ORAH &mdash; Administration
        </p>
      </div>
    </div>
  );
}
