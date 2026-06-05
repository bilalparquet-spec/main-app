/**
 * useDebounce — تأخير تحديث قيمة لـ DriveRENT
 *
 * الاستخدام:
 *   const debouncedSearch = useDebounce(searchText, 300);
 *   // استخدم debouncedSearch في الـ filter بدل searchText
 */
import { useState, useEffect } from "react";

export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
}
