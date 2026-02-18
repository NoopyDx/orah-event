import { motion } from "framer-motion";

export default function GoldenGlow({ className = "", size = "lg" }) {
  const sizes = {
    sm: "w-48 h-48",
    md: "w-72 h-72",
    lg: "w-96 h-96",
    xl: "w-[600px] h-[600px]",
  };

  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${sizes[size]} ${className}`}
      style={{
        background:
          "radial-gradient(ellipse, rgba(212,162,83,0.2), rgba(232,145,58,0.08), transparent 70%)",
      }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      aria-hidden="true"
    />
  );
}
