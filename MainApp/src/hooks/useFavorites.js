import { useState, useEffect, useCallback, useRef } from 'react';
import { getCurrentUser, SUPABASE_READY, SUPABASE_URL, SUPABASE_ANON_KEY } from '../lib/supabase.js';

// ─── useFavorites ─────────────────────────────────────────────────────────────
// يدير المفضلة بشكل هجين:
//   • مستخدم مسجّل + Supabase متاح → يحفظ في جدول favorites بقاعدة البيانات
//   • مستخدم غير مسجّل أو Supabase معطّل → يحفظ في localStorage
// يدعم:
//   • تحميل المفضلة عند تسجيل الدخول
//   • ترحيل مفضلة الضيف إلى DB عند أول تسجيل دخول
//   • optimistic UI — يتغير القلب فوراً ثم يُزامن في الخلفية
// ─────────────────────────────────────────────────────────────────────────────

const LS_KEY = 'driverent_liked_cars';

function readLocalFavorites() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr.map(String) : []);
  } catch {
    return new Set();
  }
}

function writeLocalFavorites(set) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify([...set]));
  } catch {}
}

function authHeaders() {
  try {
    const session = JSON.parse(localStorage.getItem('sb_session') || 'null');
    const token = session?.access_token || SUPABASE_ANON_KEY;
    return {
      'Content-Type': 'application/json',
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${token}`,
      Prefer: 'return=minimal',
    };
  } catch {
    return {
      'Content-Type': 'application/json',
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Prefer: 'return=minimal',
    };
  }
}

async function fetchDBFavorites(userId) {
  if (!SUPABASE_READY || !userId) return null;
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/favorites?user_id=eq.${userId}&select=car_id`,
      { headers: authHeaders() }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return new Set(Array.isArray(data) ? data.map(r => String(r.car_id)) : []);
  } catch {
    return null;
  }
}

async function addDBFavorite(userId, carId) {
  if (!SUPABASE_READY || !userId) return false;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/favorites`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({
        user_id: userId,
        car_id: String(carId),
        created_at: new Date().toISOString(),
      }),
    });
    return res.ok || res.status === 409; // 409 = already exists
  } catch {
    return false;
  }
}

async function removeDBFavorite(userId, carId) {
  if (!SUPABASE_READY || !userId) return false;
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/favorites?user_id=eq.${userId}&car_id=eq.${carId}`,
      { method: 'DELETE', headers: authHeaders() }
    );
    return res.ok;
  } catch {
    return false;
  }
}

// ترحيل مفضلة الضيف إلى DB عند تسجيل الدخول
async function migrateGuestFavorites(userId, guestSet) {
  if (!SUPABASE_READY || !userId || guestSet.size === 0) return;
  const promises = [...guestSet].map(carId => addDBFavorite(userId, carId));
  await Promise.allSettled(promises);
  // تفريغ localStorage بعد الترحيل
  writeLocalFavorites(new Set());
}

// ─── Hook ────────────────────────────────────────────────────────────────────
export function useFavorites() {
  const [liked, setLiked] = useState(() => readLocalFavorites());
  const [loading, setLoading] = useState(false);
  const prevUserRef = useRef(null);

  // تحميل / ترحيل عند تغيّر حالة الدخول
  useEffect(() => {
    let cancelled = false;

    async function syncWithDB() {
      const user = getCurrentUser();
      const userId = user?.id ?? null;

      // لم يتغير شيء
      if (userId === prevUserRef.current) return;
      prevUserRef.current = userId;

      if (!userId) {
        // خروج → اقرأ من localStorage
        setLiked(readLocalFavorites());
        return;
      }

      // دخول → حمّل من DB
      setLoading(true);
      const guestFavs = readLocalFavorites();

      // رحّل مفضلة الضيف أولاً (إن وُجدت)
      if (guestFavs.size > 0) {
        await migrateGuestFavorites(userId, guestFavs);
      }

      const dbFavs = await fetchDBFavorites(userId);
      if (!cancelled) {
        if (dbFavs !== null) {
          setLiked(dbFavs);
        } else {
          // Supabase غير متاح — استخدم localStorage
          setLiked(guestFavs);
        }
        setLoading(false);
      }
    }

    syncWithDB();

    // استمع لتغييرات الدخول/الخروج
    const handler = () => syncWithDB();
    window.addEventListener('driverent-auth-change', handler);
    window.addEventListener('storage', handler);

    return () => {
      cancelled = true;
      window.removeEventListener('driverent-auth-change', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  // toggle مع optimistic UI
  const toggleLike = useCallback(async (carId) => {
    const id = String(carId);
    const user = getCurrentUser();
    const userId = user?.id ?? null;

    // optimistic: غيّر الـ UI فوراً
    setLiked(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      // دائماً حدّث localStorage كـ backup
      writeLocalFavorites(next);
      return next;
    });

    // زامن مع DB في الخلفية
    if (SUPABASE_READY && userId) {
      const wasLiked = liked.has(id);
      if (wasLiked) {
        await removeDBFavorite(userId, id);
      } else {
        await addDBFavorite(userId, id);
      }
    }
  }, [liked]);

  return { liked, toggleLike, loading };
}
