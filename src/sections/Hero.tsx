import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ParticleCanvas from '../components/ParticleCanvas';

const TYPING_PHRASES = [
  'سیستم‌های اتوماسیون هوشمند',
  'زیرساخت مبتنی بر هوش مصنوعی',
  'معماری ربات مقیاس‌پذیر',
  'موتورهای هماهنگی ناهمگام',
];

function useTypewriter(phrases: string[]) {
  const [text, setText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === phrase) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && text === '') {
      setDeleting(false);
      setPhraseIdx(i => (i + 1) % phrases.length);
    } else {
      timeout = setTimeout(() => {
        setText(deleting ? phrase.slice(0, text.length - 1) : phrase.slice(0, text.length + 1));
      }, deleting ? 38 : 68);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, phraseIdx, phrases]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter(TYPING_PHRASES);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-60" />
      <ParticleCanvas />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="absolute top-8 left-8 w-12 h-12 pointer-events-none hidden md:block">
        <div className="absolute top-0 left-0 w-4 h-4" style={{ borderTop: '1px solid rgba(6,182,212,0.5)', borderLeft: '1px solid rgba(6,182,212,0.5)' }} />
        <div className="absolute bottom-0 right-0 w-4 h-4" style={{ borderBottom: '1px solid rgba(6,182,212,0.5)', borderRight: '1px solid rgba(6,182,212,0.5)' }} />
      </div>
      <div className="absolute top-8 right-8 w-12 h-12 pointer-events-none hidden md:block">
        <div className="absolute top-0 right-0 w-4 h-4" style={{ borderTop: '1px solid rgba(6,182,212,0.5)', borderRight: '1px solid rgba(6,182,212,0.5)' }} />
        <div className="absolute bottom-0 left-0 w-4 h-4" style={{ borderBottom: '1px solid rgba(6,182,212,0.5)', borderLeft: '1px solid rgba(6,182,212,0.5)' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full glass"
          style={{ border: '1px solid rgba(6,182,212,0.2)' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span
            className="w-2 h-2 rounded-full pulse-glow"
            style={{ background: '#22d3ee', boxShadow: '0 0 6px #06b6d4' }}
          />
          <span className="terminal-text" style={{ fontSize: '0.72rem', letterSpacing: '0.12em' }}>
            آماده همکاری
          </span>
        </motion.div>

        <motion.p
          className="section-label mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          رضا سبزی — نوین وب
        </motion.p>

        <motion.h1
          className="font-display font-bold leading-none mb-4"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 6.5rem)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.23, 1, 0.32, 1] as [number,number,number,number] }}
        >
          <span className="gradient-text-white">معماری</span>
        </motion.h1>

        <motion.div
          className="mb-8"
          style={{ minHeight: 'clamp(3rem, 7vw, 6.5rem)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <h2
            className="font-display font-bold gradient-text-cyan glow-cyan leading-none"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 5.5rem)' }}
          >
            {typed}
            <span className="cursor-blink" style={{ color: '#06b6d4' }}>_</span>
          </h2>
        </motion.div>

        <motion.p
          className="text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ color: '#64748b', fontSize: 'clamp(0.95rem, 2vw, 1.15rem)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          من کد نمی‌نویسم — سیستم‌های هوشمند مهندسی می‌کنم. از ربات‌های مستقل تا هماهنگی مبتنی بر هوش مصنوعی،
          زیرساختی می‌سازم که فکر می‌کند، مقیاس‌پذیر است و انطباق‌پذیر.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
              color: '#050508',
              boxShadow: '0 0 30px rgba(6,182,212,0.3)',
            }}
          >
            مشاهده پروژه‌ها
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 glass gradient-border"
            style={{ color: '#22d3ee' }}
          >
            تماس با من
          </button>
          <button
            onClick={() => document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105"
            style={{ color: '#475569', border: '1px solid #1e1e2e' }}
          >
            کاوش در سیستم‌ها ←
          </button>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-10 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.1 }}
        >
          {[
            { value: '۵۰+', label: 'سیستم ساخته‌شده' },
            { value: '۱۲+', label: 'ابزار هوش مصنوعی' },
            { value: '۵سال', label: 'مهندسی' },
            { value: '۹۹%', label: 'هدف آپتایم' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-bold text-2xl gradient-text-cyan">{stat.value}</div>
              <div className="terminal-text mt-1" style={{ fontSize: '0.68rem', color: '#475569', letterSpacing: '0.1em' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={scrollDown}
      >
        <span className="terminal-text" style={{ fontSize: '0.62rem', letterSpacing: '0.18em', color: '#334155' }}>
          اسکرول
        </span>
        <div
          className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: '1px solid #1e1e2e' }}
        >
          <motion.div
            className="w-1 h-1.5 rounded-full"
            style={{ background: '#06b6d4' }}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
