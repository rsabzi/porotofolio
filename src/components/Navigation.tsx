import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'خانه', href: '#home' },
  { label: 'خدمات', href: '#services' },
  { label: 'نمونه‌کار', href: '#projects' },
  { label: 'مهارت‌ها', href: '#skills' },
  { label: 'فرآیند', href: '#process' },
  { label: 'تماس', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map(l => l.href.slice(1));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[500] transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(5,5,8,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid #1e1e2e' : '1px solid transparent',
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] as [number,number,number,number] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
          <button
            onClick={() => handleNav('#home')}
            className="flex items-center gap-3 group"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center gradient-border"
              style={{ background: 'rgba(6,182,212,0.07)' }}
            >
              <span className="font-display font-bold text-xs gradient-text-cyan">نو</span>
            </div>
            <div>
              <span className="font-display font-semibold text-white text-sm tracking-wide">
                نوین وب
              </span>
              <span
                className="block terminal-text"
                style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: '#475569' }}
              >
                سیستم‌های هوشمند
              </span>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="relative text-sm font-medium transition-colors"
                style={{ color: active === link.href.slice(1) ? '#22d3ee' : '#94a3b8' }}
              >
                {link.label}
                {active === link.href.slice(1) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px"
                    style={{ background: '#06b6d4', boxShadow: '0 0 6px rgba(6,182,212,0.8)' }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => handleNav('#contact')}
              className="px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(14,165,233,0.1))',
                border: '1px solid rgba(6,182,212,0.3)',
                color: '#22d3ee',
              }}
            >
              شروع همکاری
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
          >
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                className="block h-px rounded-full"
                style={{ background: '#06b6d4', width: i === 1 ? '24px' : '18px' }}
                animate={menuOpen ? {
                  rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
                  y: i === 0 ? 7 : i === 2 ? -7 : 0,
                  opacity: i === 1 ? 0 : 1,
                  width: i === 0 || i === 2 ? '24px' : '24px',
                } : { rotate: 0, y: 0, opacity: 1 }}
                transition={{ duration: 0.25 }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[490] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0" style={{ background: 'rgba(5,5,8,0.96)', backdropFilter: 'blur(20px)' }} />
            <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="font-display text-3xl font-semibold transition-colors"
                  style={{ color: active === link.href.slice(1) ? '#22d3ee' : '#94a3b8' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
