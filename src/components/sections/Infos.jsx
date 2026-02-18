import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  MapPin,
  Calendar,
  Ticket,
  Car,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import AnimatedSection from "../ui/AnimatedSection";

const INFO_FIELDS = [
  { id: 'infos_lieu', icon: MapPin, title: 'Lieu' },
  { id: 'infos_dates', icon: Calendar, title: 'Dates' },
  { id: 'infos_billetterie', icon: Ticket, title: 'Billetterie' },
  { id: 'infos_acces', icon: Car, title: 'Accès' },
  { id: 'infos_experience', icon: Sparkles, title: 'Expérience' },
  { id: 'infos_age', icon: ShieldCheck, title: '+18' },
];

function InfoCard({ Icon, title, text, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="p-6 rounded-2xl border border-accent-orange/8 bg-bg-secondary/50 hover:border-accent-orange/20 transition-all duration-500"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-accent-orange/10 flex items-center justify-center shrink-0 mt-0.5">
          <Icon className="w-5 h-5 text-accent-orange" />
        </div>
        <div>
          <h3 className="text-sm uppercase tracking-[0.15em] text-accent-orange font-light mb-2">
            {title}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line font-light">
            {text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Infos({ content }) {
  return (
    <section
      id="infos"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-label="Informations pratiques"
    >
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-accent-orange font-light mb-4">
            Tout ce qu'il faut savoir
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary">
            Infos Pratiques
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {INFO_FIELDS.map((field, i) => (
            <InfoCard
              key={field.id}
              Icon={field.icon}
              title={field.title}
              text={content[field.id]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
