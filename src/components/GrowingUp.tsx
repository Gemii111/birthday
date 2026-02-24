'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const moments = [
  {
    id: 1,
    era: 'School Days',
    title: 'Best Friends Forever',
    description: 'Those lunch breaks, secret notes, and endless laughter.',
    icon: '🎒',
  },
  {
    id: 2,
    era: 'Hobbies',
    title: 'Passion Discovered',
    description: 'Finding what makes your soul dance.',
    icon: '✨',
  },
  {
    id: 3,
    era: 'Growing Up',
    title: 'Funny Memories',
    description: 'The stories we still laugh about today.',
    icon: '😂',
  },
  {
    id: 4,
    era: 'Milestones',
    title: 'Important Moments',
    description: 'Every step that led you here.',
    icon: '🌟',
  },
];

export default function GrowingUp() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 0.3], [100, -50]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.5], [80, -80]);
  const y3 = useTransform(scrollYProgress, [0.4, 0.7], [60, -60]);
  const y4 = useTransform(scrollYProgress, [0.6, 0.9], [100, -40]);
  const yValues = [y1, y2, y3, y4];

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 overflow-hidden bg-gradient-to-b from-cream-100 via-cream-50 to-blush-50"
    >
      {/* Parallax background elements */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 rounded-full bg-blush-200/30 blur-3xl"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-sage-200/30 blur-3xl"
        style={{ y: y2 }}
      />

      <motion.div style={{ opacity }} className="relative z-10">
        <div className="mx-auto max-w-5xl px-6">
          <motion.h2
            className="font-serif text-4xl sm:text-5xl md:text-6xl text-center text-slate-800 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Growing Up Moments
          </motion.h2>
          <motion.p
            className="text-center text-slate-600 text-lg mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            School, friends, hobbies & the moments we cherish
          </motion.p>

          <div className="space-y-16">
            {moments.map((moment, i) => (
              <motion.div
                key={moment.id}
                className={`flex flex-col gap-6 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
              >
                <motion.div
                  className="flex-1 text-6xl md:text-7xl"
                  style={{ y: yValues[i] }}
                >
                  {moment.icon}
                </motion.div>
                <div className="flex-1 text-center md:text-left">
                  <span className="inline-block text-blush-400 font-semibold text-sm uppercase tracking-wider mb-2">
                    {moment.era}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-slate-800 mb-3">
                    {moment.title}
                  </h3>
                  <p className="text-slate-600">{moment.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
