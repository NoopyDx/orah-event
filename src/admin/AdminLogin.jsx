import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + '/admin',
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-text-primary mb-2">ORAH</h1>
          <p className="text-sm text-text-muted font-light tracking-wider">Administration</p>
        </div>

        {sent ? (
          <div className="text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-accent-orange/10 flex items-center justify-center mx-auto">
              <svg className="w-7 h-7 text-accent-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <p className="text-text-primary font-light">
              Un lien de connexion a été envoyé à
            </p>
            <p className="text-accent-orange font-medium">{email}</p>
            <p className="text-sm text-text-muted font-light">
              Vérifie ta boîte mail et clique sur le lien pour accéder au panel admin.
            </p>
            <button
              onClick={() => { setSent(false); setEmail(''); }}
              className="text-sm text-text-muted hover:text-accent-orange transition-colors font-light cursor-pointer mt-4"
            >
              Utiliser une autre adresse
            </button>
          </div>
        ) : (
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

            {error && (
              <p className="text-sm text-red-400 font-light">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-xl bg-accent-orange text-bg-light text-sm font-medium uppercase tracking-wide hover:bg-accent-amber transition-colors disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Envoi...' : 'Recevoir un lien de connexion'}
            </button>
          </form>
        )}

        <p className="text-center mt-8 text-xs text-text-muted/50 font-light">
          &copy; 2025 ORAH &mdash; Administration
        </p>
      </div>
    </div>
  );
}
