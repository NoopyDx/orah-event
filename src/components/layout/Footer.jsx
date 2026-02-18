import { SOCIAL_LINKS, TICKET_LINKS } from "../../data/links";
import { FESTIVAL_INFO } from "../../data/festival";
import { Facebook, Instagram, Music, Mail } from "lucide-react";
import iconFacebook from "../../assets/logo/icon-facebook.png";
import iconInstagram from "../../assets/logo/icon-instagram.png";
import iconTiktok from "../../assets/logo/icon-tiktok.png";
import iconEmail from "../../assets/logo/icon-email.png";

const SOCIALS = [
  { icon: iconFacebook, alt: "Facebook ORAH", href: SOCIAL_LINKS.facebook },
  { icon: iconInstagram, alt: "Instagram ORAH", href: SOCIAL_LINKS.instagram },
  { icon: iconTiktok, alt: "TikTok ORAH", href: SOCIAL_LINKS.tiktok },
  { icon: iconEmail, alt: "Email ORAH", href: SOCIAL_LINKS.email },
];

export default function Footer() {
  return (
    <footer className="relative py-16 border-t border-accent-gold/10">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Logo */}
        <div className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-3">
          ѲRAH.
        </div>
        <p className="font-display text-lg text-accent-peach italic mb-8">
          {FESTIVAL_INFO.tagline}
        </p>

        {/* Social icons (custom from Wix) */}
        <div className="flex items-center justify-center gap-5 mb-8">
          {SOCIALS.map((social) => (
            <a
              key={social.alt}
              href={social.href}
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="w-11 h-11 rounded-full overflow-hidden opacity-70 hover:opacity-100 transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,162,83,0.2)] hover:scale-110"
              aria-label={social.alt}
            >
              <img
                src={social.icon}
                alt={social.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </a>
          ))}
        </div>

        {/* Quick ticket links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a
            href={TICKET_LINKS.festival.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary hover:text-accent-gold transition-colors font-accent tracking-wide"
          >
            Tickets Festival →
          </a>
          <span className="hidden sm:block text-text-muted/30">|</span>
          <a
            href={TICKET_LINKS.guillemins.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary hover:text-accent-gold transition-colors font-accent tracking-wide"
          >
            Tickets Guillemins →
          </a>
        </div>

        {/* Email */}
        <a
          href="mailto:Orah.event@gmail.com"
          className="text-sm text-text-muted hover:text-text-secondary transition-colors font-accent"
        >
          Orah.event@gmail.com
        </a>

        {/* Copyright */}
        <p className="text-xs text-text-muted/50 mt-6 font-accent">
          © 2025 ORAH — Visé, Belgique. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
