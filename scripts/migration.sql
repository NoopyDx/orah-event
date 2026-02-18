-- ORAH — Migration Supabase
-- Tables, triggers, RLS, et seed

-- TABLE : site_content
CREATE TABLE IF NOT EXISTS site_content (
  id TEXT PRIMARY KEY,
  section TEXT NOT NULL,
  label TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  field_type TEXT NOT NULL DEFAULT 'text',
  sort_order INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE : site_sections
CREATE TABLE IF NOT EXISTS site_sections (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  visible BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- FUNCTION : auto-update updated_at
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_content_updated ON site_content;
CREATE TRIGGER trg_content_updated
  BEFORE UPDATE ON site_content
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

DROP TRIGGER IF EXISTS trg_sections_updated ON site_sections;
CREATE TRIGGER trg_sections_updated
  BEFORE UPDATE ON site_sections
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- RLS
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_sections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read content" ON site_content;
CREATE POLICY "Public read content" ON site_content FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read sections" ON site_sections;
CREATE POLICY "Public read sections" ON site_sections FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin update content" ON site_content;
CREATE POLICY "Admin update content" ON site_content FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin update sections" ON site_sections;
CREATE POLICY "Admin update sections" ON site_sections FOR UPDATE USING (auth.role() = 'authenticated');

-- SEED : site_content
INSERT INTO site_content (id, section, label, content, field_type, sort_order) VALUES
('hero_subtitle',     'hero',   'Sous-titre',              'Festival · House Music · Open Air', 'text', 1),
('hero_location',     'hero',   'Lieu',                    'Visé, Belgique — Bord de Meuse', 'text', 2),
('hero_cta1_label',   'hero',   'Bouton Tickets 1 — texte','Tickets Festival',            'text', 3),
('hero_cta1_url',     'hero',   'Bouton Tickets 1 — lien', 'https://shop.paylogic.com/f7c0844286554c8d90c8ad2bafd7b342/orah-festival', 'url', 4),
('hero_cta2_label',   'hero',   'Bouton Tickets 2 — texte','Guillemins × Marten Lou',     'text', 5),
('hero_cta2_url',     'hero',   'Bouton Tickets 2 — lien', 'https://shop.paylogic.com/bc1614f767eb4617878824f9247101a2', 'url', 6),
('about_overline',    'about',  'Sur-titre',               'Première édition — Été 2025', 'text', 1),
('about_text',        'about',  'Texte principal',         'ORAH, c''est la lumière. Née de la passion de trois amis, cette première édition invite à vivre la house music autrement : en plein air, face à la Meuse, dans une atmosphère où raffinement et convivialité se rencontrent. 16 DJs internationaux, 4 soirées, un lieu unique — bienvenue dans la lumière.', 'textarea', 2),
('about_stat1_value', 'about',  'Stat 1 — chiffre',       '4',   'text', 3),
('about_stat1_label', 'about',  'Stat 1 — label',         'Soirées', 'text', 4),
('about_stat2_value', 'about',  'Stat 2 — chiffre',       '16',  'text', 5),
('about_stat2_label', 'about',  'Stat 2 — label',         'DJs', 'text', 6),
('about_stat3_value', 'about',  'Stat 3 — chiffre',       '9',   'text', 7),
('about_stat3_label', 'about',  'Stat 3 — label',         'Pays','text', 8),
('about_stat4_value', 'about',  'Stat 4 — chiffre',       '700', 'text', 9),
('about_stat4_label', 'about',  'Stat 4 — label',         'Festivaliers/jour', 'text', 10),
('lineup_overline',   'lineup', 'Sur-titre',               '16 artistes · 9 pays', 'text', 1),
('lineup_subtitle',   'lineup', 'Sous-titre',              'Programmation complète à venir', 'text', 2),
('lineup_day1_date',  'lineup', 'Jour 1 — date',          'Mercredi 25 juin', 'text', 3),
('lineup_day1_label', 'lineup', 'Jour 1 — label',         'Opening Night', 'text', 4),
('lineup_day1_artists','lineup','Jour 1 — artistes (séparés par ·)', 'Muxika · Luna & Lenthe · TBA · TBA', 'text', 5),
('lineup_day2_date',  'lineup', 'Jour 2 — date',          'Jeudi 26 juin', 'text', 6),
('lineup_day2_label', 'lineup', 'Jour 2 — label',         '', 'text', 7),
('lineup_day2_artists','lineup','Jour 2 — artistes (séparés par ·)', 'Nosi · Sebastian Heredia · TBA · TBA', 'text', 8),
('lineup_day3_date',  'lineup', 'Jour 3 — date',          'Vendredi 27 juin', 'text', 9),
('lineup_day3_label', 'lineup', 'Jour 3 — label',         '', 'text', 10),
('lineup_day3_artists','lineup','Jour 3 — artistes (séparés par ·)', 'Marten Lou · TBA · TBA · TBA', 'text', 11),
('lineup_day4_date',  'lineup', 'Jour 4 — date',          'Samedi 28 juin', 'text', 12),
('lineup_day4_label', 'lineup', 'Jour 4 — label',         'Closing', 'text', 13),
('lineup_day4_artists','lineup','Jour 4 — artistes (séparés par ·)', 'TBA · TBA · TBA · TBA', 'text', 14),
('infos_lieu_title',  'infos',  'Titre — Lieu',       'Lieu',        'text', 0),
('infos_dates_title', 'infos',  'Titre — Dates',      'Dates',       'text', 1),
('infos_billetterie_title','infos','Titre — Billetterie','Billetterie','text', 2),
('infos_acces_title', 'infos',  'Titre — Accès',      'Accès',       'text', 3),
('infos_experience_title','infos','Titre — Expérience','Expérience',  'text', 4),
('infos_age_title',   'infos',  'Titre — +18',        '+18',         'text', 5),
('infos_lieu',        'infos',  'Lieu',         'Quai des Fermettes, Visé\nEn bord de Meuse — 20 min de Liège, 15 min de Maastricht', 'textarea', 10),
('infos_dates',       'infos',  'Dates',        '25 → 28 juin 2025\n4 soirées, 4 DJs par soirée', 'textarea', 11),
('infos_billetterie', 'infos',  'Billetterie',  'Tickets disponibles sur Paylogic\nBilletterie progressive — Early birds disponibles', 'textarea', 12),
('infos_acces',       'infos',  'Accès',        'Parking gratuit\nÀ proximité de la gare de Visé\nBracelets cashless sur place', 'textarea', 13),
('infos_experience',  'infos',  'Expérience',   'Chapiteau vitré de 1 400 m²\nTerrasse surélevée en bord de Meuse\nEspace VIP · Bars design', 'textarea', 14),
('infos_age',         'infos',  '+18',          'Événement réservé aux adultes\nPièce d''identité obligatoire', 'textarea', 15),
('footer_email',      'footer', 'Email',        'Orah.event@gmail.com', 'text', 1),
('footer_copyright',  'footer', 'Copyright',    '© 2025 ORAH — Visé, Belgique. Tous droits réservés.', 'text', 2)
ON CONFLICT (id) DO NOTHING;

-- SEED : site_sections
INSERT INTO site_sections (id, label, visible, sort_order) VALUES
('hero',   'Hero',            true, 1),
('about',  'Le Festival',     true, 2),
('lineup', 'Lineup',          true, 3),
('infos',  'Infos Pratiques', true, 4),
('footer', 'Footer',          true, 5)
ON CONFLICT (id) DO NOTHING;
