import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  r: number;
  tw: number;
  sp: number;
  hue: string;
}

export default function Starfield(): React.JSX.Element {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf = 0;
    let stars: Star[] = [];
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = (): void => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const count = Math.min(320, Math.floor((window.innerWidth * window.innerHeight) / 7000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: (Math.random() * 1.4 + 0.3) * dpr,
        tw: Math.random() * Math.PI * 2,
        sp: 0.2 + Math.random() * 0.8,
        hue: Math.random() < 0.12 ? '190,220,255' : '255,255,255',
      }));
    };

    const tick = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        s.tw += 0.02 * s.sp;
        const a = 0.35 + Math.abs(Math.sin(s.tw)) * 0.65;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${s.hue},${a.toFixed(3)})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (!reduced) s.y += 0.06 * s.sp;
        if (s.y > canvas.height + 4) s.y = -4;
      }
      if (!reduced) raf = requestAnimationFrame(tick);
    };

    resize();
    if (reduced) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${s.hue},0.8)`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      raf = requestAnimationFrame(tick);
    }
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} className="starfield" aria-hidden="true" />;
}
