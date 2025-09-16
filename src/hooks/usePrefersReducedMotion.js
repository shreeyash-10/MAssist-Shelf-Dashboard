import { useEffect, useState } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event) => setReduced(event.matches);
    media.addEventListener?.("change", onChange);
    return () => media.removeEventListener?.("change", onChange);
  }, []);

  return reduced;
}