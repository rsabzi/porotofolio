import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ClipboardCheck, Compass, Rocket, TestTube2 } from 'lucide-react';

const steps = [
  {
    icon: Compass,
    title: 'کشف هدف و پیشنهاد ارزش',
    desc: 'اول مخاطب، درد اصلی، مزیت رقابتی و مسیر تبدیل بازدیدکننده به مشتری را مشخص می‌کنیم.',
    deliverable: 'استراتژی صفحه، پیام اصلی، CTA و ساختار قیف فروش',
  },
  {
    icon: ClipboardCheck,
    title: 'طراحی UX و معماری محتوا',
    desc: 'متن‌ها، بخش‌ها و مسیر حرکت کاربر طوری چیده می‌شود که اعتماد بسازد و تصمیم خرید را ساده کند.',
    deliverable: 'وایرفریم، متن فروش، سناریوی تعامل و طراحی ریسپانسیو',
  },
  {
    icon: TestTube2,
    title: 'توسعه تمیز و تست‌شده',
    desc: 'کدنویسی با کامپوننت‌های قابل نگهداری، انیمیشن کنترل‌شده، SEO پایه و توجه جدی به سرعت و دسترس‌پذیری.',
    deliverable: 'نسخه قابل اجرا، تست فنی، بهینه‌سازی موبایل و مرورگرها',
  },
  {
    icon: Rocket,
    title: 'لانچ، اندازه‌گیری و بهبود',
    desc: 'بعد از تحویل، معیارهای واقعی مثل نرخ تماس، کلیک CTA و کیفیت لیدها را بررسی و بهبود می‌دهیم.',
    deliverable: 'چک‌لیست انتشار، مستندات، پیشنهادهای رشد و پشتیبانی',
  },
];

const promises = [
  'متن‌های فارسی روان و قابل اعتماد، بدون شعارهای مصنوعی',
  'طراحی موبایل‌فرست برای کاربری سریع و واضح',
  'تمرکز روی جذب لید، نه فقط ظاهر چشمگیر',
  'تحویل مرحله‌ای با گزارش شفاف و قابل پیگیری',
];

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] } },
};

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="process" className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(6,182,212,0.025) 48%, transparent 100%)' }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12" ref={ref}>
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p className="section-label mb-4" variants={item}>فرآیند همکاری</motion.p>
          <motion.h2
            className="font-display font-bold mb-5"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', lineHeight: 1.15 }}
            variants={item}
          >
            <span className="gradient-text-white">مسیر روشن از ایده تا </span>
            <span className="gradient-text-cyan glow-cyan">نتیجه قابل اندازه‌گیری</span>
          </motion.h2>
          <motion.p className="text-base leading-8" style={{ color: '#94a3b8' }} variants={item}>
            پروژه حرفه‌ای با سلیقه شروع نمی‌شود؛ با تشخیص درست، اولویت‌بندی و اجرای مرحله‌ای جلو می‌رود.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
          <div className="grid md:grid-cols-2 gap-5">
            {steps.map((step, index) => (
              <motion.article
                key={step.title}
                className="p-6 rounded-2xl glass gradient-border relative overflow-hidden"
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <span className="absolute top-5 left-6 terminal-text" style={{ color: '#1e7490' }}>0{index + 1}</span>
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.22)' }}
                >
                  <step.icon size={20} style={{ color: '#38bdf8' }} />
                </div>
                <h3 className="font-display font-semibold text-lg text-white mb-3">{step.title}</h3>
                <p className="text-sm leading-7 mb-5" style={{ color: '#94a3b8' }}>{step.desc}</p>
                <p className="text-xs leading-6" style={{ color: '#22d3ee' }}>خروجی: {step.deliverable}</p>
              </motion.article>
            ))}
          </div>

          <motion.aside
            className="p-7 rounded-3xl glass-strong gradient-border sticky top-24"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
          >
            <p className="section-label mb-4">تعهد اجرایی</p>
            <h3 className="font-display font-bold text-2xl text-white mb-5">چیزی که تحویل می‌گیرید، قابل استفاده و قابل فروش است.</h3>
            <div className="space-y-4">
              {promises.map(promise => (
                <div key={promise} className="flex gap-3 items-start">
                  <span className="mt-2 w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#22d3ee', boxShadow: '0 0 10px rgba(34,211,238,0.7)' }} />
                  <p className="text-sm leading-7" style={{ color: '#94a3b8' }}>{promise}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full mt-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)', color: '#050508' }}
            >
              شروع مشاوره پروژه
            </button>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
