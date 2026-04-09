'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons';
import { AVAILABLE_FOR_WORK, PERSONAL_INFO } from '@/lib/constants';
import Image from 'next/image';

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-12 px-6 md:px-10 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #75d5e2 0%, transparent 70%)' }}
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center w-full">
        {/* Text block */}
        <div className="md:col-span-7 order-2 md:order-1">
          {/* Available badge */}
          {AVAILABLE_FOR_WORK && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" />
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Available for work
              </span>
            </motion.div>
          )}

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter mb-5 text-on-surface leading-[0.9]"
          >
            Bhupinder
            <br />
            <span className="text-primary">Singh</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-on-surface-variant mb-10 max-w-lg leading-relaxed font-light"
          >
            Full-Stack Developer &amp; IT Support based in{' '}
            <span className="text-on-surface font-semibold">Wellington, NZ</span>.{' '}
            Crafting high-performance digital experiences.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <button
              onClick={scrollToProjects}
              className="gradient-primary text-on-primary px-8 py-4 rounded-md font-bold text-base hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-black/20"
            >
              View Projects
            </button>
            <a
              href={PERSONAL_INFO.cvPath}
              download="Bhupinder_Singh_CV.pdf"
              className="flex items-center gap-2 border border-[rgba(63,73,73,0.3)] text-primary px-8 py-4 rounded-md font-bold text-base hover:bg-surface-container-low transition-all active:scale-95"
            >
              <Download size={16} />
              Download CV
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex items-center gap-5"
          >
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-all active:scale-90"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-all active:scale-90"
            >
              <LinkedinIcon size={18} />
            </a>
            <div className="h-px w-12 bg-outline-variant opacity-50" />
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              Wellington, NZ
            </span>
          </motion.div>
        </div>

        {/* Profile photo */}
        <div className="md:col-span-5 order-1 md:order-2 flex justify-center md:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, type: 'spring', stiffness: 100 }}
            className="relative group"
          >
            {/* Ambient glow ring */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full blur-3xl transition-all duration-700 group-hover:opacity-60 opacity-30"
              style={{ background: 'radial-gradient(circle, #75d5e2, transparent 70%)' }}
            />
            {/* Photo container */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden ring-4 ring-surface-container-highest shadow-2xl">
              {/* Initials fallback — sits behind */}
              <div className="absolute inset-0 gradient-primary flex items-center justify-center text-on-primary text-5xl font-extrabold font-headline tracking-tighter select-none z-0">
                BS
              </div>
              {/* Real photo — sits on top */}
              <Image
                src="/profile.jpg"
                alt="Bhupinder Singh — Full-Stack Developer"
                fill
                priority
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700 z-10 relative"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        aria-label="Scroll to about"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors group"
      >
        <span className="text-[10px] font-bold uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
