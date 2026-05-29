import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Bot, BrainCircuit, Code2, LineChart, ShieldCheck, Zap } from 'lucide-react';

const services = [
  {
    icon: BrainCircuit,
    title: 'طراحی محصول هوشمند با AI',
    desc: 'ایده مبهم شما را به نقشه محصول، تجربه کاربری، معماری فنی و نسخه MVP قابل ارائه تبدیل می‌کنم.',
    outcome: 'برای استارتاپ‌ها و تیم‌هایی که می‌خواهند سریع، درست و قابل توسعه وارد بازار شوند.',
  },
  {
    icon: Bot,
    title: 'اتوماسیون فرایند و ربات اختصاصی',
    desc: 'کارهای تکراری، گزارش‌گیری، پاسخ‌گویی، جمع‌آوری داده و عملیات داخلی را به سیستم‌های خودکار مطمئن تبدیل می‌کنم.',
    outcome: 'کاهش خطای انسانی، صرفه‌جویی زمان تیم و اجرای ۲۴/۷ بدون وابستگی به نیروی دستی.',
  },
  {
    icon: Code2,
    title: 'وب‌اپلیکیشن و بک‌اند مقیاس‌پذیر',
    desc: 'پنل، داشبورد، API و زیرساختی می‌سازم که فقط زیبا نیست؛ امن، قابل مانیتور و آماده رشد است.',
    outcome: 'مناسب کسب‌وکارهایی که یک سایت نمایشی نمی‌خواهند؛ یک دارایی دیجیتال سودآور می‌خواهند.',
  },
  {
    icon: LineChart,
    title: 'داشبورد داده و گزارش مدیریتی',
    desc: 'داده‌های پراکنده را به تصویر روشن از فروش، عملیات، مشتریان و عملکرد تیم تبدیل می‌کنم.',
    outcome: 'تصمیم‌گیری سریع‌تر، گزارش‌های زنده و حذف اکسل‌های تکراری و پرخطا.',
  },
  {
    icon: ShieldCheck,
    title: 'بازطراحی فنی و بهینه‌سازی سیستم',
    desc: 'کدهای کند، شکننده یا غیرقابل توسعه را تحلیل و به معماری تمیز، سریع و قابل نگهداری تبدیل می‌کنم.',
    outcome: 'کاهش هزینه نگهداری، افزایش سرعت توسعه و آماده‌سازی برای رشد واقعی.',
  },
  {
    icon: Zap,
    title: 'لانچ سریع MVP',
    desc: 'در چند اسپرینت کوتاه، نسخه‌ای قابل تست با مشتری واقعی می‌سازم؛ نه یک نمونه نمایشی بی‌فایده.',
    outcome: 'اعتبارسنجی بازار، جذب سرمایه/مشتری و مسیر روشن برای نسخه‌های بعدی.',
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] } },
};

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div
        className="absolute -right-32 top-24 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 68%)' }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12" ref={ref}>
        <motion.div
          className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-end mb-14"
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div>
            <motion.p className="section-label mb-4" variants={item}>خدمات قابل سفارش</motion.p>
            <motion.h2
              className="font-display font-bold mb-5"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', lineHeight: 1.15 }}
              variants={item}
            >
              <span className="gradient-text-white">راه‌حل می‌سازم؛ </span>
              <span className="gradient-text-cyan glow-cyan">نه فقط صفحه وب.</span>
            </motion.h2>
          </div>
          <motion.p className="text-base leading-8" style={{ color: '#94a3b8' }} variants={item}>
            اگر هدف شما جذب مشتری، اتوماسیون، فروش بیشتر یا ساخت محصول دیجیتال است، هر پروژه با یک سؤال شروع می‌شود:
            «این سیستم دقیقاً باید چه نتیجه‌ای برای کسب‌وکار بسازد؟» بعد از آن طراحی، متن، UI/UX و کدنویسی همگی در خدمت همان نتیجه قرار می‌گیرند.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-5"
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {services.map(service => (
            <motion.article
              key={service.title}
              variants={item}
              className="group p-6 rounded-2xl glass gradient-border hover:box-glow-cyan transition-all duration-500 h-full"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:-translate-y-1"
                style={{ background: 'rgba(6,182,212,0.09)', border: '1px solid rgba(6,182,212,0.25)' }}
              >
                <service.icon size={22} style={{ color: '#22d3ee' }} />
              </div>
              <h3 className="font-display font-semibold text-xl text-white mb-3">{service.title}</h3>
              <p className="text-sm leading-7 mb-5" style={{ color: '#94a3b8' }}>{service.desc}</p>
              <div className="pt-4 border-t" style={{ borderColor: 'rgba(30,30,46,0.9)' }}>
                <p className="text-xs leading-6" style={{ color: '#22d3ee' }}>{service.outcome}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
