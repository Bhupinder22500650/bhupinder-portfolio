'use client';

import { Heart, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons';
import { PERSONAL_INFO } from '@/lib/constants';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-container-lowest py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div>
            <div className="text-lg font-extrabold text-on-surface font-headline tracking-tighter mb-1">
              B. <span className="text-primary">Singh</span>
            </div>
            <p className="text-xs text-on-surface-variant">
              Full-Stack Developer &amp; IT Support — Wellington, NZ
            </p>
          </div>

          {/* Copyright */}
          <p className="text-xs text-on-surface-variant text-center leading-relaxed">
            © {year} Bhupinder Singh. Built with{' '}
            <Heart size={10} className="inline text-primary" fill="currentColor" /> and{' '}
            <span className="text-primary font-medium">Editorial Precision.</span>
          </p>

          {/* Social + CV */}
          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-all active:scale-90"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-all active:scale-90"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href={PERSONAL_INFO.cvPath}
              download="Bhupinder_Singh_CV.pdf"
              aria-label="Download CV"
              title="Download CV"
              className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-all active:scale-90"
            >
              <Download size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
