import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import ContentEditor from './ContentEditor';
import SectionToggles from './SectionToggles';

export default function AdminDashboard() {
  const [contentRows, setContentRows] = useState([]);
  const [sectionRows, setSectionRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAll() {
      const [contentRes, sectionsRes] = await Promise.all([
        supabase.from('site_content').select('*').order('sort_order'),
        supabase.from('site_sections').select('*').order('sort_order'),
      ]);
      if (contentRes.data) setContentRows(contentRes.data);
      if (sectionsRes.data) setSectionRows(sectionsRes.data);
      setLoading(false);
    }
    fetchAll();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/admin/login');
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <p className="text-text-muted font-light">Chargement...</p>
      </div>
    );
  }

  // Group content by section
  const grouped = {};
  for (const row of contentRows) {
    if (!grouped[row.section]) grouped[row.section] = [];
    grouped[row.section].push(row);
  }

  // Order sections
  const sectionOrder = sectionRows.map(s => s.id);

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-bg-primary/95 backdrop-blur-md border-b border-accent-orange/10">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-xl font-bold text-text-primary">ORAH</h1>
            <span className="text-xs uppercase tracking-wider text-text-muted font-light">Admin</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-text-muted hover:text-accent-orange transition-colors font-light cursor-pointer"
          >
            D&eacute;connexion
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-10 space-y-12">
        {/* Section Toggles */}
        <SectionToggles sections={sectionRows} onUpdate={setSectionRows} />

        {/* Content Editor per section */}
        {sectionOrder.map(sectionId => {
          const sectionMeta = sectionRows.find(s => s.id === sectionId);
          const fields = grouped[sectionId] || [];
          if (fields.length === 0) return null;

          return (
            <ContentEditor
              key={sectionId}
              sectionId={sectionId}
              sectionLabel={sectionMeta?.label || sectionId}
              fields={fields}
              onUpdate={(updatedFields) => {
                setContentRows(prev =>
                  prev.map(row => {
                    const updated = updatedFields.find(f => f.id === row.id);
                    return updated || row;
                  })
                );
              }}
            />
          );
        })}
      </main>
    </div>
  );
}
