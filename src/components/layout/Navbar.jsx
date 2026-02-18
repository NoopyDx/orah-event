import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TICKET_LINKS } from "../../data/links";

const NAV_ITEMS = [
  { label: "Le Festival", href: "#festival" },
  { label: "Lineup", href: "#lineup" },
  { label: "Infos", href: "#infos" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ticketsOpen, setTicketsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-bg-primary/90 backdrop-blur-md shadow-[0_1px_0_rgba(212,162,83,0.1)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-display text-2xl md:text-3xl font-bold text-text-primary tracking-tight"
        >
          ѲRAH.
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm uppercase tracking-[0.15em] text-text-secondary hover:text-accent-gold transition-colors duration-300 font-accent"
            >
              {item.label}
            </a>
          ))}

          {/* Tickets dropdown */}
          <div className="relative">
            <button
              onClick={() => setTicketsOpen(!ticketsOpen)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent-gold text-bg-primary text-sm font-accent font-medium uppercase tracking-wide hover:bg-accent-amber transition-all duration-300 cursor-pointer hover:shadow-[0_0_30px_rgba(212,162,83,0.3)]"
            >
              <span>Tickets</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-300 ${ticketsOpen ? "rotate-180" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            <AnimatePresence>
              {ticketsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute right-0 mt-3 w-72 bg-bg-card/95 backdrop-blur-md border border-accent-gold/15 rounded-2xl overflow-hidden shadow-xl"
                >
                  {Object.values(TICKET_LINKS).map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-5 py-4 hover:bg-accent-gold/10 transition-colors duration-300"
                      onClick={() => setTicketsOpen(false)}
                    >
                      <div className="text-sm font-medium text-text-primary">
                        {link.label}
                      </div>
                      <div className="text-xs text-text-muted mt-0.5">
                        {link.description}
                      </div>
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 cursor-pointer"
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <span
            className={`block w-6 h-0.5 bg-text-primary transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-1" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-text-primary transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-1" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 top-16 bg-bg-primary/98 backdrop-blur-xl md:hidden z-50"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 -mt-16">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="text-2xl uppercase tracking-[0.2em] text-text-secondary hover:text-accent-gold transition-colors font-accent"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
              <div className="flex flex-col gap-4 mt-4 w-64">
                <a
                  href={TICKET_LINKS.festival.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-6 py-4 rounded-xl bg-accent-gold text-bg-primary text-center text-sm font-accent font-medium uppercase tracking-wide"
                  onClick={() => setMobileOpen(false)}
                >
                  Tickets Festival
                </a>
                <a
                  href={TICKET_LINKS.guillemins.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-6 py-4 rounded-xl border border-accent-gold/40 text-accent-gold text-center text-sm font-accent font-medium uppercase tracking-wide"
                  onClick={() => setMobileOpen(false)}
                >
                  Guillemins × Marten Lou
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
