'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, Download } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useActiveSection } from '@/hooks/useActiveSection';
import { PERSONAL_INFO } from '@/lib/constants';

const NAV_LINKS = [
  { href: '#home', label: 'Home', id: 'home' },
  { href: '#about', label: 'About', id: 'about' },
  { href: '#projects', label: 'Projects', id: 'projects' },
  { href: '#certificates', label: 'Certificates', id: 'certificates' },
  { href: '#contact', label: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const activeSection = useActiveSection(['home', 'about', 'projects', 'certificates', 'contact']);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-5xl z-50 transition-all duration-500 rounded-full border border-glass-stroke backdrop-blur-xl ${
          scrolled
            ? 'top-4 shadow-[0_12px_40px_rgba(0,0,0,0.15)] py-2.5 bg-surface/85'
            : 'top-6 shadow-sm py-4 bg-surface/70'
        }`}
      >
        <div className="flex justify-between items-center px-4 md:px-6 w-full">
          {/* Logo */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-extrabold tracking-tighter text-on-surface font-headline cursor-pointer bg-transparent border-none p-0 outline-none focus:text-primary transition-colors"
            onClick={() => handleNavClick('#home')}
            aria-label="Bhupinder Singh Portfolio Home"
          >
            B.{' '}
            <span className="text-primary">Singh</span>
          </motion.button>

          {/* Desktop Nav */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex gap-8 items-center font-headline tracking-tight text-sm font-semibold"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.href)}
                className={`nav-link transition-colors duration-200 ${
                  activeSection === link.id
                    ? 'active text-primary'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {link.label}
              </button>
            ))}
          </motion.div>

          {/* Right Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            {/* Theme Toggle Switch */}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className={`relative flex items-center w-14 h-8 rounded-full p-1 transition-colors duration-300 ${
                theme === 'dark' ? 'bg-primary' : 'bg-surface-container-highest'
              } ${theme === 'dark' ? 'justify-end' : 'justify-start'}`}
            >
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
                className="w-6 h-6 bg-white rounded-full shadow-sm flex items-center justify-center z-10"
              >
                {theme === 'dark' ? (
                  <Moon size={12} className="text-primary fill-primary" />
                ) : (
                  <Sun size={12} className="text-amber-500 fill-amber-500" />
                )}
              </motion.div>
            </button>

            {/* Download CV */}
            <a
              href={PERSONAL_INFO.cvPath}
              download="Bhupinder_Singh_CV.pdf"
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-on-primary text-sm font-bold hover:opacity-90 transition-opacity active:scale-95 shadow-sm"
            >
              <Download size={14} />
              Download CV
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              className="md:hidden w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-all"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </motion.div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 250 }}
            className="fixed top-0 right-0 bottom-0 w-[75vw] max-w-xs z-40 bg-surface flex flex-col pt-24 px-8 gap-6 shadow-2xl"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => handleNavClick(link.href)}
                className={`text-left text-2xl font-bold font-headline tracking-tight transition-colors ${
                  activeSection === link.id ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              href={PERSONAL_INFO.cvPath}
              download="Bhupinder_Singh_CV.pdf"
              className="mt-4 flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-on-primary text-base font-bold justify-center active:scale-95 hover:opacity-90 transition-opacity"
            >
              <Download size={16} />
              Download CV
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
