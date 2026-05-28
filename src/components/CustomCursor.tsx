import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, [data-cursor="hover"]')) setIsHovering(true);
    };
    const onLeave = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, [data-cursor="hover"]')) setIsHovering(false);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
        style={{
          width: isHovering ? 8 : 6,
          height: isHovering ? 8 : 6,
          borderRadius: '50%',
          background: '#06b6d4',
          transition: 'width 0.2s, height 0.2s',
          boxShadow: '0 0 8px rgba(6,182,212,0.8)',
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
        style={{
          width: isHovering ? 44 : 32,
          height: isHovering ? 44 : 32,
          borderRadius: '50%',
          border: `1px solid ${isHovering ? 'rgba(6,182,212,0.8)' : 'rgba(6,182,212,0.35)'}`,
          transition: 'width 0.3s, height 0.3s, border-color 0.3s',
          background: isHovering ? 'rgba(6,182,212,0.07)' : 'transparent',
        }}
      />
    </>
  );
}
