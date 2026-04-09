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
        className={`fixed top-0 w-full z-50 transition-all duration-300 glass-nav ${
          scrolled ? 'shadow-[0px_24px_48px_rgba(0,0,0,0.25)]' : ''
        }`}
      >
        <div className="flex justify-between items-center px-6 md:px-10 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-extrabold tracking-tighter text-on-surface font-headline cursor-pointer"
            onClick={() => handleNavClick('#home')}
          >
            B.{' '}
            <span className="text-primary">Singh</span>
          </motion.div>

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
            {/* Theme Toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-all duration-200 active:scale-90"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Download CV */}
            <a
              href={PERSONAL_INFO.cvPath}
              download="Bhupinder_Singh_CV.pdf"
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-md gradient-primary text-on-primary text-sm font-bold hover:opacity-90 transition-all active:scale-95"
            >
              <Download size={14} />
              Download CV
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
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
            className="fixed top-0 right-0 bottom-0 w-[75vw] max-w-xs z-40 bg-surface-container-low flex flex-col pt-24 px-8 gap-6"
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
              className="mt-4 flex items-center gap-2 px-5 py-3 rounded-md gradient-primary text-on-primary text-base font-bold justify-center active:scale-95"
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
