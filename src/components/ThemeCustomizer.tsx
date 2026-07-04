'use client';

import { useState, useEffect } from 'react';
import { Palette, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const THEMES = [
  { id: 'cyan', name: 'Cyan', color: '#75D5E2' },
  { id: 'indigo', name: 'Indigo', color: '#818cf8' },
  { id: 'emerald', name: 'Emerald', color: '#34d399' },
  { id: 'rose', name: 'Rose', color: '#fb7185' },
  { id: 'amber', name: 'Amber', color: '#fbbf24' },
];

export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('cyan');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const saved = localStorage.getItem('primary-theme') || 'cyan';
    setActiveTheme(saved);
    document.documentElement.setAttribute('data-primary', saved);
  }, []);

  const changeTheme = (themeId: string) => {
    setActiveTheme(themeId);
    document.documentElement.setAttribute('data-primary', themeId);
    localStorage.setItem('primary-theme', themeId);
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 left-0 bg-surface/80 border border-glass-stroke p-4 rounded-2xl shadow-2xl backdrop-blur-md w-48"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-on-surface">Accent Color</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-on-surface-variant hover:text-primary transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => changeTheme(theme.id)}
                  title={theme.name}
                  className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center ${
                    activeTheme === theme.id ? 'border-on-surface scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: theme.color }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-surface-container-high border border-glass-stroke text-on-surface flex items-center justify-center shadow-lg hover:scale-110 hover:text-primary transition-all active:scale-95"
        title="Customize Theme"
      >
        <Palette size={20} />
      </button>
    </div>
  );
}
