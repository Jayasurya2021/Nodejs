import { useEffect, useRef } from "react";

/**
 * Hook that attaches an IntersectionObserver to elements with the `reveal-item` class.
 * Elements start hidden (opacity:0, translateY:100px) and become visible when intersecting.
 * The observer disconnects after the first reveal to ensure the animation runs only once.
 */
export default function useScrollReveal() {
  const containerRef = useRef(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = node.querySelectorAll(".reveal-item");
    items.forEach((el, i) => {
      // Stagger by adding inline transition-delay based on index (0.1s per item)
      const delay = i * 0.1;
      el.style.transitionDelay = `${delay}s`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return containerRef;
}
