-- Voice Messages - Run this in Supabase SQL Editor
-- نفّذ هذا الملف في SQL Editor في Supabase

-- 1. جدول الرسائل الصوتية
CREATE TABLE IF NOT EXISTS voice_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  audio_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE voice_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert voice_messages" ON voice_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read voice_messages" ON voice_messages FOR SELECT USING (true);

-- 2. Storage bucket للرسائل الصوتية (لو مش موجود)
INSERT INTO storage.buckets (id, name, public)
VALUES ('voice-messages', 'voice-messages', true)
ON CONFLICT (id) DO NOTHING;

-- 3. سياسات الرفع والقراءة للـ Storage
DROP POLICY IF EXISTS "Allow public upload voice" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read voice" ON storage.objects;

CREATE POLICY "Allow public upload voice"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'voice-messages');

CREATE POLICY "Allow public read voice"
ON storage.objects FOR SELECT
USING (bucket_id = 'voice-messages');
