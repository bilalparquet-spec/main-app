-- ═══════════════════════════════════════════════════════════════════
-- Migration v6.7.21: جدول المفضلة (favorites)
-- DriveRENT — منصة تأجير السيارات الجزائرية
-- ═══════════════════════════════════════════════════════════════════
-- التوافق:
--   ✓ MainApp    → يقرأ/يكتب عبر hook useFavorites.js
--   ✓ AdminPanel → لا يستخدم favorites (إحصاءات الوكالات فقط)
--   ✓ AgencyPortal → لا يستخدم favorites (إدارة السيارات والحجوزات)
--
-- ملاحظة: cars.id من نوع text (ليس uuid) — راجع schema.sql
-- ═══════════════════════════════════════════════════════════════════

-- ── 1. إنشاء جدول المفضلة ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.favorites (
  id          uuid         DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     uuid         NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  car_id      text         NOT NULL REFERENCES public.cars(id) ON DELETE CASCADE,
  created_at  timestamptz  DEFAULT now()
);

-- ── 2. فهارس الأداء ───────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_favorites_user_id
  ON public.favorites(user_id);

CREATE INDEX IF NOT EXISTS idx_favorites_car_id
  ON public.favorites(car_id);

-- ── 3. منع التكرار ────────────────────────────────────────────────
ALTER TABLE public.favorites
  DROP CONSTRAINT IF EXISTS favorites_user_car_unique;

ALTER TABLE public.favorites
  ADD CONSTRAINT favorites_user_car_unique UNIQUE (user_id, car_id);

-- ── 4. تفعيل Row Level Security ───────────────────────────────────
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- ── 5. سياسات RLS ─────────────────────────────────────────────────
-- كل مستخدم يرى مفضلته فقط
DROP POLICY IF EXISTS "favorites_select_own" ON public.favorites;
CREATE POLICY "favorites_select_own"
  ON public.favorites FOR SELECT
  USING (auth.uid() = user_id);

-- كل مستخدم يضيف لمفضلته فقط
DROP POLICY IF EXISTS "favorites_insert_own" ON public.favorites;
CREATE POLICY "favorites_insert_own"
  ON public.favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- كل مستخدم يحذف من مفضلته فقط
DROP POLICY IF EXISTS "favorites_delete_own" ON public.favorites;
CREATE POLICY "favorites_delete_own"
  ON public.favorites FOR DELETE
  USING (auth.uid() = user_id);

-- AdminPanel: السوبر أدمن يرى كل المفضلة للإحصاءات
DROP POLICY IF EXISTS "favorites_admin_select" ON public.favorites;
CREATE POLICY "favorites_admin_select"
  ON public.favorites FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'admin_staff')
    )
  );

-- ── 6. إحصاء المفضلة لكل سيارة (view مساعد للـ AdminPanel) ──────
CREATE OR REPLACE VIEW public.car_favorites_count AS
  SELECT
    car_id,
    COUNT(*) AS favorites_count
  FROM public.favorites
  GROUP BY car_id;

COMMENT ON VIEW public.car_favorites_count IS
  'عدد مرات إضافة كل سيارة للمفضلة — يمكن استخدامه في AdminPanel للإحصاءات';

-- ── 7. تعليقات ────────────────────────────────────────────────────
COMMENT ON TABLE public.favorites IS
  'مفضلة المستخدمين — كل صف = سيارة أضافها مستخدم لمفضلته';

COMMENT ON COLUMN public.favorites.user_id IS
  'معرّف المستخدم من auth.users';

COMMENT ON COLUMN public.favorites.car_id IS
  'معرّف السيارة — نوع text يتوافق مع cars.id في schema.sql';
