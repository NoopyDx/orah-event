import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LINEUP } from "../../data/lineup";
import AnimatedSection from "../ui/AnimatedSection";
import GoldenGlow from "../decorative/GoldenGlow";

function DayCard({ day, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="relative group"
    >
      <div className="p-6 md:p-8 rounded-2xl border border-accent-orange/10 bg-bg-card/50 backdrop-blur-sm hover:border-accent-orange/25 transition-all duration-500 hover:shadow-[0_0_40px_rgba(233,100,27,0.08)]">
        {/* Day header */}
        <div className="flex items-baseline gap-3 mb-5">
          <h3 className="text-xs uppercase tracking-[0.2em] text-accent-orange font-light">
            {day.day}
          </h3>
          {day.label && (
            <span className="text-[10px] uppercase tracking-[0.15em] text-accent-rose px-2 py-0.5 rounded-full border border-accent-rose/30">
              {day.label}
            </span>
          )}
        </div>

        {/* Artists */}
        <div className="space-y-3">
          {day.artists.map((artist, i) => (
            <div
              key={i}
              className={`font-display text-xl md:text-2xl font-bold ${
                artist === "TBA"
                  ? "text-text-muted/40"
                  : "text-text-primary"
              }`}
            >
              {artist === "TBA" ? "À confirmer" : artist}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Lineup() {
  return (
    <section
      id="lineup"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-label="Lineup"
    >
      <GoldenGlow size="md" className="top-0 left-0 opacity-30" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-accent-orange font-light mb-4">
            16 artistes · 9 pays
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4">
            Lineup
          </h2>
          <p className="text-text-muted font-light text-sm tracking-wider">
            Programmation complète à venir
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {LINEUP.map((day, i) => (
            <DayCard key={day.day} day={day} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
