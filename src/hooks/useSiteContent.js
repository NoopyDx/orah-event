import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { fallbackContent } from '../data/fallbackContent';

export function useSiteContent() {
  const [content, setContent] = useState(fallbackContent);
  const [sections, setSections] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        const [contentRes, sectionsRes] = await Promise.all([
          supabase.from('site_content').select('id, content'),
          supabase.from('site_sections').select('id, visible'),
        ]);

        if (contentRes.data) {
          const map = {};
          contentRes.data.forEach(row => { map[row.id] = row.content; });
          setContent(prev => ({ ...prev, ...map }));
        }

        if (sectionsRes.data) {
          const map = {};
          sectionsRes.data.forEach(row => { map[row.id] = row.visible; });
          setSections(map);
        }
      } catch (err) {
        console.warn('Supabase fetch failed, using fallback content', err);
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
  }, []);

  return { content, sections, loading };
}
