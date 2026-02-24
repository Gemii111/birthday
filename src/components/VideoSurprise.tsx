'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

interface VideoSurpriseProps {
  videoUrl?: string;
  posterUrl?: string;
}

export default function VideoSurprise({ videoUrl, posterUrl }: VideoSurpriseProps) {
  const [hasError, setHasError] = useState(false);
  const [showPlayOverlay, setShowPlayOverlay] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleTapToPlay = () => {
    const video = videoRef.current;
    if (video) {
      video.play();
      setShowPlayOverlay(false);
    }
  };

  return (
    <section className="relative min-h-screen py-24 bg-slate-900">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-800/50 to-slate-900" />
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <motion.h2
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-center text-cream-100 mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Video Surprise
        </motion.h2>
        <motion.p
          className="text-center text-cream-200/80 text-lg mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Compiled wishes and memorable moments
        </motion.p>

        <motion.div
          className="relative aspect-video rounded-2xl overflow-hidden bg-slate-800 polaroid-shadow"
          style={{ touchAction: 'manipulation' }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {videoUrl && !hasError ? (
            <>
              <video
                ref={videoRef}
                src={videoUrl}
                poster={posterUrl || undefined}
                controls
                playsInline
                preload="metadata"
                onError={() => setHasError(true)}
                onPlay={() => setShowPlayOverlay(false)}
                onEnded={() => setShowPlayOverlay(true)}
                className="w-full h-full object-cover"
              >
                المتصفح لا يدعم تشغيل الفيديو
              </video>
              {showPlayOverlay && (
                <button
                  type="button"
                  onClick={handleTapToPlay}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-black/50 text-cream-100 min-h-[200px] cursor-pointer active:bg-black/40"
                  aria-label="تشغيل الفيديو"
                >
                  <span className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center text-4xl">
                    ▶
                  </span>
                  <span className="text-lg font-medium">اضغط للتشغيل</span>
                </button>
              )}
            </>
          ) : hasError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-cream-200 p-6 text-center">
              <span className="text-6xl">⚠️</span>
              <p className="text-lg">الفيديو مش شغال</p>
              <p className="text-sm text-cream-300/70 max-w-md">
                لو على Vercel: تأكد إن الملف أقل من 50MB، أو ارفعه على YouTube/Supabase وغير videoUrl في config
              </p>
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-cream-200">
              <span className="text-6xl">🎬</span>
              <p className="text-lg">Add your video URL in the page config</p>
              <p className="text-sm text-cream-300/70">
                Or drop a video file in <code className="bg-slate-700 px-2 py-1 rounded">/public/video.mp4</code>
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
