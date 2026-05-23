import { useState, useEffect } from "react";

export function useIsMobile(bp = 480) {
  const [is, setIs] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= bp
  );
  useEffect(() => {
    const fn = () => setIs(window.innerWidth <= bp);
    window.addEventListener("resize", fn, { passive: true });
    return () => window.removeEventListener("resize", fn);
  }, [bp]);
  return is;
}

export function useIsTablet(bp = 768) {
  const [is, setIs] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= bp
  );
  useEffect(() => {
    const fn = () => setIs(window.innerWidth <= bp);
    window.addEventListener("resize", fn, { passive: true });
    return () => window.removeEventListener("resize", fn);
  }, [bp]);
  return is;
}
