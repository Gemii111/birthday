'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { MemoryDrop as MemoryDropType } from '@/lib/supabase';

const DEMO_MEMORIES: MemoryDropType[] = [
  {
    id: '1',
    name: 'Sarah',
    content: 'Remember that trip to the beach? Best day ever! 🌊',
    type: 'memory',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Alex',
    content: 'Your birthday party last year was legendary!',
    type: 'memory',
    created_at: new Date().toISOString(),
  },
];

export default function MemoryDrop() {
  const [memories, setMemories] = useState<MemoryDropType[]>([]);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMemories() {
      try {
        if (supabase) {
          const { data } = await supabase
            .from('memory_drops')
            .select('*')
            .order('created_at', { ascending: false });

          if (data && data.length > 0) {
            setMemories(data);
          } else {
            setMemories(DEMO_MEMORIES);
          }
        } else {
          setMemories(DEMO_MEMORIES);
        }
      } catch {
        setMemories(DEMO_MEMORIES);
      }
      setIsLoading(false);
    }
    loadMemories();
  }, []);

  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shared, setShared] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    setError('');
    setIsSubmitting(true);

    try {
      if (supabase) {
        const { data } = await supabase.from('memory_drops').insert({
          name: name.trim(),
          content: content.trim(),
          type: 'memory',
        }).select().single();

        if (data) {
          setMemories((m) => [data, ...m]);
          setName('');
          setContent('');
        }
      } else {
        throw new Error('No Supabase');
      }
    } catch {
      setError(
        supabase
          ? 'حدث خطأ. حاول مرة تانية.'
          : 'أضف NEXT_PUBLIC_SUPABASE_URL و NEXT_PUBLIC_SUPABASE_ANON_KEY في Vercel ثم أعد النشر'
      );
      if (supabase) {
        setMemories((m) => [
          {
            id: String(Date.now()),
            name: name.trim(),
            content: content.trim(),
            type: 'memory',
            created_at: new Date().toISOString(),
          },
          ...m,
        ]);
        setName('');
        setContent('');
      }
    }
    setIsSubmitting(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'YourStory Day - Birthday Experience',
        text: 'Check out this personalized birthday experience!',
        url: window.location.href,
      });
      setShared(true);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setShared(true);
    }
  };

  return (
    <section className="relative min-h-screen py-24 bg-gradient-to-b from-blush-50 to-cream-100">
      <div className="mx-auto max-w-4xl px-6">
        <motion.h2
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-center text-slate-800 mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Memory Drop
        </motion.h2>
        <motion.p
          className="text-center text-slate-600 text-lg mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Share a photo or write a memory. The gallery updates live.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="mb-12 p-6 rounded-2xl bg-white polaroid-shadow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 px-4 py-3 rounded-xl border border-cream-400 focus:border-blush-400 focus:ring-2 focus:ring-blush-200 outline-none transition"
          />
          <textarea
            placeholder="Write a memory..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            className="w-full mb-4 px-4 py-3 rounded-xl border border-cream-400 focus:border-blush-400 focus:ring-2 focus:ring-blush-200 outline-none transition resize-none"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-blush-400 text-white font-semibold hover:bg-blush-500 transition disabled:opacity-50"
          >
            {isSubmitting ? 'Adding...' : 'Add Memory ✨'}
          </button>
          {error && (
            <p className="mt-4 text-red-500 text-sm text-center">{error}</p>
          )}
        </motion.form>

        <div className="space-y-4 mb-12">
          {isLoading && memories.length === 0 && (
            <p className="text-center text-slate-500">جاري تحميل الذكريات...</p>
          )}
          <AnimatePresence>
            {memories.map((mem, i) => (
              <motion.div
                key={mem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 rounded-xl bg-white polaroid-shadow"
              >
                <p className="text-slate-800">{mem.content}</p>
                <p className="text-blush-400 text-sm mt-2">— {mem.name}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.button
          onClick={handleShare}
          className="block mx-auto px-8 py-4 rounded-2xl bg-slate-800 text-cream-100 font-semibold hover:bg-slate-700 transition"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {shared ? '✓ Link Copied!' : 'Share This Page 📤'}
        </motion.button>
      </div>
    </section>
  );
}
