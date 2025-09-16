import { useEffect, useState } from "react";

export function usePrefersDark() {
  const [prefers, setPrefers] = useState(() =>
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event) => setPrefers(event.matches);
    media.addEventListener?.("change", onChange);
    return () => media.removeEventListener?.("change", onChange);
  }, []);

  return prefers;
}