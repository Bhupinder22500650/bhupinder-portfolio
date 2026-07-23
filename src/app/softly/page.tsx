'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, Heart, Sparkles, Smile, Volume2, Moon } from 'lucide-react';

// Scenarios for the horizontal scroll section
const SCENARIOS = [
  {
    id: 1,
    time: '08:15 am',
    text: 'waking up with racing thoughts and an endless to-do list.',
    accent: '#FFB7B2', // Peach/Coral
  },
  {
    id: 2,
    time: '01:30 pm',
    text: 'staring at a screen for hours, forgetting to take a deep breath.',
    accent: '#E8EFE8', // Sage
  },
  {
    id: 3,
    time: '06:45 pm',
    text: 'feeling the transition from work to rest blur into nothing.',
    accent: '#EFEDF4', // Lavender
  },
  {
    id: 4,
    time: '10:30 pm',
    text: 'lying awake as the phone light keeps your mind running.',
    accent: '#FFB7B2', // Coral
  },
  {
    id: 5,
    time: '11:15 pm',
    text: 'finding a pocket of quiet before drifting into deep sleep.',
    accent: '#E8EFE8', // Sage
  },
];

// Testimonials (Diary style)
const TESTIMONIALS = [
  {
    id: 1,
    text: '“i started using softly for just three minutes between work meetings. it’s like a quiet hallway in a very loud building. my breathing has slowed down, and so has my day.”',
    author: 'emma r.',
    rotation: -1,
  },
  {
    id: 2,
    text: '“the interactive breathing exercises feel so tactile. i actually look forward to putting my phone on the table and just following the soft pulses. it has become my evening anchor.”',
    author: 'lucas m.',
    rotation: 1,
  },
];

// FAQ items
const FAQS = [
  {
    q: 'what makes softly different from other wellness apps?',
    a: 'softly doesn’t ask for streaks, points, or hours of your time. it is designed to be closed. we focus on micro-interventions—30-second to 3-minute tactile exercises that help you return to your body and then get back to your life.',
  },
  {
    q: 'how does the tactile breathing work?',
    a: 'using haptic pulses and expanding coral shapes, the app guides your breath through physical touch. you can place your thumb on the screen and feel the gentle rise and fall, allowing you to calm your nervous system without even looking directly at the display.',
  },
  {
    q: 'is there a desktop version planned?',
    a: 'no, softly is intentionally mobile-first because that’s where the noise is. it transforms the device that usually causes distraction and stress into a portal of quiet and grounding.',
  },
  {
    q: 'how much will softly cost?',
    a: 'softly will be completely free during our public beta. our goal is to co-create a quiet space with our early waitlist members before introducing a simple, transparent subscription model.',
  },
];

export default function SoftlyLandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FDFCF8] text-[#292524] font-outfit overflow-x-hidden selection:bg-[#FFB7B2] selection:text-[#292524]">
      {/* 0.35 opacity fractal noise grain overlay */}
      <div 
        className="fixed inset-0 z-50 pointer-events-none opacity-35 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.35'/%3E%3C/svg%3E")`
        }}
      />

      {/* Floating Background Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Coral Blob Left */}
        <motion.div
          animate={{ y: [0, 10, 0], x: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#FFB7B2] opacity-40 blur-[100px]"
        />
        {/* Lavender Blob Right */}
        <motion.div
          animate={{ y: [0, -10, 0], x: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-[10%] -right-32 w-[450px] h-[450px] rounded-full bg-[#EFEDF4] opacity-50 blur-[120px]"
        />
        {/* Sage Blob Bottom */}
        <motion.div
          animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-[#E8EFE8] opacity-50 blur-[110px]"
        />
      </div>

      {/* Floating Pill Nav Bar */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-xl z-40">
        <nav className="flex items-center justify-between px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-xl border border-stone-200/40 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)]">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#FFB7B2] flex items-center justify-center relative">
              <span className="w-1.5 h-1.5 rounded-full bg-white absolute top-1 left-1" />
            </div>
            <span className="text-sm font-bold tracking-tight text-[#292524]">Softly.</span>
          </div>

          {/* Links */}
          <div className="hidden sm:flex items-center gap-6">
            <a href="#experience" className="text-[13px] font-medium text-[#78716C] hover:text-[#292524] transition-colors">Features</a>
            <a href="#testimonials" className="text-[13px] font-medium text-[#78716C] hover:text-[#292524] transition-colors">Manifesto</a>
            <a href="#faq" className="text-[13px] font-medium text-[#78716C] hover:text-[#292524] transition-colors">Stories</a>
          </div>

          {/*stone CTA Button */}
          <a
            href="#waitlist"
            className="px-4 py-2 text-xs font-bold text-[#FDFCF8] bg-[#292524] rounded-full hover:opacity-90 transition-opacity shadow-sm active:scale-95"
          >
            Get early access
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-36 pb-20 px-6 max-w-4xl mx-auto text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Tagline Badge */}
          <span className="px-3.5 py-1.5 rounded-full border border-stone-200/50 bg-white/50 text-[11px] font-bold tracking-tight text-[#78716C] mb-8 shadow-sm flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Waitlist open for iOS & Android
          </span>

          {/* Headline (Sentence-case, Outfit & Reenie Beanie) */}
          <h1 className="text-5xl sm:text-6xl md:text-[80px] font-extrabold tracking-tight text-[#292524] leading-[1.05] mb-6 max-w-3xl">
            Digital wellness for<br />
            <span className="font-reenie-beanie text-[#78716C] text-5xl sm:text-6xl md:text-7xl font-normal lowercase inline-block mr-3 tracking-normal transform -translate-y-1 select-none">the</span>
            scrolling<br />
            generation.
          </h1>

          {/* Sub-headline */}
          <p className="text-base sm:text-lg text-[#78716C] max-w-[500px] mb-10 leading-relaxed font-light">
            A gentle space to collect your thoughts, track your moods, and find calm in the daily chaos.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="#waitlist"
              className="w-48 py-4 bg-[#FFB7B2] text-[#292524] font-bold rounded-full hover:shadow-[0_6px_25px_rgba(255,183,178,0.4)] active:scale-98 transition-all text-sm shadow-[0_4px_20px_-2px_rgba(255,183,178,0.25)]"
            >
              Start your journey
            </a>
            <a
              href="#experience"
              className="w-48 py-4 bg-white text-[#292524] font-semibold border border-stone-200 rounded-full hover:bg-stone-50 transition-colors active:scale-98 text-sm"
            >
              How it works
            </a>
          </div>
        </motion.div>
      </section>

      {/* Horizontal Scenario Scroll */}
      <section className="relative z-10 py-16">
        <div className="max-w-4xl mx-auto px-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#292524] sentence-case">
              designed for the moments when…
            </h2>
            <p className="text-sm text-[#78716C] mt-2">swipe to view scenarios</p>
          </motion.div>
        </div>

        {/* Scroll Container */}
        <div className="w-full overflow-x-auto py-4 px-6 scrollbar-hide flex gap-6 snap-x snap-mandatory">
          <div className="flex gap-6 max-w-7xl mx-auto px-4">
            {SCENARIOS.map((sc, i) => (
              <motion.div
                key={sc.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="snap-center shrink-0 w-72 h-40 bg-white border border-stone-100 rounded-[2rem] p-6 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.03)] flex flex-col justify-between group cursor-default transition-all duration-300"
              >
                <span className="text-[12px] font-mono text-[#78716C]">{sc.time}</span>
                <p 
                  className="text-lg text-[#292524] leading-snug font-medium transition-colors duration-300"
                  style={{
                    // Custom CSS variable for pastel hover color
                    '--hover-accent': sc.accent,
                  } as React.CSSProperties}
                >
                  <span className="group-hover:text-[var(--hover-accent)] transition-colors duration-300">
                    {sc.text}
                  </span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Experience Preview */}
      <section id="experience" className="relative z-10 py-24 bg-[#F8F7F2]/50 border-y border-stone-200/20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#292524] mb-4 sentence-case">
              tactile, analog interactions
            </h2>
            <p className="text-[#78716C] max-w-md mx-auto text-sm leading-relaxed font-light">
              putting down your phone starts with making it calm. softly is structured around three minimalist portals designed to bring you back to balance.
            </p>
          </motion.div>
        </div>

        {/* Stacked Phone Layout */}
        <div className="relative w-full max-w-3xl mx-auto h-[680px] sm:h-[720px] flex items-center justify-center px-4">
          
          {/* Left Phone: Sage Theme */}
          <motion.div
            initial={{ opacity: 0, x: -60, y: 80 }}
            whileInView={{ opacity: 0.8, x: -120, y: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute hidden sm:flex flex-col w-[280px] h-[580px] rounded-[3rem] bg-white border border-stone-200/50 shadow-xl overflow-hidden pointer-events-none z-10"
          >
            {/* Phone Screen Area */}
            <div className="flex-1 bg-[#E8EFE8] p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#78716C]/60 text-xs font-mono">
                <span>01:30 PM</span>
                <Volume2 size={14} />
              </div>
              
              <div className="my-auto text-center space-y-4">
                <span className="text-[#78716C] text-[10px] uppercase tracking-widest font-bold block">morning window</span>
                <h4 className="text-xl font-bold text-[#292524]">uncluttering the day</h4>
                <div className="w-16 h-16 rounded-full bg-white/40 mx-auto flex items-center justify-center">
                  <Sparkles size={24} className="text-[#78716C]" />
                </div>
              </div>

              <div className="text-center text-xs text-[#78716C]/70 font-mono">
                swipe down to close
              </div>
            </div>
          </motion.div>

          {/* Center Phone: Opaque Coral Breath Focus */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative w-[300px] h-[620px] rounded-[3.5rem] bg-white border border-stone-200 shadow-2xl p-3 flex flex-col overflow-hidden z-20"
          >
            {/* Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-4 rounded-full bg-stone-100/50 z-30" />

            {/* Main Phone Screen */}
            <div className="flex-1 rounded-[3rem] bg-[#FDFCF8] border border-stone-100 p-6 flex flex-col justify-between relative overflow-hidden">
              
              {/* Top Bar */}
              <div className="flex items-center justify-between text-[#78716C] text-xs font-mono">
                <span>tactile cycle</span>
                <Heart size={14} className="text-[#FFB7B2] fill-[#FFB7B2]" />
              </div>

              {/* Central Exercise */}
              <div className="flex flex-col items-center justify-center my-auto space-y-12">
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-[#292524] mb-2">inhale gently</h4>
                  <p className="text-xs text-[#78716C]">hold your thumb on the coral circle</p>
                </div>

                {/* Tactile Pulse Button */}
                <motion.button
                  animate={{
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-36 h-36 rounded-full bg-[#FFB7B2] flex items-center justify-center text-white font-bold tracking-widest text-[11px] uppercase cursor-pointer shadow-[0_8px_30px_rgba(255,183,178,0.4)] relative group border-none outline-none focus:ring-4 focus:ring-[#FFB7B2]/30"
                >
                  <span className="absolute inset-0 w-full h-full rounded-full border-4 border-[#FFB7B2]/20 animate-ping pointer-events-none" />
                  <span className="relative z-10 text-[#292524] font-extrabold">breathe</span>
                </motion.button>
              </div>

              {/* Bottom Instructions */}
              <div className="flex justify-center items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFB7B2]" />
                <span className="text-[10px] font-mono text-[#78716C]">cycle 3 of 5</span>
                <div className="w-1.5 h-1.5 rounded-full bg-stone-200" />
              </div>
            </div>
          </motion.div>

          {/* Right Phone: Lavender Theme */}
          <motion.div
            initial={{ opacity: 0, x: 60, y: 80 }}
            whileInView={{ opacity: 0.8, x: 120, y: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute hidden sm:flex flex-col w-[280px] h-[580px] rounded-[3rem] bg-white border border-stone-200/50 shadow-xl overflow-hidden pointer-events-none z-10"
          >
            {/* Phone Screen Area */}
            <div className="flex-1 bg-[#EFEDF4] p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#78716C]/60 text-xs font-mono">
                <span>10:30 PM</span>
                <Moon size={14} />
              </div>
              
              <div className="my-auto text-center space-y-4">
                <span className="text-[#78716C] text-[10px] uppercase tracking-widest font-bold block">evening release</span>
                <h4 className="text-xl font-bold text-[#292524]">setting down the day</h4>
                <div className="w-16 h-16 rounded-full bg-white/40 mx-auto flex items-center justify-center">
                  <Smile size={24} className="text-[#78716C]" />
                </div>
              </div>

              <div className="text-center text-xs text-[#78716C]/70 font-mono">
                release to lock
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Diary Entry Testimonials */}
      <section id="testimonials" className="relative z-10 py-28 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#FFB7B2] mb-3 block">diary pages</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#292524] sentence-case">
              real notes from quiet minds
            </h2>
          </motion.div>
        </div>

        {/* Diary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {TESTIMONIALS.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              style={{ rotate: test.rotation }}
              className="bg-white border border-stone-200/50 p-8 sm:p-10 rounded-[2.5rem] shadow-[0_10px_35px_-10px_rgba(0,0,0,0.04)] flex flex-col justify-between h-[320px] transition-all hover:rotate-0 duration-300"
            >
              {/* Custom ruled paper lines look */}
              <div className="space-y-4">
                <p className="text-stone-800 text-[15px] sm:text-base leading-relaxed italic font-light">
                  {test.text}
                </p>
              </div>

              {/* Cursive Signature */}
              <div className="flex items-center gap-4 mt-8">
                <div className="h-[1px] w-8 bg-stone-300" />
                <span className="font-reenie-beanie text-2xl text-stone-500 transform translate-y-1">
                  {test.author}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section id="faq" className="relative z-10 py-24 bg-[#F8F7F2]/30 border-t border-stone-200/20">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#292524] sentence-case">
              frequently asked
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isActive = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl border border-stone-100 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.03)] overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(isActive ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left font-medium text-stone-800 transition-colors hover:text-[#FFB7B2] focus:outline-none focus:text-[#FFB7B2]"
                  >
                    <span className="text-base sm:text-lg tracking-tight font-medium sentence-case">{faq.q}</span>
                    <motion.div
                      animate={{ rotate: isActive ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0 ml-4 p-1.5 rounded-full bg-stone-50 text-stone-500"
                    >
                      <Plus size={16} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 text-sm sm:text-base text-stone-500 leading-relaxed font-light">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Waitlist Conversion Section */}
      <section id="waitlist" className="relative z-10 py-32 px-6 bg-[#FDFCF8] text-[#292524] overflow-hidden">
        {/* Soft floating background gradients inside waitlist */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-32 left-1/3 w-96 h-96 rounded-full bg-[#FFB7B2] blur-[90px]" />
          <div className="absolute -bottom-32 left-10 w-96 h-96 rounded-full bg-[#EFEDF4] blur-[90px]" />
        </div>

        <div className="relative z-10 max-w-xl mx-auto text-center flex flex-col items-center">
          {/* Logo square box (dark stone rounded-square icon with coral dot) */}
          <div className="w-12 h-12 bg-[#292524] rounded-2xl flex items-center justify-center mb-8 shadow-md relative">
            <div className="w-3.5 h-3.5 rounded-full bg-[#FFB7B2]" />
            <span className="w-1 h-1 rounded-full bg-white absolute top-4 left-4" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-[#292524]">
            Ready to slow down?
          </h2>
          <p className="text-[#78716C] text-sm sm:text-base font-light mb-8 max-w-md">
            Join the waitlist to get early access and a free &ldquo;Calm Kit&rdquo; of digital wallpapers.
          </p>

          {/* Form */}
          <div className="w-full max-w-md">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form 
                  key="form"
                  onSubmit={handleSubscribe} 
                  className="flex flex-col sm:flex-row gap-3 w-full"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="flex-1 px-6 py-3.5 rounded-full bg-[#F5F5F4] border border-stone-200 text-[#292524] placeholder:text-stone-400 focus:outline-none focus:border-[#FFB7B2] text-sm transition-all"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3.5 bg-[#292524] text-[#FDFCF8] font-bold rounded-full text-sm hover:bg-stone-800 transition-all flex items-center justify-center cursor-pointer whitespace-nowrap"
                  >
                    Join Waitlist
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-white border border-stone-200 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-[#E8EFE8] text-[#292524] flex items-center justify-center">
                    <Check size={18} />
                  </div>
                  <h4 className="font-bold text-lg text-[#292524]">you’re on the list.</h4>
                  <p className="text-xs text-[#78716C]">we’ll reach out softly when a slot opens.</p>
                </motion.div>
              )}
            </AnimatePresence>
            <p className="text-[11px] text-[#78716C] mt-4 font-light">
              No spam, just calm updates. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-stone-200/20 bg-[#FDFCF8]">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFB7B2]" />
              <span className="text-sm font-bold tracking-tight text-[#292524]">Softly Inc.</span>
            </div>

            {/* Links */}
            <div className="flex gap-6 text-[13px] font-medium text-[#78716C]">
              <a href="#privacy" className="hover:text-[#292524] transition-colors">Privacy</a>
              <a href="#terms" className="hover:text-[#292524] transition-colors">Terms</a>
              <a href="#contact" className="hover:text-[#292524] transition-colors">Contact</a>
            </div>

            {/* Socials */}
            <div className="flex gap-4 text-[#78716C] text-sm">
              <a href="#instagram" aria-label="Instagram" className="hover:text-[#292524] transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="#twitter" aria-label="Twitter" className="hover:text-[#292524] transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="w-full border-t border-stone-200/10 pt-6">
            <p className="text-[11px] text-[#78716C]/60 text-center font-light leading-relaxed">
              &copy; 2024 Softly App. All rights reserved. Designed with intention.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
