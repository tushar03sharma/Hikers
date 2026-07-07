import { useEffect, useRef, useState } from 'react';

/**
 * Hook: animates a number from 0 to `end` when `trigger` becomes true.
 * 
 * @param {number} end - target number
 * @param {number} duration - animation duration in ms
 * @param {boolean} trigger - start animation when true
 */
export function useCountUp(end, duration = 2000, trigger = true) {
  const [count, setCount] = useState(0);
  const startRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;

    startRef.current = performance.now();

    const animate = (now) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [end, duration, trigger]);

  return count;
}
