'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons';
import { PERSONAL_INFO } from '@/lib/constants';

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
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
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: '',
    website: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === 'sending') return;

    const name = formData.from_name.trim();
    const email = formData.from_email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      setErrorMessage('Please fill in all required fields.');
      setState('error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      setState('error');
      return;
    }

    setState('sending');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setState('success');
        setFormData({ from_name: '', from_email: '', message: '', website: '' });
      } else {
        setErrorMessage(
          data.message ||
            `The form is temporarily unavailable. Please email me directly at ${PERSONAL_INFO.email}.`
        );
        setState('error');
      }
    } catch {
      setErrorMessage(
        `The form is temporarily unavailable. Please email me directly at ${PERSONAL_INFO.email}.`
      );
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
              <form
                ref={formRef}
                action="/api/contact"
                method="POST"
                onSubmit={handleSubmit}
                aria-busy={state === 'sending'}
                className="space-y-7"
              >
                {/* Honeypot field (hidden from users, traps bots) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleChange}
                    type="text"
                    required
                    aria-required="true"
                    className="input-animated"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email-input"
                    className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email-input"
                    name="from_email"
                    value={formData.from_email}
                    onChange={handleChange}
                    type="email"
                    required
                    aria-required="true"
                    className="input-animated"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    aria-required="true"
                    className="input-animated resize-none"
                  />
                </div>

                {/* Privacy sentence */}
                <p className="text-xs text-on-surface-variant/80 leading-relaxed">
                  Your contact details are used solely to respond to your inquiry and will never be shared or stored for marketing.
                </p>

                {/* Status Messages */}
                {state === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="status"
                    aria-live="polite"
                    className="flex items-center gap-2 text-sm text-primary font-medium"
                  >
                    <CheckCircle size={16} className="shrink-0" />
                    <span>Message sent! I&apos;ll be in touch soon.</span>
                  </motion.div>
                )}
                {state === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                    aria-live="assertive"
                    className="flex items-start gap-2 text-sm text-red-400 font-medium"
                  >
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <div>
                      {errorMessage || (
                        <>
                          The form is temporarily unavailable. Please email me directly at{' '}
                          <a
                            href={`mailto:${PERSONAL_INFO.email}`}
                            className="underline hover:text-white transition-colors"
                          >
                            {PERSONAL_INFO.email}
                          </a>
                          .
                        </>
                      )}
                    </div>
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
