import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function ContentEditor({ sectionId, sectionLabel, fields, onUpdate }) {
  const [values, setValues] = useState(
    Object.fromEntries(fields.map(f => [f.id, f.content]))
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleChange(id, value) {
    setValues(prev => ({ ...prev, [id]: value }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    const updates = fields.map(f =>
      supabase.from('site_content').update({ content: values[f.id] }).eq('id', f.id)
    );
    await Promise.all(updates);
    onUpdate(fields.map(f => ({ ...f, content: values[f.id] })));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <section>
      <h2 className="text-sm uppercase tracking-[0.2em] text-accent-orange font-light mb-6 flex items-center gap-3">
        <span className="w-8 h-px bg-accent-orange/30" />
        {sectionLabel}
      </h2>

      <div className="space-y-4">
        {fields.map(field => (
          <div key={field.id}>
            <label
              htmlFor={field.id}
              className="block text-xs text-text-muted mb-1.5 font-light"
            >
              {field.label}
            </label>
            {field.field_type === 'textarea' ? (
              <textarea
                id={field.id}
                value={values[field.id]}
                onChange={(e) => handleChange(field.id, e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-accent-orange/10 text-text-primary text-sm font-light focus:outline-none focus:border-accent-orange/40 transition-colors resize-y"
              />
            ) : (
              <input
                id={field.id}
                type={field.field_type === 'url' ? 'url' : 'text'}
                value={values[field.id]}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-accent-orange/10 text-text-primary text-sm font-light focus:outline-none focus:border-accent-orange/40 transition-colors"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-accent-orange text-bg-light text-sm font-medium uppercase tracking-wide hover:bg-accent-amber transition-colors disabled:opacity-50 cursor-pointer"
        >
          {saving ? 'Enregistrement...' : `Enregistrer`}
        </button>
        {saved && (
          <span className="text-sm text-green-400 font-light">Sauvegard&eacute;</span>
        )}
      </div>
    </section>
  );
}
