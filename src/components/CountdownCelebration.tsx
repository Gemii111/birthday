'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { playBackgroundMusic, setMusicVolume } from '@/lib/audio';

interface CountdownCelebrationProps {
  birthdayDate: string; // ISO date string, e.g. "2025-02-24T00:00:00"
}

export default function CountdownCelebration({ birthdayDate }: CountdownCelebrationProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [hasReachedZero, setHasReachedZero] = useState(false);
  const [showCake, setShowCake] = useState(false);

  useEffect(() => {
    const target = new Date(birthdayDate).getTime();

    const update = () => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setHasReachedZero(true);
        setShowCake(true);
        // Confetti burst!
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
        });
        setTimeout(() => {
          confetti({
            particleCount: 100,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
          });
          confetti({
            particleCount: 100,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
          });
        }, 250);
        setMusicVolume(0.7);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [birthdayDate]);

  const Box = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 md:w-24 md:h-24 bg-white/90 backdrop-blur rounded-xl flex items-center justify-center shadow-lg">
        <span className="font-serif text-3xl md:text-4xl font-bold text-blush-500">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-cream-200/90 text-sm mt-2 uppercase tracking-wider">{label}</span>
    </div>
  );

  return (
    <section className="relative min-h-screen py-24 overflow-hidden bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800">
      <div className="absolute inset-0 bg-gradient-radial from-blush-400/10 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.h2
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-cream-100 mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {hasReachedZero ? "It's Your Day!" : 'Birthday Countdown'}
        </motion.h2>

        <AnimatePresence mode="wait">
          {hasReachedZero ? (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <motion.p
                className="text-2xl text-cream-200"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🎉 Happy Birthday! 🎉
              </motion.p>
              {showCake && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-8xl"
                >
                  🎂
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="countdown"
              className="flex flex-wrap justify-center gap-6 md:gap-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Box value={timeLeft.days} label="Days" />
              <Box value={timeLeft.hours} label="Hours" />
              <Box value={timeLeft.minutes} label="Minutes" />
              <Box value={timeLeft.seconds} label="Seconds" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
