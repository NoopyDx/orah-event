// Script de migration Supabase — exécuter une seule fois
// Usage: node scripts/setup-db.mjs

const SUPABASE_URL = "https://tptyfdlwlbuxnwqdcefx.supabase.co";
const SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwdHlmZGx3bGJ1eG53cWRjZWZ4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTQ0NDExOCwiZXhwIjoyMDg3MDIwMTE4fQ.ONEp3BPJlla-JGeli3tUpRN3Ekng8gTzAoDTMlNyvts";

async function runSQL(sql) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/`, {
    method: "POST",
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  });
  return res;
}

// Use the Supabase client instead for data operations
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function createTables() {
  console.log("Attempting to create tables via SQL Editor API...");

  const sql = `
    CREATE TABLE IF NOT EXISTS site_content (
      id TEXT PRIMARY KEY,
      section TEXT NOT NULL,
      label TEXT NOT NULL,
      content TEXT NOT NULL DEFAULT '',
      field_type TEXT NOT NULL DEFAULT 'text',
      sort_order INT NOT NULL DEFAULT 0,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS site_sections (
      id TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      visible BOOLEAN NOT NULL DEFAULT true,
      sort_order INT NOT NULL DEFAULT 0,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

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
  `;

  // Try the pg/query endpoint (available in newer Supabase)
  const res = await fetch(`${SUPABASE_URL}/pg/query`, {
    method: "POST",
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  });

  if (res.ok) {
    console.log("Tables created successfully via pg/query!");
    return true;
  }

  console.log(`pg/query status: ${res.status} — ${await res.text()}`);
  console.log("Falling back: trying individual SQL statements...");

  // Fallback: execute SQL statements individually
  const statements = sql.split(";").map(s => s.trim()).filter(s => s.length > 5);
  for (const stmt of statements) {
    const r = await fetch(`${SUPABASE_URL}/pg/query`, {
      method: "POST",
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: stmt }),
    });
    if (!r.ok) {
      console.log(`Statement failed (${r.status}): ${stmt.slice(0, 60)}...`);
    }
  }
  return false;
}

async function seedContent() {
  console.log("\nSeeding site_content...");

  const rows = [
    // HERO
    { id: "hero_subtitle", section: "hero", label: "Sous-titre", content: "Festival · House Music · Open Air", field_type: "text", sort_order: 1 },
    { id: "hero_location", section: "hero", label: "Lieu", content: "Visé, Belgique — Bord de Meuse", field_type: "text", sort_order: 2 },
    { id: "hero_cta1_label", section: "hero", label: "Bouton Tickets 1 — texte", content: "Tickets Festival", field_type: "text", sort_order: 3 },
    { id: "hero_cta1_url", section: "hero", label: "Bouton Tickets 1 — lien", content: "https://shop.paylogic.com/f7c0844286554c8d90c8ad2bafd7b342/orah-festival", field_type: "url", sort_order: 4 },
    { id: "hero_cta2_label", section: "hero", label: "Bouton Tickets 2 — texte", content: "Guillemins × Marten Lou", field_type: "text", sort_order: 5 },
    { id: "hero_cta2_url", section: "hero", label: "Bouton Tickets 2 — lien", content: "https://shop.paylogic.com/bc1614f767eb4617878824f9247101a2", field_type: "url", sort_order: 6 },

    // ABOUT
    { id: "about_overline", section: "about", label: "Sur-titre", content: "Première édition — Été 2025", field_type: "text", sort_order: 1 },
    { id: "about_text", section: "about", label: "Texte principal", content: "ORAH, c'est la lumière. Née de la passion de trois amis, cette première édition invite à vivre la house music autrement : en plein air, face à la Meuse, dans une atmosphère où raffinement et convivialité se rencontrent. 16 DJs internationaux, 4 soirées, un lieu unique — bienvenue dans la lumière.", field_type: "textarea", sort_order: 2 },
    { id: "about_stat1_value", section: "about", label: "Stat 1 — chiffre", content: "4", field_type: "text", sort_order: 3 },
    { id: "about_stat1_label", section: "about", label: "Stat 1 — label", content: "Soirées", field_type: "text", sort_order: 4 },
    { id: "about_stat2_value", section: "about", label: "Stat 2 — chiffre", content: "16", field_type: "text", sort_order: 5 },
    { id: "about_stat2_label", section: "about", label: "Stat 2 — label", content: "DJs", field_type: "text", sort_order: 6 },
    { id: "about_stat3_value", section: "about", label: "Stat 3 — chiffre", content: "9", field_type: "text", sort_order: 7 },
    { id: "about_stat3_label", section: "about", label: "Stat 3 — label", content: "Pays", field_type: "text", sort_order: 8 },
    { id: "about_stat4_value", section: "about", label: "Stat 4 — chiffre", content: "700", field_type: "text", sort_order: 9 },
    { id: "about_stat4_label", section: "about", label: "Stat 4 — label", content: "Festivaliers/jour", field_type: "text", sort_order: 10 },

    // LINEUP
    { id: "lineup_overline", section: "lineup", label: "Sur-titre", content: "16 artistes · 9 pays", field_type: "text", sort_order: 1 },
    { id: "lineup_subtitle", section: "lineup", label: "Sous-titre", content: "Programmation complète à venir", field_type: "text", sort_order: 2 },
    { id: "lineup_day1_date", section: "lineup", label: "Jour 1 — date", content: "Mercredi 25 juin", field_type: "text", sort_order: 3 },
    { id: "lineup_day1_label", section: "lineup", label: "Jour 1 — label", content: "Opening Night", field_type: "text", sort_order: 4 },
    { id: "lineup_day1_artists", section: "lineup", label: "Jour 1 — artistes (séparés par ·)", content: "Muxika · Luna & Lenthe · TBA · TBA", field_type: "text", sort_order: 5 },
    { id: "lineup_day2_date", section: "lineup", label: "Jour 2 — date", content: "Jeudi 26 juin", field_type: "text", sort_order: 6 },
    { id: "lineup_day2_label", section: "lineup", label: "Jour 2 — label", content: "", field_type: "text", sort_order: 7 },
    { id: "lineup_day2_artists", section: "lineup", label: "Jour 2 — artistes (séparés par ·)", content: "Nosi · Sebastian Heredia · TBA · TBA", field_type: "text", sort_order: 8 },
    { id: "lineup_day3_date", section: "lineup", label: "Jour 3 — date", content: "Vendredi 27 juin", field_type: "text", sort_order: 9 },
    { id: "lineup_day3_label", section: "lineup", label: "Jour 3 — label", content: "", field_type: "text", sort_order: 10 },
    { id: "lineup_day3_artists", section: "lineup", label: "Jour 3 — artistes (séparés par ·)", content: "Marten Lou · TBA · TBA · TBA", field_type: "text", sort_order: 11 },
    { id: "lineup_day4_date", section: "lineup", label: "Jour 4 — date", content: "Samedi 28 juin", field_type: "text", sort_order: 12 },
    { id: "lineup_day4_label", section: "lineup", label: "Jour 4 — label", content: "Closing", field_type: "text", sort_order: 13 },
    { id: "lineup_day4_artists", section: "lineup", label: "Jour 4 — artistes (séparés par ·)", content: "TBA · TBA · TBA · TBA", field_type: "text", sort_order: 14 },

    // INFOS
    { id: "infos_lieu", section: "infos", label: "Lieu", content: "Quai des Fermettes, Visé\nEn bord de Meuse — 20 min de Liège, 15 min de Maastricht", field_type: "textarea", sort_order: 1 },
    { id: "infos_dates", section: "infos", label: "Dates", content: "25 → 28 juin 2025\n4 soirées, 4 DJs par soirée", field_type: "textarea", sort_order: 2 },
    { id: "infos_billetterie", section: "infos", label: "Billetterie", content: "Tickets disponibles sur Paylogic\nBilletterie progressive — Early birds disponibles", field_type: "textarea", sort_order: 3 },
    { id: "infos_acces", section: "infos", label: "Accès", content: "Parking gratuit\nÀ proximité de la gare de Visé\nBracelets cashless sur place", field_type: "textarea", sort_order: 4 },
    { id: "infos_experience", section: "infos", label: "Expérience", content: "Chapiteau vitré de 1 400 m²\nTerrasse surélevée en bord de Meuse\nEspace VIP · Bars design", field_type: "textarea", sort_order: 5 },
    { id: "infos_age", section: "infos", label: "+18", content: "Événement réservé aux adultes\nPièce d'identité obligatoire", field_type: "textarea", sort_order: 6 },

    // FOOTER
    { id: "footer_email", section: "footer", label: "Email", content: "Orah.event@gmail.com", field_type: "text", sort_order: 1 },
    { id: "footer_copyright", section: "footer", label: "Copyright", content: "© 2025 ORAH — Visé, Belgique. Tous droits réservés.", field_type: "text", sort_order: 2 },
  ];

  const { data, error } = await supabase.from("site_content").upsert(rows);
  if (error) {
    console.error("Error seeding site_content:", error.message);
    return false;
  }
  console.log(`Seeded ${rows.length} rows in site_content`);

  console.log("\nSeeding site_sections...");
  const sections = [
    { id: "hero", label: "Hero", visible: true, sort_order: 1 },
    { id: "about", label: "Le Festival", visible: true, sort_order: 2 },
    { id: "lineup", label: "Lineup", visible: true, sort_order: 3 },
    { id: "infos", label: "Infos Pratiques", visible: true, sort_order: 4 },
    { id: "footer", label: "Footer", visible: true, sort_order: 5 },
  ];

  const { error: secError } = await supabase.from("site_sections").upsert(sections);
  if (secError) {
    console.error("Error seeding site_sections:", secError.message);
    return false;
  }
  console.log(`Seeded ${sections.length} rows in site_sections`);
  return true;
}

async function inviteAdmins() {
  console.log("\nInviting admin users...");
  const emails = ["hello@meetmarco.fr", "pierre@klutche.fr"];

  for (const email of emails) {
    const { data, error } = await supabase.auth.admin.inviteUserByEmail(email);
    if (error) {
      if (error.message.includes("already")) {
        console.log(`  ${email} — already exists, skipping`);
      } else {
        console.error(`  ${email} — error: ${error.message}`);
      }
    } else {
      console.log(`  ${email} — invitation sent!`);
    }
  }
}

async function main() {
  console.log("=== ORAH Supabase Setup ===\n");

  await createTables();
  const seeded = await seedContent();
  if (seeded) {
    await inviteAdmins();
  }

  console.log("\n=== Done ===");
}

main().catch(console.error);
