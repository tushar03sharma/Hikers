import { useEffect, useRef, useState } from 'react';

/**
 * Hook: returns a ref to attach to an element and a boolean
 * `inView` that becomes true once the element enters the viewport.
 * 
 * @param {Object} options
 * @param {number} options.threshold - 0–1, how much of element must be visible
 * @param {string} options.rootMargin - IntersectionObserver rootMargin
 * @param {boolean} options.once - if true, stops observing after first trigger
 */
export function useInView({ threshold = 0.15, rootMargin = '0px', once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}
