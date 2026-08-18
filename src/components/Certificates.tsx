'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { CERTIFICATES } from '@/lib/constants';

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

const CATEGORY_COLORS: Record<string, string> = {
  Development: '#768D9C', // Slate Blue
  Networking: '#C59E5E', // Ochre
  Data: '#9685B5', // Muted Violet
  DevOps: '#7C9573', // Sage
  'IT Support': '#C98686', // Dusty Rose
  'AI & Automation': '#75D5E2', // Cyber Teal
};

export default function Certificates() {
  return (
    <section id="certificates" className="py-16 md:py-32 bg-surface-dim">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <FadeUp>
          <div className="mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
              Credentials
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tighter">
              Certifications
            </h2>
            <p className="text-on-surface-variant mt-3 text-lg">
              Professional certificates earned across development, networking, and IT.
            </p>
          </div>
        </FadeUp>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATES.map((cert, i) => {
            const accentColor = CATEGORY_COLORS[cert.category] || '#C28459';
            return (
              <FadeUp key={cert.id} delay={i * 0.08}>
                <a
                  href={cert.filePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group relative bg-surface rounded-lg p-7 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 hover:bg-surface-bright hover:shadow-2xl overflow-hidden flex flex-col gap-4 h-full border border-glass-stroke"
                >
                  {/* Accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px]"
                    style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
                  />

                  {/* Icon + Category */}
                  <div className="flex items-start justify-between">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${accentColor}18` }}
                    >
                      <Award size={20} style={{ color: accentColor }} />
                    </div>
                    <span
                      className="font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded"
                      style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                    >
                      {cert.category}
                    </span>
                  </div>

                  {/* Name + Issuer */}
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-on-surface mb-1 group-hover:text-primary transition-colors leading-snug">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-on-surface-variant">{cert.issuer}</p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-outline-variant/15 mt-2">
                    <span className="text-xs text-on-surface-variant">{cert.date}</span>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-primary group-hover:underline underline-offset-2 transition-all">
                      <ExternalLink size={12} />
                      View Certificate
                    </span>
                  </div>
                </a>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
