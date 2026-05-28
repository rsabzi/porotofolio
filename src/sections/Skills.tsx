import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
  {
    category: 'هوش مصنوعی و هوشمندی',
    color: '#22d3ee',
    items: [
      { name: 'مهندسی LLM', level: 95 },
      { name: 'پرامپت انجینیرینگ', level: 92 },
      { name: 'بینایی ماشین', level: 85 },
      { name: 'عامل‌های هوش مصنوعی', level: 90 },
    ],
  },
  {
    category: 'اتوماسیون و ربات‌ها',
    color: '#0ea5e9',
    items: [
      { name: 'معماری ربات', level: 97 },
      { name: 'سیستم‌های ناهمگام', level: 94 },
      { name: 'طراحی رویداد‌محور', level: 91 },
      { name: 'هماهنگی جریان کار', level: 88 },
    ],
  },
  {
    category: 'سیستم‌های بک‌اند',
    color: '#38bdf8',
    items: [
      { name: 'پایتون / FastAPI', level: 96 },
      { name: 'معماری توزیع‌شده', level: 89 },
      { name: 'طراحی API', level: 93 },
      { name: 'مهندسی پایگاه‌داده', level: 86 },
    ],
  },
  {
    category: 'زیرساخت',
    color: '#06b6d4',
    items: [
      { name: 'طراحی سیستم', level: 90 },
      { name: 'میکروسرویس‌ها', level: 87 },
      { name: 'صف پیام', level: 92 },
      { name: 'معماری ابری', level: 84 },
    ],
  },
];

const techStack = [
  'Python', 'FastAPI', 'Node.js', 'TypeScript', 'PostgreSQL', 'Redis',
  'RabbitMQ', 'Docker', 'Celery', 'OpenAI API', 'LangChain', 'Selenium',
  'Playwright', 'OCR', 'WebSockets', 'REST', 'GraphQL', 'Supabase',
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] as [number,number,number,number] } },
};

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div
        className="absolute left-0 top-1/3 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12" ref={ref}>
        <motion.div
          className="mb-16"
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p className="section-label mb-4" variants={item}>توانایی‌ها</motion.p>
          <motion.h2
            className="font-display font-bold"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
            variants={item}
          >
            <span className="gradient-text-white">زرادخانه </span>
            <span className="gradient-text-cyan">فنی</span>
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {skills.map((group) => (
            <motion.div
              key={group.category}
              variants={item}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="p-6 rounded-2xl glass gradient-border"
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: group.color, boxShadow: `0 0 8px ${group.color}` }}
                />
                <p className="section-label" style={{ color: group.color }}>{group.category}</p>
              </div>
              <div className="space-y-4">
                {group.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-medium" style={{ color: '#94a3b8' }}>{skill.name}</span>
                      <span className="terminal-text text-xs" style={{ color: group.color }}>{skill.level}%</span>
                    </div>
                    <div
                      className="h-0.5 w-full rounded-full"
                      style={{ background: '#1e1e2e' }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${group.color}, ${group.color}99)`,
                          boxShadow: `0 0 6px ${group.color}55`,
                        }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1.2, delay: 0.3, ease: [0.23, 1, 0.32, 1] as [number,number,number,number] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p className="section-label mb-6" variants={item}>استک تکنولوژی</motion.p>
          <motion.div className="flex flex-wrap gap-2" variants={stagger}>
            {techStack.map((tech) => (
              <motion.span
                key={tech}
                variants={item}
                className="tech-tag"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
