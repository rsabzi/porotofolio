import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, Linkedin, Send, Mail, MessageCircle } from 'lucide-react';

const socials = [
  { icon: Github, label: 'گیت‌هاب', handle: '@rezasabzi', color: '#94a3b8', href: '#' },
  { icon: Linkedin, label: 'لینکدین', handle: 'Reza Sabzi', color: '#0ea5e9', href: '#' },
  { icon: MessageCircle, label: 'تلگرام', handle: '@rezasabzi_dev', color: '#22d3ee', href: '#' },
  { icon: Mail, label: 'ایمیل', handle: 'reza@webnovo.dev', color: '#38bdf8', href: 'mailto:reza@webnovo.dev' },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemAnim = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as [number,number,number,number] } },
};

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [formState, setFormState] = useState({ name: '', email: '', project: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12" ref={ref}>
        <motion.div
          className="text-center mb-16"
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p className="section-label mb-4" variants={itemAnim}>شروع همکاری</motion.p>
          <motion.h2
            className="font-display font-bold mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            variants={itemAnim}
          >
            <span className="gradient-text-white">برای پروژه بعدی، </span>
            <span className="gradient-text-cyan glow-cyan">هوشمند</span>
            <br />
            <span className="gradient-text-white">یک مسیر روشن بسازیم.</span>
          </motion.h2>
          <motion.p className="text-base max-w-lg mx-auto" style={{ color: '#475569' }} variants={itemAnim}>
            چند خط درباره هدف، مخاطب و نتیجه‌ای که می‌خواهید بنویسید. پاسخ اولیه شامل پیشنهاد مسیر، ریسک‌ها و قدم بعدی خواهد بود.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.div variants={itemAnim} className="p-8 rounded-2xl glass gradient-border">
              {sent ? (
                <div className="text-center py-12">
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                    style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)' }}
                  >
                    <Send size={24} style={{ color: '#22d3ee' }} />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-white mb-3">درخواست شما ثبت شد</h3>
                  <p className="text-sm" style={{ color: '#475569' }}>
                    جزئیات را بررسی می‌کنم و حداکثر تا ۲۴ ساعت آینده با پیشنهاد قدم بعدی پاسخ می‌دهم.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { key: 'name', label: 'نام', placeholder: 'نام شما' },
                      { key: 'email', label: 'ایمیل', placeholder: 'your@email.com' },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="section-label block mb-2" style={{ fontSize: '0.62rem' }}>{f.label}</label>
                        <input
                          type={f.key === 'email' ? 'email' : 'text'}
                          placeholder={f.placeholder}
                          value={formState[f.key as keyof typeof formState]}
                          onChange={e => setFormState(s => ({ ...s, [f.key]: e.target.value }))}
                          required
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                          style={{
                            background: 'rgba(13,13,20,0.8)',
                            border: '1px solid #1e1e2e',
                            color: '#f1f5f9',
                            fontFamily: 'Vazirmatn, Space Grotesk, sans-serif',
                          }}
                          onFocus={e => (e.target.style.borderColor = 'rgba(6,182,212,0.5)')}
                          onBlur={e => (e.target.style.borderColor = '#1e1e2e')}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="section-label block mb-2" style={{ fontSize: '0.62rem' }}>نوع پروژه</label>
                    <select
                      value={formState.project}
                      onChange={e => setFormState(s => ({ ...s, project: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                      style={{
                        background: 'rgba(13,13,20,0.8)',
                        border: '1px solid #1e1e2e',
                        color: formState.project ? '#f1f5f9' : '#475569',
                        fontFamily: 'Vazirmatn, Space Grotesk, sans-serif',
                      }}
                    >
                      <option value="" disabled>انتخاب نوع پروژه</option>
                      <option value="automation">سیستم اتوماسیون</option>
                      <option value="ai">ابزار / عامل هوش مصنوعی</option>
                      <option value="bot">مهندسی ربات</option>
                      <option value="backend">معماری بک‌اند</option>
                      <option value="other">سایر</option>
                    </select>
                  </div>

                  <div>
                    <label className="section-label block mb-2" style={{ fontSize: '0.62rem' }}>پیام</label>
                    <textarea
                      placeholder="مثلاً: چه می‌فروشید، مخاطب کیست، مشکل اصلی چیست و از سایت/سیستم چه نتیجه‌ای می‌خواهید؟"
                      value={formState.message}
                      onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                      style={{
                        background: 'rgba(13,13,20,0.8)',
                        border: '1px solid #1e1e2e',
                        color: '#f1f5f9',
                        fontFamily: 'Vazirmatn, Space Grotesk, sans-serif',
                      }}
                      onFocus={e => (e.target.style.borderColor = 'rgba(6,182,212,0.5)')}
                      onBlur={e => (e.target.style.borderColor = '#1e1e2e')}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                    style={{
                      background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
                      color: '#050508',
                      boxShadow: '0 0 30px rgba(6,182,212,0.25)',
                    }}
                  >
                    <Send size={16} />
                    ارسال درخواست بررسی
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            className="flex flex-col gap-6"
            variants={stagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.div variants={itemAnim} className="p-6 rounded-2xl glass gradient-border">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-3 h-3 rounded-full pulse-glow"
                  style={{ background: '#22d3ee', boxShadow: '0 0 8px #06b6d4' }}
                />
                <p className="section-label">در حال حاضر در دسترس</p>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#64748b' }}>
                آماده همکاری برای سایت‌های فروش‌محور، MVPهای هوشمند، اتوماسیون فرایند و داشبوردهای مدیریتی. اگر پروژه هنوز خام است، از تحلیل و نقشه راه شروع می‌کنیم.
              </p>
              <div className="flex flex-wrap gap-2">
                {['تحلیل اولیه', 'طراحی UX', 'توسعه MVP', 'اتوماسیون AI'].map(tag => (
                  <span key={tag} className="tech-tag">{tag}</span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemAnim} className="p-6 rounded-2xl glass gradient-border">
              <p className="section-label mb-5">شبکه‌های اجتماعی</p>
              <div className="space-y-3">
                {socials.map(social => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group"
                    style={{ background: 'rgba(13,13,20,0.5)' }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${social.color}12`, border: `1px solid ${social.color}25` }}
                    >
                      <social.icon size={16} style={{ color: social.color }} />
                    </div>
                    <div>
                      <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>{social.label}</p>
                      <p className="terminal-text" style={{ fontSize: '0.75rem', color: social.color }}>{social.handle}</p>
                    </div>
                    <div className="mr-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      <span style={{ color: social.color, fontSize: '0.8rem' }}>←</span>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={itemAnim}
              className="p-6 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(6,182,212,0.06), rgba(14,165,233,0.03))',
                border: '1px solid rgba(6,182,212,0.12)',
              }}
            >
              <p className="text-sm leading-relaxed italic" style={{ color: '#64748b' }}>
                «من فقط ویژگی تحویل نمی‌دهم — سیستم‌هایی می‌سازم که ویژگی‌ها را در مقیاس ممکن می‌سازند.
                هر پروژه‌ای که بر عهده می‌گیرم به بخشی از زیرساختی تبدیل می‌شود که باعث افتخار است.»
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-px h-8" style={{ background: 'rgba(6,182,212,0.4)' }} />
                <div>
                  <p className="text-sm font-semibold text-white">رضا سبزی</p>
                  <p className="section-label" style={{ fontSize: '0.6rem' }}>معمار سیستم‌ها</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 mt-20 pt-8" style={{ borderTop: '1px solid #1e1e2e' }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)' }}
            >
              <span className="font-display font-bold" style={{ fontSize: '0.55rem', color: '#22d3ee' }}>نو</span>
            </div>
            <span className="text-sm font-medium" style={{ color: '#334155' }}>نوین وب — سیستم‌های هوشمند</span>
          </div>
          <p className="terminal-text" style={{ fontSize: '0.68rem', color: '#334155' }}>
            © ۲۰۲۴ رضا سبزی. ساخته‌شده با دقت.
          </p>
        </div>
      </div>
    </section>
  );
}
