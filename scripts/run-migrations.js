/**
 * Reminder: لإنشاء الجداول استخدم لوحة Supabase أو Supabase CLI
 */

console.log(`
✅ المشروع جاهز!

لإنشاء الجداول في Supabase، اختر واحدة من:

1) من لوحة Supabase (الأسهل):
   - ادخل: https://supabase.com/dashboard/project/tsykqjulqfmjrnjsuqki/sql
   - New query → انسخ محتوى supabase-schema.sql → Run

2) أو من الطرفية (لو Supabase CLI مثبت):
   npx supabase link --project-ref tsykqjulqfmjrnjsuqki
   npx supabase db push
`);
