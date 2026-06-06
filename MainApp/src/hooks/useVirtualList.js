/**
 * useVirtualList — Virtual Scrolling لـ DriveRENT
 * يرسم فقط العناصر المرئية + buffer بدل كل القائمة دفعة واحدة
 *
 * الاستخدام:
 *   const { containerProps, items } = useVirtualList(allItems, { itemHeight: 96, buffer: 5 });
 *   <div {...containerProps}>
 *     {items.map(({ item, index, offsetTop }) => (
 *       <div key={item.id} style={{ position:'absolute', top: offsetTop, width:'100%' }}>
 *         <Row item={item} index={index} />
 *       </div>
 *     ))}
 *   </div>
 */
import { useState, useEffect, useRef, useCallback } from "react";

export function useVirtualList(allItems, {
  itemHeight = 96,   // ارتفاع كل عنصر بالـ px (ثابت)
  buffer     = 4,    // عدد العناصر الإضافية فوق وتحت نافذة الرؤية
  gap        = 10,   // المسافة بين العناصر
} = {}) {
  const containerRef   = useRef(null);
  const rowHeight      = itemHeight + gap;
  const totalHeight    = allItems.length * rowHeight - gap;

  const [range, setRange] = useState({ start: 0, end: 20 });

  const update = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    // ابحث عن أقرب ancestor قابل للتمرير
    let scrollEl = el.parentElement;
    while (scrollEl && scrollEl !== document.body) {
      const { overflowY } = getComputedStyle(scrollEl);
      if (overflowY === "auto" || overflowY === "scroll") break;
      scrollEl = scrollEl.parentElement;
    }
    const scrollTop    = scrollEl ? scrollEl.scrollTop : window.scrollY;
    const viewportH    = scrollEl ? scrollEl.clientHeight : window.innerHeight;
    const containerTop = el.getBoundingClientRect().top + (scrollEl ? scrollEl.scrollTop : window.scrollY);

    const relativeScrollTop = Math.max(0, scrollTop - containerTop);
    const start = Math.max(0, Math.floor(relativeScrollTop / rowHeight) - buffer);
    const end   = Math.min(
      allItems.length,
      Math.ceil((relativeScrollTop + viewportH) / rowHeight) + buffer
    );
    setRange(r => (r.start === start && r.end === end ? r : { start, end }));
  }, [allItems.length, rowHeight, buffer]);

  useEffect(() => {
    update();
    // استمع لـ scroll على window وكل الـ ancestors
    const handlers = [];
    const addScroll = (el) => {
      const fn = () => update();
      el.addEventListener("scroll", fn, { passive: true });
      handlers.push({ el, fn });
    };
    addScroll(window);
    let el = containerRef.current?.parentElement;
    while (el && el !== document.body) {
      const { overflowY } = getComputedStyle(el);
      if (overflowY === "auto" || overflowY === "scroll") addScroll(el);
      el = el.parentElement;
    }
    window.addEventListener("resize", update, { passive: true });
    return () => {
      handlers.forEach(({ el, fn }) => el.removeEventListener("scroll", fn));
      window.removeEventListener("resize", update);
    };
  }, [update]);

  // العناصر المرئية فقط
  const visibleItems = allItems
    .slice(range.start, range.end)
    .map((item, i) => ({
      item,
      index:     range.start + i,
      offsetTop: (range.start + i) * rowHeight,
    }));

  const containerProps = {
    ref: containerRef,
    style: {
      position: "relative",
      height:   totalHeight,
      minHeight: itemHeight,
    },
  };

  return { containerProps, items: visibleItems };
}
