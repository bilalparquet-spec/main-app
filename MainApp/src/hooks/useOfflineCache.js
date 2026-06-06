/**
 * useOfflineCache — طبقة كاش محلي لـ DriveRENT
 */
import { useState, useEffect } from "react";

const PREFIX  = 'driverent_cache_';
const MAX_AGE = 30 * 60 * 1000;

function lsGet(key) {
  try { return JSON.parse(localStorage.getItem(PREFIX + key)); } catch { return null; }
}
function lsSet(key, value) {
  try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); } catch {}
}

function swCache(url, data) {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    try {
      navigator.serviceWorker.controller.postMessage({ type: 'CACHE_DATA', url, data });
    } catch {}
  }
}

// ── حالة الاتصال ─────────────────────────────────────────────────────────────
export function useOnlineStatus() {
  const [online, setOnline] = useState(() => navigator.onLine);
  useEffect(() => {
    const on  = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online',  on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online',  on);
      window.removeEventListener('offline', off);
    };
  }, []);
  return online;
}

// ── الكاش الرئيسي ────────────────────────────────────────────────────────────
export function useOfflineCache() {
  const save = (key, data, supabaseUrl) => {
    lsSet(key, { data, ts: Date.now() });
    if (supabaseUrl) swCache(supabaseUrl, data);
  };
  const get = (key) => lsGet(key)?.data ?? null;
  const isStale = (key) => {
    const entry = lsGet(key);
    if (!entry) return true;
    return Date.now() - entry.ts > MAX_AGE;
  };
  const lastUpdated = (key) => {
    const entry = lsGet(key);
    if (!entry) return null;
    return new Date(entry.ts).toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' });
  };
  return {
    saveCars:      (d, url) => save('cars',     d, url),
    getCars:       ()       => get('cars')     ?? [],
    saveAgencies:  (d, url) => save('agencies', d, url),
    getAgencies:   ()       => get('agencies') ?? [],
    saveCarsByType:(type, d, url) => save(`cars_${type}`, d, url),
    getCarsByType: (type)        => get(`cars_${type}`)  ?? [],
    isStale,
    lastUpdated,
  };
}
