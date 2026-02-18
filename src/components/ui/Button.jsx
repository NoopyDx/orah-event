import { motion } from "framer-motion";

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium text-sm tracking-wide uppercase transition-all duration-500 cursor-pointer";

  const variants = {
    primary:
      "bg-accent-orange text-bg-light hover:bg-accent-amber hover:shadow-[0_0_40px_rgba(233,100,27,0.4)]",
    outline:
      "border border-accent-orange/40 text-accent-orange hover:bg-accent-orange/10 hover:border-accent-orange hover:shadow-[0_0_30px_rgba(233,100,27,0.2)]",
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.a>
  );
}
