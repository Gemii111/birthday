'use client';

import { supabase } from '@/lib/supabase';

export default function ConfigBanner() {
  if (supabase) return null;

  return (
    <div className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-[9999] p-3 bg-amber-500 text-black rounded-xl shadow-lg text-sm">
      <p className="font-semibold">⚠️ الريساجات والذكريات مش هتشتغل</p>
      <p className="mt-1 opacity-90">
        أضف في Vercel: NEXT_PUBLIC_SUPABASE_URL و NEXT_PUBLIC_SUPABASE_ANON_KEY
      </p>
    </div>
  );
}
