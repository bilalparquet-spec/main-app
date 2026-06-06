/**
 * useHaptic — Haptic Feedback hook لـ DriveRENT
 *
 * يستخدم Vibration API على الأجهزة التي تدعمها (Android + بعض PWA).
 * على iOS لا تعمل Vibration API في المتصفح، لكن الكود لن يُسبب أي خطأ.
 *
 * الاستخدام:
 *   const haptic = useHaptic();
 *   haptic.light()      // نقرة خفيفة  (10ms)
 *   haptic.medium()     // نقرة متوسطة (22ms)
 *   haptic.heavy()      // نقرة قوية   (45ms)
 *   haptic.success()    // نجاح: نبضتان
 *   haptic.error()      // خطأ: ثلاث نبضات
 *   haptic.swipeBack()  // رجوع بسوايب
 *   haptic.tabSwitch()  // تغيير تاب
 *   haptic.like()       // إضافة للمفضلة
 *   haptic.notification() // إشعار جديد
 */
export function useHaptic() {
  const vib = (pattern) => {
    try { navigator.vibrate?.(pattern); } catch (_) {}
  };

  return {
    light:        () => vib(10),
    medium:       () => vib(22),
    heavy:        () => vib(45),
    success:      () => vib([12, 60, 22]),
    error:        () => vib([30, 40, 30, 40, 60]),
    swipeBack:    () => vib(12),
    tabSwitch:    () => vib(8),
    like:         () => vib([15, 50, 25]),
    notification: () => vib([20, 80, 20]),
    booking:      () => vib([20, 60, 20, 60, 40]),
  };
}
