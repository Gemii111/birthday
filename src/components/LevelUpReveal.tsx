'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';

interface LevelUpRevealProps {
  age?: number;
}

export default function LevelUpReveal({ age = 27 }: LevelUpRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });
  const hasConfetti = useRef(false);

  useEffect(() => {
    if (isInView && !hasConfetti.current) {
      hasConfetti.current = true;
      const t = setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
        });
      }, 600);
      return () => clearTimeout(t);
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen py-24 overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-900/30 to-slate-900"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blush-400/20 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 15,
            duration: 0.8,
          }}
          className="space-y-6"
        >
          <motion.p
            className="text-blush-300 font-sans text-sm uppercase tracking-[0.3em]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            New achievement unlocked
          </motion.p>

          <motion.h2
            className="font-serif text-4xl sm:text-5xl md:text-7xl text-cream-100"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            LEVEL {age} UNLOCKED
          </motion.h2>

          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cream-100/10 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <span className="text-3xl">🏆</span>
            <span className="text-cream-200">You leveled up!</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
