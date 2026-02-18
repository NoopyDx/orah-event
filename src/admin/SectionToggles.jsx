import { supabase } from '../lib/supabase';

export default function SectionToggles({ sections, onUpdate }) {
  async function handleToggle(sectionId, currentVisible) {
    const newVisible = !currentVisible;

    // Optimistic update
    onUpdate(sections.map(s =>
      s.id === sectionId ? { ...s, visible: newVisible } : s
    ));

    const { error } = await supabase
      .from('site_sections')
      .update({ visible: newVisible })
      .eq('id', sectionId);

    if (error) {
      // Revert on error
      onUpdate(sections.map(s =>
        s.id === sectionId ? { ...s, visible: currentVisible } : s
      ));
    }
  }

  return (
    <section>
      <h2 className="text-sm uppercase tracking-[0.2em] text-accent-orange font-light mb-6 flex items-center gap-3">
        <span className="w-8 h-px bg-accent-orange/30" />
        Sections visibles
      </h2>

      <div className="space-y-3">
        {sections.map(section => (
          <div
            key={section.id}
            className="flex items-center justify-between p-4 rounded-xl bg-bg-secondary/50 border border-accent-orange/8"
          >
            <span className="text-sm text-text-primary font-light">{section.label}</span>
            <button
              onClick={() => handleToggle(section.id, section.visible)}
              className={`relative w-12 h-7 rounded-full transition-colors cursor-pointer ${
                section.visible ? 'bg-accent-orange' : 'bg-bg-card'
              }`}
            >
              <span
                className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
                  section.visible ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
