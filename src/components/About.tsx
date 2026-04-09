'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ABOUT_TEXT, SKILLS, EDUCATION } from '@/lib/constants';

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
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

export default function About() {
  return (
    <section id="about" className="py-32 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

          {/* Left — Bio + Skills */}
          <div>
            <FadeUp>
              <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
                Who I Am
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tighter mb-8">
                The Digital<br />
                <span className="text-primary">Curator</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="space-y-5 text-on-surface-variant leading-relaxed text-base md:text-lg">
                {ABOUT_TEXT.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </FadeUp>

            {/* Skills Chips */}
            <FadeUp delay={0.2}>
              <div className="mt-12">
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-5">
                  Technical Mastery
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {SKILLS.map((skill) => (
                    <span
                      key={skill.label}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-variant text-on-surface-variant text-sm font-medium hover:bg-surface-container-high hover:text-on-surface transition-all duration-200 cursor-default"
                    >
                      {skill.highProficiency && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      )}
                      {skill.label}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-xs text-on-surface-variant opacity-60">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" /> = High Proficiency
                  </span>
                </p>
              </div>
            </FadeUp>
          </div>

          {/* Right — Timeline */}
          <div>
            <FadeUp delay={0.05}>
              <h3 className="text-2xl font-bold text-on-surface mb-10 tracking-tight">
                Journey &amp; Education
              </h3>
            </FadeUp>

            <div className="relative pl-8 space-y-12">
              {/* Vertical line */}
              <div
                aria-hidden="true"
                className="absolute top-0 bottom-0 left-0 w-px"
                style={{ background: 'linear-gradient(to bottom, var(--color-primary), transparent)', opacity: 0.3 }}
              />

              {EDUCATION.map((item, i) => (
                <FadeUp key={item.title} delay={0.1 + i * 0.12}>
                  <div className="relative group">
                    {/* Timeline dot */}
                    <div
                      className={`absolute -left-[37px] top-1 w-4 h-4 rounded-full border-4 transition-all duration-300 group-hover:scale-125 ${
                        item.current
                          ? 'bg-primary border-surface-container-low'
                          : 'bg-surface-variant border-surface-container-low'
                      }`}
                    />
                    {item.current && (
                      <div className="absolute -left-[41px] top-[-4px] w-[24px] h-[24px] rounded-full bg-primary opacity-20 animate-ping" />
                    )}

                    <h4 className="text-lg md:text-xl font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-primary font-semibold text-sm mb-1">{item.institution}</p>
                    {'period' in item && item.period && (
                      <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60 mb-2">{item.period}</p>
                    )}
                    <p className="text-on-surface-variant text-sm leading-relaxed">{item.description}</p>
                  </div>
                </FadeUp>
              ))}

              {/* Future placeholder */}
              <FadeUp delay={0.35}>
                <div className="relative">
                  <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-dashed border-outline-variant opacity-40" />
                  <p className="text-on-surface-variant text-sm italic opacity-50">What comes next…</p>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
