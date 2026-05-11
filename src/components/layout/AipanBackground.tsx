import { motion, useScroll, useTransform } from 'motion/react';

export function AipanBackground() {
  const { scrollY } = useScroll();
  // Subtle parallax: moves down slightly as you scroll down
  const y = useTransform(scrollY, [0, 2000], [0, 100]);
  // Very slow continuous rotation based on scroll
  const rotate = useTransform(scrollY, [0, 2000], [0, 15]);

  return (
    <motion.div
      style={{ y, rotate }}
      className="fixed inset-[-50%] z-[-1] pointer-events-none opacity-[0.03] flex items-center justify-center"
    >
      {/* Abstract geometric pattern inspired by Aipan art */}
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="aipan-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M60 0 L120 60 L60 120 L0 60 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M30 30 L90 90 M30 90 L90 30" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="60" cy="60" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="60" cy="60" r="5" fill="currentColor" />
            <rect x="55" y="0" width="10" height="10" fill="currentColor" />
            <rect x="55" y="110" width="10" height="10" fill="currentColor" />
            <rect x="0" y="55" width="10" height="10" fill="currentColor" />
            <rect x="110" y="55" width="10" height="10" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#aipan-pattern)" className="text-on-surface" />
      </svg>
    </motion.div>
  );
}
