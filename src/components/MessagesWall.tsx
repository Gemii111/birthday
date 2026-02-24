'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { BirthdayMessage } from '@/lib/supabase';

const DEMO_MESSAGES: BirthdayMessage[] = [
  { id: '1', name: 'Sarah', message: 'Happy birthday! You deserve the world! 🌍✨', emoji: '💖', created_at: new Date().toISOString() },
  { id: '2', name: 'Alex', message: 'Best friend ever! Have an amazing day! 🎂', emoji: '🎉', created_at: new Date().toISOString() },
  { id: '3', name: 'Mom', message: 'My precious one, forever proud of you. 💕', emoji: '🌸', created_at: new Date().toISOString() },
  { id: '4', name: 'Dad', message: 'Another year of awesomeness! Keep shining! ⭐', emoji: '👍', created_at: new Date().toISOString() },
  { id: '5', name: 'Layla', message: 'Wishing you endless joy and laughter! 😂🎈', emoji: '🌈', created_at: new Date().toISOString() },
];

export default function MessagesWall() {
  const [messages, setMessages] = useState<BirthdayMessage[]>(DEMO_MESSAGES);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadMessages() {
      try {
        if (supabase) {
          const { data } = await supabase
            .from('birthday_messages')
            .select('*')
            .order('created_at', { ascending: true });

          if (data && data.length > 0) {
            setMessages(data);
          }
        }
      } catch {
        // Use demo messages if Supabase not configured
      }
      setIsLoaded(true);
    }
    loadMessages();
  }, []);

  useEffect(() => {
    if (!isLoaded || messages.length === 0) return;
    const interval = setInterval(() => {
      setVisibleIndex((i) => (i + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isLoaded, messages.length]);

  return (
    <section className="relative min-h-screen py-24 bg-gradient-to-b from-blush-50 to-cream-100">
      <div className="mx-auto max-w-4xl px-6">
        <motion.h2
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-center text-slate-800 mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Messages From Friends
        </motion.h2>
        <motion.p
          className="text-center text-slate-600 text-lg mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Birthday wishes from the people who love you
        </motion.p>

        <div className="min-h-[320px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {messages.length > 0 && (
              <motion.div
                key={visibleIndex}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-xl mx-auto bg-white rounded-2xl polaroid-shadow p-8 md:p-12 text-center"
              >
                <span className="text-4xl mb-4 block">
                  {messages[visibleIndex]?.emoji || '💝'}
                </span>
                <p className="font-serif text-xl md:text-2xl text-slate-700 mb-4 italic">
                  &ldquo;{messages[visibleIndex]?.message}&rdquo;
                </p>
                <p className="text-blush-400 font-semibold">
                  — {messages[visibleIndex]?.name}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {messages.map((_, i) => (
            <button
              key={i}
              onClick={() => setVisibleIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === visibleIndex ? 'bg-blush-400 w-8' : 'bg-cream-500'
              }`}
              aria-label={`View message ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
