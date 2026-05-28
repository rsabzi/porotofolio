import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const experiments = [
  {
    id: 1,
    label: 'آزمایش هوش مصنوعی',
    title: 'بهینه‌ساز زنجیره پرامپت',
    desc: 'سیستم متاپرامپتینگ که زنجیره‌های پرامپت را برای قابلیت اطمینان و کارایی توکن بهینه می‌کند. بیش از ۵۰ نوع مختلف را آزمایش و بر اساس کیفیت خروجی رتبه‌بندی می‌کند.',
    status: 'فعال',
    tags: ['Python', 'OpenAI', 'ارزیابی'],
    color: '#22d3ee',
    icon: '◈',
  },
  {
    id: 2,
    label: 'اتوماسیون',
    title: 'اسکرپر خودترمیم‌شونده',
    desc: 'اسکرپر مبتنی بر Playwright که تغییرات DOM را شناسایی کرده و سلکتورهای خود را با یک LLM محلی بازنویسی می‌کند و سربار نگهداری را حذف می‌کند.',
    status: 'بتا',
    tags: ['Playwright', 'Python', 'LLM'],
    color: '#06b6d4',
    icon: '◎',
  },
  {
    id: 3,
    label: 'بینایی ماشین',
    title: 'شمارنده اشیای لحظه‌ای',
    desc: 'پایپ‌لاین تشخیص مبتنی بر YOLO که اشیاء را در جریان‌های ویدیویی ردیابی و شمارش می‌کند با مناطق قابل تنظیم و آستانه‌های هشدار.',
    status: 'تکمیل‌شده',
    tags: ['OpenCV', 'YOLO', 'Python'],
    color: '#0ea5e9',
    icon: '⬡',
  },
  {
    id: 4,
    label: 'زیرساخت',
    title: 'تصویرساز وظیفه ناهمگام',
    desc: 'داشبورد لحظه‌ای که حالت‌های ورکر Celery، عمق صف‌ها و نمودارهای تلاش مجدد وظیفه را با به‌روزرسانی زنده مبتنی بر WebSocket نمایش می‌دهد.',
    status: 'فعال',
    tags: ['Celery', 'Redis', 'WebSocket'],
    color: '#38bdf8',
    icon: '◇',
  },
  {
    id: 5,
    label: 'ابزار هوش مصنوعی',
    title: 'موتور RAG چندمنبعی',
    desc: 'سیستم تولید تقویت‌شده با بازیابی که همزمان از PDFها، صفحات وب و پایگاه‌های داده استخراج می‌کند با انتساب منبع و امتیاز اطمینان.',
    status: 'بتا',
    tags: ['LangChain', 'pgvector', 'OpenAI'],
    color: '#22d3ee',
    icon: '◈',
  },
  {
    id: 6,
    label: 'سیستم ربات',
    title: 'تجمیع‌کننده سیگنال اجتماعی',
    desc: 'ربات چندپلتفرمی که سیگنال‌ها را از ردیت، توییتر و تلگرام تجمیع می‌کند، تحلیل احساسات NLP اعمال کرده و هشدارهای قابل اقدام ارسال می‌کند.',
    status: 'تکمیل‌شده',
    tags: ['Python', 'NLP', 'Telegram'],
    color: '#06b6d4',
    icon: '◎',
  },
];

const statusColors: Record<string, string> = {
  'فعال': '#22d3ee',
  'بتا': '#f59e0b',
  'تکمیل‌شده': '#10b981',
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};
const itemAnim = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as [number,number,number,number] } },
};

export default function Lab() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="lab" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-64 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.04) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12" ref={ref}>
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div>
            <motion.p className="section-label mb-4" variants={itemAnim}>آزمایشگاه</motion.p>
            <motion.h2
              className="font-display font-bold"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
              variants={itemAnim}
            >
              <span className="gradient-text-white">تحقیقات </span>
              <span className="gradient-text-cyan">فعال</span>
            </motion.h2>
          </div>
          <motion.p
            className="text-sm max-w-xs"
            style={{ color: '#475569' }}
            variants={itemAnim}
          >
            آزمایش‌ها، ابزارها و مفاهیم سیستمی که در حال توسعه هستند.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {experiments.map((exp) => (
            <motion.div
              key={exp.id}
              variants={itemAnim}
              className="group p-5 rounded-2xl glass gradient-border transition-all duration-300 hover:box-glow-cyan"
              style={{ borderColor: 'transparent' }}
              onClick={() => setActive(active === exp.id ? null : exp.id)}
              data-cursor="hover"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{
                    background: `${exp.color}10`,
                    border: `1px solid ${exp.color}30`,
                    color: exp.color,
                  }}
                >
                  {exp.icon}
                </div>
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: statusColors[exp.status] }}
                  />
                  <span className="terminal-text" style={{ fontSize: '0.6rem', color: statusColors[exp.status] }}>
                    {exp.status}
                  </span>
                </div>
              </div>

              <p className="section-label mb-2" style={{ color: exp.color }}>{exp.label}</p>
              <h3 className="font-semibold text-sm mb-3 text-white">{exp.title}</h3>

              <AnimatePresence>
                {active === exp.id && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm leading-relaxed mb-4 overflow-hidden"
                    style={{ color: '#64748b' }}
                  >
                    {exp.desc}
                  </motion.p>
                )}
              </AnimatePresence>

              {active !== exp.id && (
                <p className="text-xs mb-4 line-clamp-2" style={{ color: '#475569' }}>{exp.desc}</p>
              )}

              <div className="flex flex-wrap gap-1.5">
                {exp.tags.map(tag => (
                  <span key={tag} className="tech-tag" style={{ fontSize: '0.62rem' }}>{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
