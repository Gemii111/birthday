'use client';

import { motion } from 'framer-motion';
import { config } from '@/config';

export default function ShareCTA() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-cream-100 to-blush-100">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-800 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Create a Birthday Like This
        </motion.h2>
        <motion.p
          className="text-slate-600 text-lg mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Make someone&apos;s special day unforgettable with a personalized YourStory Day experience.
        </motion.p>
        <motion.a
          href={config.createFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-4 min-h-[52px] rounded-2xl bg-gradient-to-r from-blush-400 to-blush-500 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Create a Birthday Like This 🎁
        </motion.a>
      </div>
    </section>
  );
}
