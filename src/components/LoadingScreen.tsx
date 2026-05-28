import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const lines = [
    'در حال راه‌اندازی سیستم‌ها...',
    'بارگذاری معماری...',
    'کالیبراسیون ماژول‌های هوش مصنوعی...',
    'بوت رابط کنترل...',
  ];
  const [lineIdx, setLineIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        const next = p + Math.random() * 18 + 4;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setDone(true), 600);
          return 100;
        }
        return next;
      });
    }, 180);

    const lineTimer = setInterval(() => {
      setLineIdx(i => Math.min(i + 1, lines.length - 1));
    }, 700);

    return () => { clearInterval(timer); clearInterval(lineTimer); };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9995] flex flex-col items-center justify-center"
          style={{ background: '#050508' }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number,number,number,number] }}
        >
          <div className="grid-bg absolute inset-0 opacity-40" />

          <motion.div
            className="relative z-10 flex flex-col items-center gap-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-xl glass-strong flex items-center justify-center gradient-border">
                <span className="font-display font-bold text-2xl gradient-text-cyan">نو</span>
              </div>
              <div
                className="absolute inset-0 rounded-xl pulse-glow"
                style={{ background: 'transparent' }}
              />
            </div>

            <div className="text-center">
              <p className="section-label mb-2">نوین وب</p>
              <h2 className="font-display text-white text-xl font-light tracking-widest">
                بارگذاری سیستم
              </h2>
            </div>

            <div className="terminal-text text-left w-72 space-y-1" style={{ direction: 'rtl', textAlign: 'right' }}>
              {lines.slice(0, lineIdx + 1).map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2"
                  style={{ direction: 'rtl' }}
                >
                  <span className="text-cyan-500">‹</span>
                  <span style={{ color: i === lineIdx ? '#22d3ee' : '#475569' }}>{line}</span>
                </motion.p>
              ))}
            </div>

            <div className="w-72 space-y-2">
              <div className="flex justify-between terminal-text text-xs" style={{ color: '#475569' }}>
                <span>پیشرفت</span>
                <span style={{ color: '#22d3ee' }}>{Math.round(progress)}%</span>
              </div>
              <div className="h-px w-full" style={{ background: '#1e1e2e' }}>
                <motion.div
                  className="h-full"
                  style={{
                    background: 'linear-gradient(90deg, #06b6d4, #0ea5e9)',
                    boxShadow: '0 0 8px rgba(6,182,212,0.6)',
                    width: `${progress}%`,
                  }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
