# إعداد النشر على Vercel

## 1. إضافة متغيرات البيئة (مهم جداً)

بدونها، **الرسائل الصوتية** و** Memory Drop** مش هيشتغلوا.

في Vercel: **Project → Settings → Environment Variables** أضف:

| الاسم | القيمة |
|-------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://tsykqjulqfmjrnjsuqki.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | المفتاح من لوحة Supabase |

**بعد إضافتهم: Redeploy** (Deployments → ⋮ → Redeploy)

---

## 2. الفيديو

- لو الفيديو أكبر من **50MB**، Vercel ممكن يرفضه.
- **الحل:** ارفع الفيديو على YouTube أو Supabase Storage، وعدّل `videoUrl` في `src/config.ts` بالرابط الجديد.

---

## 3. لو ظهرت رسالة صفراء

"أضف NEXT_PUBLIC_SUPABASE_URL..." يعني أن متغيرات البيئة مش مضبوطة. راجع الخطوة 1.
