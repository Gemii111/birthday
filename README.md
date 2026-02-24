# YourStory Day 🎂✨

A personalized, cinematic birthday experience. Emotional, fun, and highly shareable.

![YourStory Day](https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=400&fit=crop)

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## ✅ ما الذي تحتاج أن تفعله أنت؟

### 1. **إضافة المحتوى الشخصي**

**ملف واحد للتخصيص:** `src/config.ts`

| الإعداد | الوصف |
|--------|-------|
| `birthdayDate` | تاريخ الميلاد للعد التنازلي (ISO) |
| `age` | العمر في شاشة Level Up |
| `videoUrl` | رابط فيديو المفاجأة |
| `createFormUrl` | رابط نموذج "أنشئ مثل هذا" |

| القسم | ما تفعله |
|-------|----------|
| **Childhood Memories** | عدّل `src/components/ChildhoodMemories.tsx` — غيّر الصور، التواريخ، والعناوين |
| **Growing Up** | عدّل `src/components/GrowingUp.tsx` — أضف لحظاتك الحقيقية |
| **Messages Wall** | رسائل الأصدقاء تُجلب من Supabase أو تُعرض DEMO |
| **Video Surprise** | عدّل `videoUrl` في `config.ts` أو ضع ملف في `/public/video.mp4` |
| **Countdown** | غيّر `birthdayDate` في `config.ts` |
| **Level Up** | غيّر `age` في `config.ts` |
| **Share CTA** | غيّر `createFormUrl` في `config.ts` |

---

### 2. **إعداد Supabase (اختياري)**

للرسائل الحية، الصور، والصوتيات:

1. أنشئ مشروعاً على [supabase.com](https://supabase.com)
2. انسخ الـ URL والـ Anon Key من Settings → API
3. أنشئ ملف `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

4. نفّذ الـ SQL من `supabase-schema.sql` في SQL Editor

---

### 3. **موسيقى الخلفية**

ضع ملف MP3 في `public/music/birthday.mp3` أو عدّل `src/lib/audio.ts` لاستخدام رابط خارجي.

---

### 4. **الصور المحلية**

للصور المحلية، ضعها في `public/images/` واستخدم مسارات مثل `/images/childhood-1.jpg` في `ChildhoodMemories.tsx`.

### 5. **الرسائل الصوتية (Voice Messages)**

نفّذ ملف `supabase-voice-messages.sql` في SQL Editor مرة واحدة لإنشاء:
- جدول `voice_messages`
- Storage bucket + سياسات الرفع

---

## 📁 هيكل المشروع

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── LandingGift.tsx      # صفحة الهدية السرية
│   ├── ChildhoodMemories.tsx # ذكريات الطفولة
│   ├── GrowingUp.tsx        # لحظات النمو
│   ├── MessagesWall.tsx     # رسائل الأصدقاء
│   ├── VideoSurprise.tsx    # فيديو مفاجأة
│   ├── CountdownCelebration.tsx # العد التنازلي
│   ├── VoiceMessagesWall.tsx    # رسائل صوتية
│   ├── LevelUpReveal.tsx    # Level Up للعمر
│   ├── MemoryDrop.tsx       # رفع ذكريات
│   └── ShareCTA.tsx         # شارك / أنشئ مثل هذا
└── lib/
    ├── supabase.ts
    └── audio.ts
```

---

## 🛠 Tech Stack

- **Next.js 14** – React framework
- **TailwindCSS** – Styling
- **Framer Motion** – Animations
- **GSAP** – Parallax & advanced effects
- **Howler.js** – Audio
- **Supabase** – Real-time data
- **canvas-confetti** – Confetti effects

---

## 📤 النشر

```bash
npm run build
npm run start
```

يمكنك النشر على Vercel أو أي منصة تدعم Next.js.

---

صُنع بـ 💖 لشخص مميز
