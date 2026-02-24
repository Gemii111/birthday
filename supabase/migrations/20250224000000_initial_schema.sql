-- Birthday messages from friends
CREATE TABLE IF NOT EXISTS birthday_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  emoji TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Memory drops (photos or written memories)
CREATE TABLE IF NOT EXISTS memory_drops (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  type TEXT CHECK (type IN ('photo', 'memory')) DEFAULT 'memory',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE birthday_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE memory_drops ENABLE ROW LEVEL SECURITY;

-- Policies for birthday_messages
CREATE POLICY "Allow public insert" ON birthday_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read" ON birthday_messages FOR SELECT USING (true);

-- Policies for memory_drops
CREATE POLICY "Allow public insert" ON memory_drops FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read" ON memory_drops FOR SELECT USING (true);
