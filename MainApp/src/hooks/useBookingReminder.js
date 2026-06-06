/**
 * useBookingReminder — إشعار تلقائي قبل يوم من الرحلة
 *
 * يعمل بطريقتين:
 * 1. عند فتح التطبيق: يتحقق من الرحلات القادمة ويُرسل إشعاراً إذا كانت غداً
 * 2. يحفظ في localStorage الرحلات التي أُرسل لها إشعار حتى لا يتكرر
 *
 * الاستخدام في App.jsx:
 *   import { useBookingReminder } from './hooks/useBookingReminder.js';
 *   useBookingReminder(); // يعمل تلقائياً بدون أي JSX
 */
import { useEffect } from "react";
import { getBookings } from "../lib/bookings.js";
import { useNotifications } from "./useNotifications.js";

const REMINDED_KEY = "driverent_reminded_bookings";

function getReminded() {
  try { return new Set(JSON.parse(localStorage.getItem(REMINDED_KEY) || "[]")); }
  catch { return new Set(); }
}
function markReminded(id) {
  const s = getReminded();
  s.add(String(id));
  try { localStorage.setItem(REMINDED_KEY, JSON.stringify([...s])); } catch {}
}

function isTomorrow(dateStr) {
  if (!dateStr) return false;
  try {
    const tripDate = new Date(dateStr);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return (
      tripDate.getFullYear() === tomorrow.getFullYear() &&
      tripDate.getMonth()    === tomorrow.getMonth()    &&
      tripDate.getDate()     === tomorrow.getDate()
    );
  } catch { return false; }
}

function isToday(dateStr) {
  if (!dateStr) return false;
  try {
    const tripDate = new Date(dateStr);
    const today = new Date();
    return (
      tripDate.getFullYear() === today.getFullYear() &&
      tripDate.getMonth()    === today.getMonth()    &&
      tripDate.getDate()     === today.getDate()
    );
  } catch { return false; }
}

export function useBookingReminder() {
  const notif = useNotifications();

  useEffect(() => {
    // تأخير بسيط بعد فتح التطبيق
    const timer = setTimeout(async () => {
      if (notif.permission !== "granted") return;

      const bookings = getBookings();
      const reminded = getReminded();

      for (const booking of bookings) {
        const id     = String(booking.id || booking.carId);
        const status = booking.status || "pending";

        // فقط الرحلات المعتمدة أو النشطة
        if (status === "done" || status === "cancelled") continue;
        if (reminded.has(id)) continue;

        const dateFrom = booking.from || booking.dateFrom || booking.pickupDate;
        const carName  = booking.car  || booking.carName  || "السيارة";
        const agency   = booking.agencyName || booking.pickupPlace || "";

        if (isTomorrow(dateFrom)) {
          await notif.send({
            title:              "⏰ رحلتك غداً!",
            body:               `لا تنسَ رحلتك بـ ${carName}${agency ? ` من ${agency}` : ""}. تأكد من جاهزيتك.`,
            tag:                `reminder-${id}`,
            requireInteraction: true,
            vibrate:            [20, 80, 20, 80, 40],
          });
          markReminded(id);
        } else if (isToday(dateFrom)) {
          await notif.send({
            title:   "🚗 رحلتك اليوم!",
            body:    `رحلتك بـ ${carName} اليوم. استمتع برحلتك!`,
            tag:     `reminder-today-${id}`,
            vibrate: [30, 60, 30],
          });
          markReminded(id);
        }
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []); // eslint-disable-line
}
