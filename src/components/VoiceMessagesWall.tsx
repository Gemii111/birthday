'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface VoiceMessage {
  id: string;
  name: string;
  audio_url: string;
  created_at: string;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  if (diff < 60000) return 'الآن';
  if (diff < 3600000) return `منذ ${Math.floor(diff / 60000)} دقيقة`;
  if (diff < 86400000) return 'اليوم';
  if (diff < 172800000) return 'أمس';
  return d.toLocaleDateString('ar-EG');
}

export default function VoiceMessagesWall() {
  const [messages, setMessages] = useState<VoiceMessage[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    async function load() {
      try {
        if (supabase) {
          const { data } = await supabase
            .from('voice_messages')
            .select('*')
            .order('created_at', { ascending: false });
          if (data?.length) setMessages(data);
        }
      } catch {
        // ignore
      }
      setIsLoading(false);
    }
    load();
  }, []);

  const togglePlay = (id: string, url: string) => {
    if (playingId === id) {
      const audio = document.getElementById(`audio-${id}`) as HTMLAudioElement;
      audio?.pause();
      setPlayingId(null);
      return;
    }
    document.querySelectorAll('audio').forEach((a) => a.pause());
    const audio = document.getElementById(`audio-${id}`) as HTMLAudioElement;
    if (audio) {
      audio.play();
      audio.onended = () => setPlayingId(null);
      setPlayingId(id);
    }
  };

  const startRecording = async () => {
    setError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      audioChunksRef.current = [];

      mr.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mr.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await uploadAndSave(blob);
      };

      mr.start();
      setIsRecording(true);
    } catch (err) {
      setError('المايكروفون غير متاح. تأكد من السماح للموقع بالوصول.');
      console.error(err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const uploadAndSave = async (blob: Blob) => {
    if (!supabase || !name.trim()) {
      setError('اكتب اسمك أولاً');
      return;
    }
    setIsUploading(true);
    setError('');
    try {
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.webm`;
      const { error: uploadErr } = await supabase.storage
        .from('voice-messages')
        .upload(fileName, blob, { contentType: 'audio/webm', upsert: false });

      if (uploadErr) throw uploadErr;

      const { data: urlData } = supabase.storage
        .from('voice-messages')
        .getPublicUrl(fileName);

      const { data: row } = await supabase
        .from('voice_messages')
        .insert({
          name: name.trim(),
          audio_url: urlData.publicUrl,
        })
        .select()
        .single();

      if (row) setMessages((m) => [row, ...m]);
      setName('');
    } catch (err) {
      setError(
        'فشل الرفع. تأكد من تشغيل supabase-voice-messages.sql في Supabase.'
      );
      console.error(err);
    }
    setIsUploading(false);
  };

  return (
    <section className="relative min-h-screen py-24 bg-gradient-to-b from-cream-100 to-blush-50">
      <div className="mx-auto max-w-3xl px-6">
        <motion.h2
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-center text-slate-800 mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Voice Messages
        </motion.h2>
        <motion.p
          className="text-center text-slate-600 text-lg mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          سجّل رسالتك الصوتية أو استمع لرسائل الآخرين 🎤
        </motion.p>

        {/* Recording form */}
        <motion.div
          className="mb-12 p-6 rounded-2xl bg-white polaroid-shadow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <input
            type="text"
            placeholder="اسمك"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isRecording || isUploading}
            className="w-full mb-4 px-4 py-3 rounded-xl border border-cream-400 focus:border-blush-400 focus:ring-2 focus:ring-blush-200 outline-none transition disabled:opacity-60"
          />
          <div className="flex gap-4">
            {!isRecording ? (
              <button
                onClick={startRecording}
                disabled={isUploading || !name.trim()}
                className="flex-1 py-4 rounded-xl bg-blush-400 text-white font-semibold hover:bg-blush-500 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
              >
                {isUploading ? (
                  <>جاري الرفع...</>
                ) : (
                  <>
                    <span className="text-2xl">🎤</span>
                    سجّل رسالتك
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="flex-1 py-4 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition flex items-center justify-center gap-2 animate-pulse"
              >
                <span className="w-3 h-3 bg-white rounded-full" />
                اضغط للإيقاف
              </button>
            )}
          </div>
          {error && (
            <p className="mt-4 text-red-500 text-sm text-center">{error}</p>
          )}
        </motion.div>

        {/* Messages list */}
        {isLoading ? (
          <p className="text-center text-slate-500">جاري التحميل...</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-slate-500 py-8">
            لا توجد رسائل بعد. كن أول من يسجّل! 🎤
          </p>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white polaroid-shadow hover:shadow-xl transition-shadow"
              >
                <audio
                  id={`audio-${msg.id}`}
                  src={msg.audio_url}
                  preload="metadata"
                />
                <button
                  onClick={() => togglePlay(msg.id, msg.audio_url)}
                  className={`w-14 h-14 shrink-0 rounded-full flex items-center justify-center transition-all ${
                    playingId === msg.id
                      ? 'bg-blush-400 text-white'
                      : 'bg-blush-100 text-blush-500 hover:bg-blush-200'
                  }`}
                >
                  {playingId === msg.id ? (
                    <span className="text-2xl">⏸</span>
                  ) : (
                    <span className="text-2xl ml-1">▶</span>
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800">{msg.name}</p>
                  <p className="text-sm text-slate-500">
                    {formatDate(msg.created_at)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
