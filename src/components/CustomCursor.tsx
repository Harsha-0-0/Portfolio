import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

/**
 * Spring-tracked accent dot that trails the pointer.
 *
 * Deliberately additive rather than a replacement: the native cursor stays
 * visible. The original design hid it, which removes the one affordance that
 * tells a user what is clickable and breaks text-selection feedback entirely.
 *
 * Renders only for fine pointers (never touch), and not at all when the
 * visitor has asked for reduced motion.
 */
export default function CustomCursor() {
  const reduced = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const x = useSpring(mouseX, { damping: 25, stiffness: 150, mass: 0.5 });
  const y = useSpring(mouseY, { damping: 25, stiffness: 150, mass: 0.5 });

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setFinePointer(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  const active = finePointer && !reduced;

  useEffect(() => {
    if (!active) return;
    const move = (event: MouseEvent) => {
      mouseX.set(event.clientX - 8);
      mouseY.set(event.clientY - 8);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [active, mouseX, mouseY]);

  if (!active) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden h-4 w-4 rounded-full bg-coral mix-blend-multiply md:block"
      style={{ x, y, boxShadow: '0 0 10px 3px rgb(185 76 49 / 0.4)' }}
    />
  );
}
