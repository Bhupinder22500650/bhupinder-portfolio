'use client';

import { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL_INFO, SKILLS } from '@/lib/constants';

const skillsString = SKILLS.map(group => `${group.category}: ${group.items.join(', ')}`).join(' | ');

const COMMANDS: Record<string, string | (() => string | React.ReactNode)> = {
  help: 'Available commands: help, whoami, about, skills, projects, contact, date, clear, echo [text]',
  whoami: `${PERSONAL_INFO.name} - ${PERSONAL_INFO.title}`,
  about: PERSONAL_INFO.tagline,
  contact: `Email: ${PERSONAL_INFO.email} | LinkedIn: ${PERSONAL_INFO.linkedin} | GitHub: ${PERSONAL_INFO.github}`,
  skills: skillsString,
  projects: 'Featured Projects: My-Pay-tracker (React Native/Expo), car-dealership-project-website (PHP/MySQL), Lost-and-Found-Campus (TypeScript/React)',
  date: () => new Date().toString(),
  sudo: 'Nice try! This incident will be reported.',
};

export default function TerminalMode() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ type: 'input' | 'output'; text: string | React.ReactNode }[]>([
    { type: 'output', text: 'Welcome to B.Singh Terminal [Version 1.0.0]' },
    { type: 'output', text: 'Type "help" to see available commands.' },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newHistory = [...history, { type: 'input' as const, text: input }];
    const args = input.trim().split(' ');
    const cmd = args[0].toLowerCase();

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (cmd === 'echo') {
      newHistory.push({ type: 'output', text: args.slice(1).join(' ') });
    } else if (COMMANDS[cmd]) {
      const response = COMMANDS[cmd];
      newHistory.push({
        type: 'output',
        text: typeof response === 'function' ? response() : response,
      });
    } else {
      newHistory.push({ type: 'output', text: `Command not found: ${cmd}. Type "help" for a list of commands.` });
    }

    setHistory(newHistory);
    setInput('');
  };

  if (!mounted) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-20 z-40 w-12 h-12 rounded-full bg-surface-container-high border border-glass-stroke text-on-surface flex items-center justify-center shadow-lg hover:scale-110 hover:text-primary transition-all active:scale-95"
        title="Open Terminal (Ctrl+K)"
      >
        <TerminalIcon size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`fixed z-50 overflow-hidden bg-[#0d0d0d] border border-glass-stroke shadow-2xl flex flex-col font-mono text-sm sm:text-base ${
              isMaximized
                ? 'inset-0 rounded-none'
                : 'bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-[600px] h-[400px] rounded-xl'
            }`}
          >
            {/* Terminal Header */}
            <div className="bg-[#1a1a1a] border-b border-glass-stroke px-4 py-2 flex items-center justify-between select-none">
              <div className="flex gap-2">
                <button onClick={() => setIsOpen(false)} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400" />
                <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400" />
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center group"
                >
                  {isMaximized ? (
                    <Minimize2 size={8} className="opacity-0 group-hover:opacity-100 text-green-900" />
                  ) : (
                    <Maximize2 size={8} className="opacity-0 group-hover:opacity-100 text-green-900" />
                  )}
                </button>
              </div>
              <div className="text-xs text-on-surface-variant font-medium">bash - bhupinder@portfolio: ~</div>
              <button onClick={() => setIsOpen(false)} className="text-on-surface-variant hover:text-white">
                <X size={14} />
              </button>
            </div>

            {/* Terminal Body */}
            <div
              className="flex-1 overflow-y-auto p-4 text-green-400"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((line, i) => (
                <div key={i} className="mb-1 whitespace-pre-wrap break-words">
                  {line.type === 'input' ? (
                    <span className="text-white">
                      <span className="text-primary font-bold">bhupinder@portfolio</span>
                      <span className="text-on-surface-variant">:</span>
                      <span className="text-blue-400">~</span>$ {line.text}
                    </span>
                  ) : (
                    <span>{line.text}</span>
                  )}
                </div>
              ))}
              <form onSubmit={handleCommand} className="flex mt-1">
                <span className="text-white shrink-0">
                  <span className="text-primary font-bold">bhupinder@portfolio</span>
                  <span className="text-on-surface-variant">:</span>
                  <span className="text-blue-400">~</span>$
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-white ml-2"
                  autoFocus
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
              <div ref={endRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
