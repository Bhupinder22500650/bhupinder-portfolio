'use client';

import FadeUp from '@/components/ui/FadeUp';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons';
import { normalizeContactMessage, sendContactMessage } from '@/lib/email';
import { PERSONAL_INFO } from '@/data/site';

type FormState = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [state, setState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (state !== 'sending') setState('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === 'sending') return;

    try {
      normalizeContactMessage(formData);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Please check your message.');
      setState('error');
      return;
    }
    setState('sending');
    try {
      await sendContactMessage(formData);
      setState('success');
      setFormData({ from_name: '', from_email: '', message: '' });
    } catch {
      setErrorMessage(`Unable to send right now. Please try again or email ${PERSONAL_INFO.email} directly.`);
      setState('error');
    }
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
    <section id="contact" className="py-16 md:py-32 bg-surface-dim">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — Heading + Links */}
          <div>
            <FadeUp>
              <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
                Get in Touch
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tighter mb-6 leading-tight">
                Let’s connect
              </h2>
              <p className="text-on-surface-variant text-lg mb-12 leading-relaxed">
                I am open to junior software testing, QA, IT support, internship, and junior developer opportunities in Wellington or remote across New Zealand. I am eager to bring my testing mindset, IT support experience, full-stack learning, and strong work ethic to a professional team.
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
            <div className="bg-surface/50 backdrop-blur-md border border-glass-stroke p-8 md:p-10 rounded-2xl shadow-2xl">
              <form onSubmit={handleSubmit} aria-busy={state === 'sending'} className="space-y-7">
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
                    autoComplete="name"
                    maxLength={100}
                    disabled={state === 'sending'}
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
                    autoComplete="email"
                    maxLength={254}
                    disabled={state === 'sending'}
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
                    maxLength={5000}
                    disabled={state === 'sending'}
                    required
                    className="input-animated resize-none"
                  />
                </div>

                {/* Status Messages */}
                {state === 'success' && (
                  <motion.div
                    role="status"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-primary font-medium"
                  >
                    <CheckCircle size={16} />
                    <span>Message sent! I&apos;ll be in touch soon.</span>
                  </motion.div>
                )}
                {state === 'error' && (
                  <motion.div
                    role="alert"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-red-400 font-medium"
                  >
                    <AlertCircle size={16} />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                {/* Submit Button */}
                <button
                  id="contact-submit"
                  type="submit"
                  disabled={state === 'sending'}
                  className="w-full py-4 bg-primary text-on-primary font-bold rounded-full hover:opacity-90 transition-opacity active:scale-95 shadow-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
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
