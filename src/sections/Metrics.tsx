import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const metrics = [
  { value: 50, suffix: '+', label: 'سیستم ساخته‌شده', desc: 'سیستم‌های اتوماسیون در سطح پروداکشن' },
  { value: 12, suffix: '+', label: 'ابزار هوش مصنوعی', desc: 'ابزارها و عامل‌های مبتنی بر LLM' },
  { value: 99, suffix: '.9%', label: 'نرخ آپتایم', desc: 'در استقرارهای تحت نظارت' },
  { value: 5, suffix: 'سال', label: 'مهندسی', desc: 'تجربه سیستم‌های حرفه‌ای' },
  { value: 200, suffix: 'k+', label: 'رویداد/روز', desc: 'توان عملیاتی اوج سیستم ناهمگام' },
  { value: 30, suffix: '+', label: 'مشتری', desc: 'پروژه‌های تحویل‌شده جهانی' },
];

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <span className="font-display font-bold gradient-text-cyan" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
      {count}{suffix}
    </span>
  );
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemAnim = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as [number,number,number,number] } },
};

export default function Metrics() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="metrics" className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(6,182,212,0.02) 50%, transparent 100%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12" ref={ref}>
        <motion.div
          className="text-center mb-16"
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p className="section-label mb-4" variants={itemAnim}>اثبات کار</motion.p>
          <motion.h2
            className="font-display font-bold"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
            variants={itemAnim}
          >
            <span className="gradient-text-white">معیارهای </span>
            <span className="gradient-text-cyan">سیستم</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              className="p-6 rounded-2xl glass gradient-border text-center group hover:box-glow-cyan transition-all duration-500"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <AnimatedCounter value={m.value} suffix={m.suffix} inView={inView} />
              <p className="font-semibold text-sm mt-2 text-white">{m.label}</p>
              <p className="text-xs mt-1" style={{ color: '#475569' }}>{m.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p className="section-label mb-8 text-center" variants={itemAnim}>
            نمای کلی معماری سیستم
          </motion.p>
          <motion.div
            variants={itemAnim}
            className="p-8 rounded-2xl glass gradient-border relative overflow-hidden"
            style={{ minHeight: 200 }}
          >
            <svg viewBox="0 0 100 80" className="w-full" style={{ maxHeight: 220 }}>
              <line x1="20" y1="40" x2="32" y2="22" stroke="rgba(6,182,212,0.3)" strokeWidth="0.5" strokeDasharray="2,2" />
              <line x1="20" y1="40" x2="32" y2="62" stroke="rgba(6,182,212,0.3)" strokeWidth="0.5" strokeDasharray="2,2" />
              <line x1="42" y1="22" x2="55" y2="40" stroke="rgba(6,182,212,0.4)" strokeWidth="0.5" />
              <line x1="42" y1="62" x2="55" y2="40" stroke="rgba(14,165,233,0.4)" strokeWidth="0.5" />
              <line x1="65" y1="40" x2="78" y2="40" stroke="rgba(6,182,212,0.5)" strokeWidth="0.5" />

              <rect x="5" y="35" width="14" height="10" rx="2" fill="rgba(71,85,105,0.3)" stroke="rgba(71,85,105,0.6)" strokeWidth="0.5" />
              <text x="12" y="41.5" textAnchor="middle" fontSize="3" fill="#94a3b8">ورودی</text>

              <rect x="32" y="16" width="12" height="12" rx="2" fill="rgba(6,182,212,0.1)" stroke="rgba(6,182,212,0.5)" strokeWidth="0.5" />
              <text x="38" y="23.5" textAnchor="middle" fontSize="2.8" fill="#06b6d4">صف</text>

              <rect x="32" y="56" width="12" height="12" rx="2" fill="rgba(14,165,233,0.1)" stroke="rgba(14,165,233,0.4)" strokeWidth="0.5" />
              <text x="38" y="63.5" textAnchor="middle" fontSize="2.6" fill="#0ea5e9">پردازنده</text>

              <rect x="50" y="33" width="16" height="14" rx="2" fill="rgba(34,211,238,0.12)" stroke="rgba(34,211,238,0.7)" strokeWidth="0.7" />
              <text x="58" y="40.5" textAnchor="middle" fontSize="3" fill="#22d3ee" fontWeight="bold">موتور AI</text>

              <rect x="78" y="35" width="14" height="10" rx="2" fill="rgba(56,189,248,0.1)" stroke="rgba(56,189,248,0.4)" strokeWidth="0.5" />
              <text x="85" y="41.5" textAnchor="middle" fontSize="3" fill="#38bdf8">خروجی</text>

              <circle cx="58" cy="40" r="12" fill="none" stroke="rgba(34,211,238,0.1)" strokeWidth="1" strokeDasharray="3,2" />
            </svg>

            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {['رویداد‌محور', 'پردازش ناهمگام', 'تقویت‌شده با AI', 'خودنظارتی', 'تحمل‌پذیر در برابر خطا'].map(tag => (
                <span key={tag} className="tech-tag">{tag}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
