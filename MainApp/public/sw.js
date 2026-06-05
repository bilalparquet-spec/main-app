// ══════════════════════════════════════════════════════════════════════════════
// DriveRENT Service Worker — Offline Mode الكامل
// ══════════════════════════════════════════════════════════════════════════════
// استراتيجية الكاش:
//   - Shell (HTML/JS/CSS/Icons):  Cache First ← يضمن تشغيل الـ PWA دائماً
//   - الصور:                      Cache First + Network Fallback
//   - Supabase API:               Network First + Cache Fallback (offline data)
//   - باقي الطلبات:               Network Only
// ══════════════════════════════════════════════════════════════════════════════

const VERSION      = 'driverent-v6.7.35';
const CACHE_SHELL  = `${VERSION}-shell`;   // HTML / JS / CSS / icons
const CACHE_IMAGES = `${VERSION}-images`;  // صور السيارات
const CACHE_DATA   = `${VERSION}-data`;    // ردود Supabase API

// الأصول المُسبقة للـ cache (App Shell)
const PRECACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.webmanifest',
  '/icon-72x72.png',
  '/icon-96x96.png',
  '/icon-128x128.png',
  '/icon-144x144.png',
  '/icon-152x152.png',
  '/icon-192x192.png',
  '/icon-384x384.png',
  '/icon-512x512.png',
  '/icon-maskable-192x192.png',
  '/icon-maskable-512x512.png',
];

// ── Install ──────────────────────────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_SHELL)
      .then(cache => cache.addAll(PRECACHE))
      .catch(() => null)
  );
  self.skipWaiting();
});

// ── Activate: حذف الكاش القديم ───────────────────────────────────────────────
self.addEventListener('activate', event => {
  const VALID = [CACHE_SHELL, CACHE_IMAGES, CACHE_DATA];
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => !VALID.includes(k))
          .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ── Messages ─────────────────────────────────────────────────────────────────
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();

  // تحديث يدوي للـ data cache من الـ app
  if (event.data?.type === 'CACHE_DATA') {
    const { url, data } = event.data;
    caches.open(CACHE_DATA).then(cache => {
      const res = new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json', 'X-SW-Cached': 'true', 'X-SW-Time': Date.now().toString() },
      });
      cache.put(url, res);
    });
  }
});

// ── Fetch ────────────────────────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // تجاهل غير-GET وامتدادات المتصفح
  if (request.method !== 'GET') return;
  if (url.protocol === 'chrome-extension:') return;
  if (url.protocol === 'data:') return;

  // ── 1. Supabase API → Network First + Cache Fallback ──────────────────────
  if (url.hostname.includes('supabase.co') || url.hostname.includes('supabase.in')) {
    // فقط طلبات rest (SELECT) تُخزَّن في الكاش
    if (url.pathname.startsWith('/rest/v1/')) {
      event.respondWith(networkFirstData(request));
    }
    return;
  }

  // ── 2. Navigation (HTML pages) → Shell Cache ──────────────────────────────
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(res => {
          caches.open(CACHE_SHELL).then(c => c.put('/index.html', res.clone())).catch(() => null);
          return res;
        })
        .catch(() =>
          caches.match('/index.html')
            .then(r => r || caches.match('/offline.html'))
        )
    );
    return;
  }

  // ── 3. App Shell (JS/CSS/assets) → Cache First ────────────────────────────
  if (
    ['script', 'style', 'worker'].includes(request.destination) ||
    url.pathname.startsWith('/assets/')
  ) {
    event.respondWith(cacheFirstShell(request));
    return;
  }

  // ── 4. صور → Cache First (مع timeout على الشبكة) ─────────────────────────
  if (
    request.destination === 'image' ||
    url.pathname.match(/\.(png|jpg|jpeg|webp|svg|ico|avif)$/)
  ) {
    event.respondWith(cacheFirstImage(request));
    return;
  }

  // ── 5. باقي الطلبات → Network فقط ────────────────────────────────────────
});

// ════════════════════════════════════════════════════════════════════════════
// استراتيجيات الكاش
// ════════════════════════════════════════════════════════════════════════════

// Network First مع timeout 4s + fallback للكاش
async function networkFirstData(request) {
  const cacheKey = request.url;
  try {
    const controller = new AbortController();
    const timeout    = setTimeout(() => controller.abort(), 4000);
    const response   = await fetch(request.clone(), { signal: controller.signal });
    clearTimeout(timeout);

    if (response.ok) {
      // حفظ نسخة في الكاش مع timestamp
      const clone = response.clone();
      caches.open(CACHE_DATA).then(cache => {
        const res = new Response(clone.body, {
          status: clone.status,
          headers: {
            ...Object.fromEntries(clone.headers.entries()),
            'X-SW-Cached': 'true',
            'X-SW-Time':   Date.now().toString(),
          },
        });
        cache.put(cacheKey, res);
      }).catch(() => null);
    }
    return response;
  } catch {
    // الشبكة فاشلة → رجوع للكاش
    const cached = await caches.match(cacheKey, { cacheName: CACHE_DATA });
    if (cached) return cached;
    // لا كاش → رد فارغ بدل خطأ
    return new Response('[]', {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'X-SW-Offline': 'true' },
    });
  }
}

// Cache First للـ Shell (JS/CSS)
async function cacheFirstShell(request) {
  const cached = await caches.match(request, { cacheName: CACHE_SHELL });
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      caches.open(CACHE_SHELL).then(c => c.put(request, response.clone())).catch(() => null);
    }
    return response;
  } catch {
    return Response.error();
  }
}

// Cache First للصور مع placeholder عند الفشل
async function cacheFirstImage(request) {
  const cached = await caches.match(request, { cacheName: CACHE_IMAGES });
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok && response.status === 200) {
      caches.open(CACHE_IMAGES).then(c => c.put(request, response.clone())).catch(() => null);
    }
    return response;
  } catch {
    // إرجاع الأيقونة كـ placeholder للصور الفاشلة
    const fallback = await caches.match('/icon-192x192.png', { cacheName: CACHE_SHELL });
    return fallback || Response.error();
  }
}
