import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const principles = [
  {
    icon: '⬡',
    title: 'تفکر سیستمی',
    desc: 'هر راه‌حل از معماری آغاز می‌شود. وابستگی‌ها، حالات شکست و مسیرهای مقیاس‌پذیری را قبل از نوشتن حتی یک خط کد ترسیم می‌کنم.',
  },
  {
    icon: '⬡',
    title: 'اتوماسیون در اولویت',
    desc: 'اگر چیزی بیش از دو بار اجرا می‌شود، باید خودش اجرا شود. سیستم‌هایی می‌سازم که خودکار عمل می‌کنند، نظارت و بازیابی می‌شوند.',
  },
  {
    icon: '⬡',
    title: 'لایه هوشمندی',
    desc: 'تعبیه هوش مصنوعی در سطح زیرساخت — نه به عنوان یک ویژگی، بلکه به عنوان جزء اصلی نحوه تصمیم‌گیری سیستم‌ها.',
  },
  {
    icon: '⬡',
    title: 'مهندسی دقیق',
    desc: 'وضوح بر هوشمندی. قراردادهای تمیز، رفتار قابل مشاهده و سادگی بی‌رحمانه در هر مؤلفه.',
  },
];

const timeline = [
  { year: '۲۰۱۹', title: 'پایتون و بک‌اند', desc: 'تسلط بر سیستم‌های ناهمگام، معماری REST و پایپ‌لاین‌های داده.' },
  { year: '۲۰۲۰', title: 'مهندسی ربات', desc: 'ساخت اولین ربات‌های اتوماسیون پروداکشن با پردازش ۱۰هزار+ رویداد در روز.' },
  { year: '۲۰۲۱', title: 'یکپارچه‌سازی هوش مصنوعی', desc: 'یکپارچه‌سازی مدل‌های بینایی ماشین و NLP در پایپ‌لاین‌های پردازش لحظه‌ای.' },
  { year: '۲۰۲۲', title: 'معماری سیستم', desc: 'طراحی فریمورک‌های هماهنگی توزیع‌شده و معماری میکروسرویس.' },
  { year: '۲۰۲۳', title: 'اتوماسیون هوش مصنوعی', desc: 'ساخت عامل‌های مبتنی بر LLM، پایپ‌لاین‌های پرامپت انجینیرینگ و ابزارها.' },
  { year: '۲۰۲۴', title: 'نوین وب', desc: 'راه‌اندازی برند. تحویل سیستم‌های هوشمند برای مشتریان جهانی.' },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as [number,number,number,number] } },
};

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div
        className="absolute right-0 top-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12" ref={ref}>
        <motion.div
          className="max-w-3xl mb-20"
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p className="section-label mb-4" variants={item}>درباره من</motion.p>
          <motion.h2
            className="font-display font-bold mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.15 }}
            variants={item}
          >
            <span className="gradient-text-white">فقط یک برنامه‌نویس نیستم.</span>
            <br />
            <span className="gradient-text-cyan">یک معمار سیستم هستم.</span>
          </motion.h2>
          <motion.p
            className="text-lg leading-relaxed"
            style={{ color: '#64748b', maxWidth: '600px' }}
            variants={item}
          >
            سیستم‌هایی می‌سازم که فکر می‌کنند، انطباق می‌یابند و مقیاس‌پذیر هستند.
            کار من در تقاطع مهندسی بک‌اند، هوش مصنوعی و معماری اتوماسیون قرار دارد —
            جایی که پیچیدگی واقعی با راه‌حل‌های واقعی روبرو می‌شود.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.p className="section-label mb-8" variants={item}>فلسفه مهندسی</motion.p>
            <div className="space-y-4">
              {principles.map((p) => (
                <motion.div
                  key={p.title}
                  variants={item}
                  className="group p-5 rounded-xl glass gradient-border transition-all duration-300 hover:box-glow-cyan"
                  style={{ borderColor: 'transparent' }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-xs"
                      style={{
                        background: 'rgba(6,182,212,0.1)',
                        border: '1px solid rgba(6,182,212,0.2)',
                        color: '#22d3ee',
                      }}
                    >
                      {p.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1 text-white">{p.title}</h4>
                      <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{p.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.p className="section-label mb-8" variants={item}>مسیر حرفه‌ای</motion.p>
            <div className="relative">
              <div
                className="absolute left-[11px] top-0 bottom-0 w-px"
                style={{ background: 'linear-gradient(to bottom, rgba(6,182,212,0.4), transparent)' }}
              />
              <div className="space-y-6">
                {timeline.map((t, i) => (
                  <motion.div key={i} variants={item} className="flex gap-6 pl-8 relative">
                    <div
                      className="absolute left-0 top-1.5 w-[23px] h-[23px] rounded-full flex items-center justify-center"
                      style={{
                        background: i === timeline.length - 1 ? 'rgba(6,182,212,0.2)' : 'rgba(13,13,20,1)',
                        border: `1px solid ${i === timeline.length - 1 ? '#06b6d4' : '#2a2a3e'}`,
                      }}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: i === timeline.length - 1 ? '#06b6d4' : '#2a2a3e' }}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="terminal-text" style={{ fontSize: '0.7rem', color: '#22d3ee' }}>{t.year}</span>
                        <h4 className="font-semibold text-sm text-white">{t.title}</h4>
                      </div>
                      <p className="text-sm" style={{ color: '#475569' }}>{t.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
