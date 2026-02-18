import { FESTIVAL_INFO, STATS } from "../../data/festival";
import AnimatedSection from "../ui/AnimatedSection";
import StatCounter from "../ui/StatCounter";
import GoldenGlow from "../decorative/GoldenGlow";
import monogramme from "../../assets/logo/Monogramme crème .png";

export default function About() {
  return (
    <section
      id="festival"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-label="Le Festival"
    >
      <GoldenGlow size="lg" className="-top-20 -right-20 opacity-40" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section heading */}
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-accent-orange font-light mb-4">
            Première édition — Été 2025
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-8">
            Le Festival
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent-orange to-transparent mx-auto" />
        </AnimatedSection>

        {/* Description */}
        <AnimatedSection delay={0.2} className="max-w-3xl mx-auto text-center mb-20">
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-light">
            {FESTIVAL_INFO.description}
          </p>
        </AnimatedSection>

        {/* Stats */}
        <AnimatedSection delay={0.4}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {STATS.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </div>
        </AnimatedSection>

        {/* Decorative monogramme */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.04]"
          aria-hidden="true"
        >
          <img
            src={monogramme}
            alt=""
            className="w-[400px] md:w-[600px]"
          />
        </div>
      </div>
    </section>
  );
}
