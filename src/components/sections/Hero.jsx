import { motion } from "framer-motion";
import { TICKET_LINKS } from "../../data/links";
import { FESTIVAL_INFO } from "../../data/festival";
import GoldenGlow from "../decorative/GoldenGlow";
import Button from "../ui/Button";
import heroBg from "../../assets/images/hero-bg.jpg";
import logoPrimaire from "../../assets/logo/logo-primaire-creme.svg";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Accueil"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Ambiance festival ORAH — coucher de soleil"
          className="w-full h-full object-cover"
        />
        {/* Warm overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/40 via-bg-primary/20 to-bg-primary/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/30 to-transparent" />
      </div>

      {/* Golden glow effect */}
      <GoldenGlow
        size="xl"
        className="top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Logo SVG officiel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8"
        >
          <h1 className="sr-only">ORAH — Where light meets rhythm</h1>
          <img
            src={logoPrimaire}
            alt="ORAH — Where light meets rhythm"
            className="w-[320px] sm:w-[420px] md:w-[520px] mx-auto drop-shadow-[0_0_60px_rgba(233,100,27,0.2)]"
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-sm md:text-base uppercase tracking-[0.3em] text-text-secondary font-light mb-2"
        >
          {FESTIVAL_INFO.subtitle}
        </motion.p>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-sm font-light tracking-wider mb-10 text-text-secondary"
        >
          {FESTIVAL_INFO.location}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button href={TICKET_LINKS.festival.url} variant="primary">
            Tickets Festival
          </Button>
          <Button href={TICKET_LINKS.guillemins.url} variant="outline">
            Guillemins × Marten Lou
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-text-muted/40 flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-accent-orange/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
