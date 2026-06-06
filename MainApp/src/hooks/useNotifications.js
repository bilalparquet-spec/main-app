/**
 * useNotifications — Push Notifications hook لـ DriveRENT
 *
 * يطلب إذن الإشعارات ويرسلها عبر Notification API (PWA).
 * يعمل كـ local push notifications داخل PWA بدون سيرفر خارجي.
 *
 * الاستخدام:
 *   const notif = useNotifications();
 *   await notif.requestPermission();
 *   notif.send({ title: "حجز جديد!", body: "تم تأكيد حجزك" });
 *
 * ملاحظة: تعمل فقط بعد تثبيت التطبيق كـ PWA أو في المتصفح مع الإذن.
 */
import { useState, useCallback } from "react";

const ICON = "/icon-192x192.png";
const BADGE = "/icon-72x72.png";

export function useNotifications() {
  const [permission, setPermission] = useState(
    () => (typeof Notification !== "undefined" ? Notification.permission : "default")
  );

  const isSupported = typeof Notification !== "undefined";

  // ── طلب إذن الإشعارات ──────────────────────────────────────────────────
  const requestPermission = useCallback(async () => {
    if (!isSupported) return "denied";
    if (permission === "granted") return "granted";
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    } catch {
      return "denied";
    }
  }, [permission, isSupported]);

  // ── إرسال إشعار ────────────────────────────────────────────────────────
  const send = useCallback(async ({
    title = "Rent&درايف",
    body = "",
    icon = ICON,
    badge = BADGE,
    tag,
    data,
    silent = false,
    vibrate = [20, 80, 20],
    requireInteraction = false,
  } = {}) => {
    if (!isSupported) return null;

    let perm = permission;
    if (perm !== "granted") {
      perm = await requestPermission();
    }
    if (perm !== "granted") return null;

    try {
      // ── استخدم Service Worker إذا متاح (أفضل لـ PWA) ──
      if ("serviceWorker" in navigator) {
        const reg = await navigator.serviceWorker.getRegistration();
        if (reg) {
          await reg.showNotification(title, {
            body, icon, badge, tag, data,
            silent, vibrate, requireInteraction,
            dir: "rtl",
            lang: "ar",
          });
          return true;
        }
      }
      // ── fallback: Notification عادي ──
      const n = new Notification(title, { body, icon, tag, data, silent, dir: "rtl" });
      n.onclick = () => { window.focus(); n.close(); };
      return n;
    } catch (err) {
      console.warn("Notification error:", err);
      return null;
    }
  }, [permission, requestPermission, isSupported]);

  // ── إشعارات جاهزة لـ DriveRENT ────────────────────────────────────────
  const notifyBookingConfirmed = (carName) =>
    send({
      title: "✅ تم تأكيد الحجز",
      body: `تم تأكيد حجزك لسيارة ${carName}. تحقق من رحلاتك.`,
      tag: "booking-confirmed",
      requireInteraction: true,
    });

  const notifyNewMessage = (senderName) =>
    send({
      title: "💬 رسالة جديدة",
      body: `${senderName} أرسل لك رسالة جديدة`,
      tag: "new-message",
    });

  const notifyBookingReminder = (carName, date) =>
    send({
      title: "⏰ تذكير بالرحلة",
      body: `رحلتك بسيارة ${carName} بعد غد ${date}`,
      tag: "booking-reminder",
    });

  const notifyWelcome = () =>
    send({
      title: "🚗 أهلاً في Rent&درايف",
      body: "ابحث عن أفضل السيارات في ولايتك الآن!",
      tag: "welcome",
      requireInteraction: false,
    });

  return {
    permission,
    isSupported,
    requestPermission,
    send,
    // إشعارات جاهزة
    notifyBookingConfirmed,
    notifyNewMessage,
    notifyBookingReminder,
    notifyWelcome,
  };
}
