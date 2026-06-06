/**
 * optimizeImageUrl — ضغط صور Supabase Storage تلقائياً بـ WebP
 *
 * Supabase Storage يدعم تحويل الصور عبر query parameters:
 * ?width=400&quality=75&format=origin
 *
 * الاستخدام:
 *   import { optimizeImg } from '../../lib/imageOptimizer.js';
 *   <img src={optimizeImg(car.img, { width: 400 })} />
 *
 * SmartImage تستخدمه تلقائياً.
 */

const SUPABASE_STORAGE = "/storage/v1/object/public/";

/**
 * @param {string} url - رابط الصورة الأصلي
 * @param {{ width?: number, height?: number, quality?: number }} opts
 * @returns {string} رابط محسّن
 */
export function optimizeImg(url, { width = 400, height, quality = 78 } = {}) {
  if (!url || typeof url !== "string") return url;

  // فقط صور Supabase Storage
  if (!url.includes(SUPABASE_STORAGE) && !url.includes("supabase.co/storage")) {
    return url;
  }

  // لا تُضف params إذا كانت موجودة
  if (url.includes("?width=") || url.includes("&width=")) return url;

  try {
    const u = new URL(url);
    // Supabase Image Transformation API
    u.searchParams.set("width",   String(width));
    u.searchParams.set("quality", String(quality));
    if (height) u.searchParams.set("height", String(height));
    // format=origin يُبقي على الجودة مع ضغط أفضل
    u.searchParams.set("resize",  "contain");
    return u.toString();
  } catch {
    return url;
  }
}

/**
 * أحجام جاهزة للاستخدام
 */
export const imgSizes = {
  thumbnail: (url) => optimizeImg(url, { width: 200, quality: 70 }),
  card:      (url) => optimizeImg(url, { width: 400, quality: 78 }),
  detail:    (url) => optimizeImg(url, { width: 800, quality: 85 }),
  avatar:    (url) => optimizeImg(url, { width: 120, quality: 80 }),
  agency:    (url) => optimizeImg(url, { width: 320, quality: 78 }),
};
