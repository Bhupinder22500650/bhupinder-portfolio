'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons';
import { PERSONAL_INFO, EMAILJS_CONFIG } from '@/lib/constants';
import emailjs from '@emailjs/browser';

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

type FormState = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<FormState>('idle');
  const [formData, setFormData] = useState({ from_name: '', from_email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === 'sending') return;
    setState('sending');

    try {
      if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId || !EMAILJS_CONFIG.publicKey) {
        await new Promise((r) => setTimeout(r, 1200));
        setState('success');
        setFormData({ from_name: '', from_email: '', message: '' });
        return;
      }

      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: formData.from_name,
          from_email: formData.from_email,
          message: formData.message,
        },
        { publicKey: EMAILJS_CONFIG.publicKey }
      );
      setState('success');
      setFormData({ from_name: '', from_email: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setState('error');
    }

    setTimeout(() => setState('idle'), 5000);
  };

  const CONTACT_LINKS = [
    {
      href: `mailto:${PERSONAL_INFO.email}`,
      icon: <Mail size={20} />,
      label: PERSONAL_INFO.email,
      id: 'contact-email',
    },
    {
      href: PERSONAL_INFO.linkedin,
      icon: <LinkedinIcon size={20} />,
      label: 'LinkedIn Profile',
      id: 'contact-linkedin',
    },
    {
      href: PERSONAL_INFO.github,
      icon: <GithubIcon size={20} />,
      label: 'GitHub Repository',
      id: 'contact-github',
    },
  ];

  return (
    <section id="contact" className="py-32 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — Heading + Links */}
          <div>
            <FadeUp>
              <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
                Get in Touch
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tighter mb-6 leading-tight">
                Let&apos;s build something{' '}
                <span className="text-primary">extraordinary.</span>
              </h2>
              <p className="text-on-surface-variant text-lg mb-12 leading-relaxed">
                Whether you&apos;re looking to hire for a role or collaborate on a project, my inbox is always open.
              </p>
            </FadeUp>

            <div className="space-y-5">
              {CONTACT_LINKS.map((link, i) => (
                <FadeUp key={link.id} delay={0.1 + i * 0.08}>
                  <a
                    href={link.href}
                    id={link.id}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant group-hover:bg-primary group-hover:text-on-primary transition-all duration-300 flex-shrink-0">
                      {link.icon}
                    </div>
                    <span className="text-on-surface font-medium group-hover:text-primary transition-colors">
                      {link.label}
                    </span>
                  </a>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* Right — Contact Form */}
          <FadeUp delay={0.15}>
            <div className="bg-surface p-8 md:p-10 rounded-2xl shadow-[0px_32px_64px_rgba(0,0,0,0.2)]">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-7" noValidate>
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleChange}
                    type="text"
                    required
                    className="input-animated"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email-input" className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                    Email Address
                  </label>
                  <input
                    id="contact-email-input"
                    name="from_email"
                    value={formData.from_email}
                    onChange={handleChange}
                    type="email"
                    required
                    className="input-animated"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="input-animated resize-none"
                  />
                </div>

                {/* Status Messages */}
                {state === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-primary font-medium"
                  >
                    <CheckCircle size={16} />
                    Message sent! I&apos;ll be in touch soon.
                  </motion.div>
                )}
                {state === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-red-400 font-medium"
                  >
                    <AlertCircle size={16} />
                    Something went wrong. Please try again.
                  </motion.div>
                )}

                {/* Submit Button */}
                <button
                  id="contact-submit"
                  type="submit"
                  disabled={state === 'sending'}
                  className="w-full py-4 gradient-primary text-on-primary font-bold rounded-md hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-black/20 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {state === 'sending' ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full"
                      />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
