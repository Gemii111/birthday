import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only create client when config is present (avoids build errors)
export const supabase: SupabaseClient | null = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export type BirthdayMessage = {
  id: string;
  name: string;
  message: string;
  emoji?: string;
  created_at: string;
};

export type MemoryDrop = {
  id: string;
  name: string;
  content: string;
  image_url?: string;
  type: 'photo' | 'memory';
  created_at: string;
};
