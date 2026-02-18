import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";

export default function StatCounter({ value, label, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl md:text-5xl font-bold text-accent-orange">
        {count}
        {suffix}
      </div>
      <div className="mt-2 text-sm uppercase tracking-[0.2em] text-text-secondary font-light">
        {label}
      </div>
    </div>
  );
}
