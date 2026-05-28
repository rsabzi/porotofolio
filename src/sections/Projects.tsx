import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: 1,
    label: 'اتوماسیون هوش مصنوعی',
    title: 'هماهنگ‌کننده پیام هوشمند',
    tagline: 'موتور پیام‌رسانی ناهمگام چندکاناله با مسیریابی هوش مصنوعی',
    description:
      'سیستم هماهنگی پیام با توان عملیاتی بالا که بیش از ۵۰ هزار پیام در روز در تلگرام، دیسکورد و وب‌هوک‌های سفارشی پردازش می‌کند. ساخته‌شده با پایتون ناهمگام، صف‌های RabbitMQ و یک لایه LLM برای طبقه‌بندی و مسیریابی هوشمند پیام‌ها.',
    challenge: 'مدیریت انفجارهای غیرقابل پیش‌بینی پیام بدون از دست رفتن داده و اعمال منطق مسیریابی مبتنی بر هوش مصنوعی در کمتر از ۲۰۰ میلی‌ثانیه.',
    solution: 'ساخت استخر مصرف‌کننده با آگاهی از فشار برگشتی، صف‌های حرف مرده، شکننده‌های مداری و کش LLM محلی.',
    stack: ['Python', 'asyncio', 'RabbitMQ', 'FastAPI', 'Redis', 'OpenAI API', 'PostgreSQL'],
    metrics: ['۵۰هزار+ پیام/روز', '۹۹.۹۷% آپتایم', '<۲۰۰ms تأخیر', '۱۲ کانال'],
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
    color: '#06b6d4',
  },
  {
    id: 2,
    label: 'بینایی ماشین',
    title: 'پایپ‌لاین استخراج داده OCR',
    tagline: 'هوش اسناد خودکار در مقیاس بالا',
    description:
      'پایپ‌لاین پردازش اسناد سرتاسری با مدل‌های OCR آموزش‌دیده سفارشی برای استخراج داده‌های ساختاریافته از فاکتورها، قراردادها و فرم‌ها. یکپارچه‌سازی لایه‌های اعتبارسنجی، صف‌های بررسی انسانی و صادرات API پایین‌دست.',
    challenge: 'فرمت‌های متنوع اسناد، کیفیت پایین اسکن و ورودی‌های چندزبانه نیاز به پیش‌پردازش تطبیقی داشت.',
    solution: 'پیش‌پردازش لایه‌ای با OpenCV، مدل‌های OCR گروهی و جریان کار بررسی مبتنی بر سطح اطمینان.',
    stack: ['Python', 'OpenCV', 'Tesseract', 'PaddleOCR', 'FastAPI', 'Celery', 'PostgreSQL'],
    metrics: ['۹۴% دقت', '۲۰۰۰+ سند/ساعت', '۸ نوع سند', '۳ زبان'],
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    color: '#0ea5e9',
  },
  {
    id: 3,
    label: 'مهندسی ربات',
    title: 'ربات سیگنال معاملاتی خودکار',
    tagline: 'شناسایی سیگنال الگوریتمی و سیستم هشدار',
    description:
      'ربات نظارت لحظه‌ای بازار که داده‌ها را از چندین صرافی تجمیع می‌کند، الگوریتم‌های تحلیل تکنیکال اعمال کرده و هشدارهای ساختاریافته ارسال می‌کند. ویژگی‌های خاموشی منظم، بازیابی حالت و داشبورد وب.',
    challenge: 'پردازش جریان لحظه‌ای با تأخیر زیر ثانیه و صفر رویداد از دست‌رفته در داده‌های ناپایدار بازار.',
    solution: 'جذب مبتنی بر WebSocket با بافرهای حلقه‌ای بدون قفل، منطق پر کردن برگشتی و حالت پایدار از طریق Redis Streams.',
    stack: ['Python', 'WebSockets', 'Redis Streams', 'TA-Lib', 'FastAPI', 'React', 'Docker'],
    metrics: ['<۵۰ms سیگنال', '۲۰+ اندیکاتور', '۸ صرافی', '۲۴/۷ آپتایم'],
    image: 'https://images.pexels.com/photos/6772076/pexels-photo-6772076.jpeg?auto=compress&cs=tinysrgb&w=800',
    color: '#22d3ee',
  },
  {
    id: 4,
    label: 'زیرساخت هوش مصنوعی',
    title: 'فریمورک هماهنگی عامل LLM',
    tagline: 'هماهنگی چندعاملی با استفاده از ابزار و حافظه',
    description:
      'فریمورک عامل ماژولار که نمونه‌های متعدد LLM را قادر می‌سازد از طریق حافظه مشترک، ارسال ابزار و یک لایه هماهنگ‌کننده روی وظایف پیچیده همکاری کنند. از اجرای زیرعامل موازی و ادغام نتایج قطعی پشتیبانی می‌کند.',
    challenge: 'هماهنگی عامل‌های هوش مصنوعی غیرقطعی بدون از دست دادن زمینه، تکرار کار یا ورود به حلقه‌های بی‌نهایت.',
    solution: 'گراف زمینه متمرکز با ماشین‌های حالت عامل، فراخوان‌های ابزار تکرارپذیر و پروتکل قطع/ازسرگیری.',
    stack: ['Python', 'LangChain', 'OpenAI API', 'Redis', 'FastAPI', 'PostgreSQL', 'Docker'],
    metrics: ['۶ نوع عامل', '۳۰+ ابزار', '۹۵% موفقیت وظیفه', 'خود‌ترمیم'],
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    color: '#38bdf8',
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const itemAnim = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as [number,number,number,number] } },
};

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      variants={itemAnim}
      className="rounded-2xl overflow-hidden glass gradient-border group"
      style={{ borderColor: 'transparent' }}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: 'brightness(0.4)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, transparent 40%, rgba(5,5,8,0.95) 100%)`,
          }}
        />
        <div className="absolute top-4 right-4">
          <span className="tech-tag" style={{ color: project.color, borderColor: `${project.color}44`, background: `${project.color}11` }}>
            {project.label}
          </span>
        </div>
        <div className="absolute top-4 left-4 terminal-text" style={{ fontSize: '0.68rem', color: '#334155' }}>
          0{index + 1}
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-display font-semibold text-lg text-white mb-1">{project.title}</h3>
        <p className="text-sm mb-4" style={{ color: '#475569' }}>{project.tagline}</p>
        <p className="text-sm leading-relaxed mb-5" style={{ color: '#64748b' }}>{project.description}</p>

        <div className="grid grid-cols-2 gap-2 mb-5">
          {project.metrics.map(m => (
            <div
              key={m}
              className="px-3 py-2 rounded-lg text-center"
              style={{ background: `${project.color}09`, border: `1px solid ${project.color}22` }}
            >
              <span className="terminal-text text-xs" style={{ color: project.color }}>{m}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.stack.map(tech => (
            <span key={tech} className="tech-tag" style={{ fontSize: '0.65rem' }}>{tech}</span>
          ))}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm font-medium transition-colors flex items-center gap-2"
          style={{ color: project.color }}
        >
          {expanded ? 'بستن' : 'مشاهده'} مطالعه موردی
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>↓</motion.span>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="mt-5 space-y-4 pt-5" style={{ borderTop: '1px solid #1e1e2e' }}>
                <div>
                  <p className="section-label mb-2" style={{ color: '#475569' }}>چالش</p>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{project.challenge}</p>
                </div>
                <div>
                  <p className="section-label mb-2" style={{ color: project.color }}>راه‌حل</p>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{project.solution}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div
        className="absolute top-0 right-1/4 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.05) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12" ref={ref}>
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div>
            <motion.p className="section-label mb-4" variants={itemAnim}>مطالعات موردی</motion.p>
            <motion.h2
              className="font-display font-bold"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
              variants={itemAnim}
            >
              <span className="gradient-text-white">سیستم‌هایی که </span>
              <span className="gradient-text-cyan">مهندسی کرده‌ام</span>
            </motion.h2>
          </div>
          <motion.p className="text-sm max-w-xs" style={{ color: '#475569' }} variants={itemAnim}>
            هر پروژه یک معماری کامل است — از فضای مسئله تا استقرار پروداکشن.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
