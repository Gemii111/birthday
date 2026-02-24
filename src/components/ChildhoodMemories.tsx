'use client';

import { motion } from 'framer-motion';

const memories = [
  {
    id: 1,
    year: '2000',
    title: 'First Steps',
    caption: 'The beginning of an amazing journey',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&h=450&fit=crop',
    offset: 0,
  },
  {
    id: 2,
    year: '2003',
    title: 'Kindergarten',
    caption: 'Making first friends',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=450&fit=crop',
    offset: 1,
  },
  {
    id: 3,
    year: '2006',
    title: 'Elementary Days',
    caption: 'Learning and growing',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=450&fit=crop',
    offset: 2,
  },
  {
    id: 4,
    year: '2009',
    title: 'Big Dreams',
    caption: 'Where it all started',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=450&fit=crop',
    offset: 3,
  },
];

export default function ChildhoodMemories() {
  return (
    <section
      className="relative min-h-screen py-24 bg-gradient-to-b from-cream-50 to-cream-100"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-center text-slate-800 mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          The Beginning
        </motion.h2>
        <motion.p
          className="text-center text-slate-600 text-lg max-w-2xl mx-auto mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Childhood memories that shaped who you are
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {memories.map((mem, i) => (
            <motion.div
              key={mem.id}
              className="relative group"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              style={{
                transform: `rotate(${(i % 2 === 0 ? 1 : -1) * 3}deg)`,
              }}
            >
              {/* Polaroid frame */}
              <div className="polaroid-shadow bg-white p-4 pb-12 rounded-sm rotate-0 group-hover:rotate-0 transition-transform duration-500">
                <div className="aspect-[4/3] bg-cream-200 overflow-hidden rounded relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mem.image}
                    alt={mem.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-serif text-xl text-slate-700">{mem.title}</p>
                  <p className="text-sm text-slate-500">{mem.caption}</p>
                  <span className="text-blush-400 font-semibold">{mem.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
