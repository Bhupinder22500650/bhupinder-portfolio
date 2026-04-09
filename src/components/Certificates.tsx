'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Award, Download, ExternalLink, X, FileText } from 'lucide-react';
import { CERTIFICATES } from '@/lib/constants';
import Image from 'next/image';

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const CATEGORY_COLORS: Record<string, string> = {
  Development: '#75d5e2',
  Networking: '#ffb688',
  Data: '#a78bfa',
  DevOps: '#34d399',
  'IT Support': '#f87171',
};

type Certificate = typeof CERTIFICATES[number];

function CertModal({ cert, onClose }: { cert: Certificate; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-surface-container-low rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/20">
            <div>
              <h3 className="text-lg font-bold text-on-surface">{cert.name}</h3>
              <p className="text-sm text-primary">{cert.issuer} · {cert.date}</p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all"
            >
              <X size={16} />
            </button>
          </div>

          {/* Modal Preview */}
          <div className="p-6">
            {cert.isPdf ? (
              <div className="bg-surface rounded-xl p-10 flex flex-col items-center gap-6 text-center">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
                  <FileText size={28} className="text-on-primary" />
                </div>
                <div>
                  <p className="text-on-surface font-bold text-lg mb-1">{cert.name}</p>
                  <p className="text-on-surface-variant text-sm">PDF Certificate — {cert.issuer}</p>
                </div>
                <div className="flex gap-3">
                  <a
                    href={cert.filePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 gradient-primary text-on-primary rounded-md font-bold text-sm hover:opacity-90 transition-all active:scale-95"
                  >
                    <ExternalLink size={14} />
                    View PDF
                  </a>
                  <a
                    href={cert.filePath}
                    download
                    className="flex items-center gap-2 px-5 py-2.5 bg-surface-variant text-on-surface-variant rounded-md font-bold text-sm hover:bg-surface-container-high hover:text-on-surface transition-all active:scale-95"
                  >
                    <Download size={14} />
                    Download
                  </a>
                </div>
              </div>
            ) : (
              <div className="relative w-full rounded-xl overflow-hidden bg-surface" style={{ minHeight: '320px' }}>
                <Image
                  src={cert.filePath}
                  alt={cert.name}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Certificates() {
  const [selected, setSelected] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="py-32 bg-surface-container-low">
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
            const accentColor = CATEGORY_COLORS[cert.category] || '#75d5e2';
            return (
              <FadeUp key={cert.id} delay={i * 0.08}>
                <div
                  onClick={() => setSelected(cert)}
                  className="group relative bg-surface rounded-xl p-7 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:bg-surface-container-high shadow-[0px_16px_40px_rgba(0,0,0,0.15)] hover:shadow-[0px_24px_60px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col gap-4"
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
                      className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded"
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
                  <div className="flex items-center justify-between pt-2 border-t border-outline-variant/15">
                    <span className="text-xs text-on-surface-variant">{cert.date}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelected(cert); }}
                        className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline underline-offset-2"
                      >
                        <ExternalLink size={12} />
                        View
                      </button>
                      <a
                        href={cert.filePath}
                        download
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors"
                      >
                        <Download size={12} />
                        Save
                      </a>
                    </div>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
