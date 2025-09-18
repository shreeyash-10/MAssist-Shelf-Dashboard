import { useEffect } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const useRevealAnimation = () => {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      return () => {};
    }

    const elements = document.querySelectorAll("[data-reveal]");
    if (!elements.length) return () => {};

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.dataset.revealDelay || "0";
            el.style.animationDelay = `${delay}ms`;
            el.classList.add("animate-reveal-up");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el, index) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(14px)";
      if (!el.dataset.revealDelay) {
        el.dataset.revealDelay = String(index * 80);
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [reducedMotion]);
};

export default useRevealAnimation;

