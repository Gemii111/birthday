'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { initBackgroundMusic, playBackgroundMusic } from '@/lib/audio';
import { config } from '@/config';

interface LandingGiftProps {
  onOpen: () => void;
}

export default function LandingGift({ onOpen }: LandingGiftProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleOpen = () => {
    if (config.musicUrl) {
      initBackgroundMusic(config.musicUrl);
      playBackgroundMusic();
    }
    onOpen();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, pointerEvents: 'none' }}
      transition={{ duration: 0.5 }}
    >
      {/* Ambient gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-blush-300/10 via-transparent to-transparent opacity-40" />
      <div className="absolute inset-0 bg-gradient-cinematic opacity-30" />

      <div className="relative z-10 flex flex-col items-center gap-12 px-6 text-center">
        {/* Animated text */}
        <motion.p
          className="font-serif text-2xl sm:text-3xl md:text-4xl text-cream-100 font-light tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Someone prepared this for you…
        </motion.p>

        <motion.p
          className="font-serif text-lg sm:text-xl text-cream-200/80 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          A journey through your story, made with love ✨
        </motion.p>

        {/* Gift button */}
        <motion.button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleOpen}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blush-300 to-blush-400 px-10 py-5 min-h-[52px] font-sans text-lg font-semibold text-white shadow-xl transition-all duration-300 active:scale-[0.98]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <motion.span
            className="relative z-10 flex items-center gap-2"
            animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
          >
            Open Your Gift 🎁
          </motion.span>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </motion.button>
      </div>

      {/* Subtle floating particles */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream-300/50 text-sm">
        Scroll to explore
      </div>
    </motion.div>
  );
}
