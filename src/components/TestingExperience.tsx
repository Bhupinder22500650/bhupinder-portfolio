'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

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

const TESTING_AREAS = [
  {
    title: 'Functional Testing',
    items: ['Login testing', 'Form validation', 'Password reset flow', 'Account creation flow', 'Feature verification'],
  },
  {
    title: 'UI/UX Testing',
    items: ['Navigation issues', 'Confusing user flow', 'Layout problems', 'Mobile usability issues'],
  },
  {
    title: 'Bug Reporting',
    items: ['Clear bug descriptions', 'Steps to reproduce', 'Expected result', 'Actual result', 'Severity level'],
  },
  {
    title: 'Performance Observation',
    items: ['Slow scrolling', 'Delayed loading', 'Repeated clicks', 'Page responsiveness'],
  },
];

export default function TestingExperience() {
  return (
    <section id="testing" className="py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <FadeUp>
          <div className="mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
              Quality Assurance
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tighter mb-4">
              Testing Experience
            </h2>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-3xl leading-relaxed">
              Hands-on experience testing web and mobile application features, checking user flows, finding UI/UX issues, and reporting bugs clearly.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {TESTING_AREAS.map((area, index) => (
            <FadeUp key={area.title} delay={index * 0.1}>
              <div className="group relative bg-surface rounded-lg p-6 md:p-8 h-full border border-glass-stroke transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:bg-surface-bright flex flex-col">
                <h3 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full border border-glass-stroke text-primary flex items-center justify-center shrink-0">
                    <CheckCircle2 size={18} />
                  </span>
                  {area.title}
                </h3>
                <ul className="space-y-4">
                  {area.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-on-surface-variant leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
