'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  id: string;
  type: 'bot' | 'user';
  text: string;
};

const INITIAL_MESSAGE: Message = {
  id: 'init',
  type: 'bot',
  text: "Hi! I'm Bhupinder's AI Assistant. Ask me about his skills, experience, or how to contact him!",
};

import { PERSONAL_INFO, SKILLS, EDUCATION } from '@/lib/constants';

// Format skills dynamically
const strongSkills = SKILLS.find(s => s.category === 'Strong')?.items.join(', ') || '';
const workingSkills = SKILLS.find(s => s.category === 'Working Knowledge')?.items.join(', ') || '';
const learningSkills = SKILLS.find(s => s.category === 'Learning')?.items.join(', ') || '';

// Format experience dynamically
const currentJobs = EDUCATION.filter(item => item.current).map(item => `${item.title} at ${item.institution}`).join(' and ');
const pastJobs = EDUCATION.filter(item => !item.current).map(item => `${item.title} at ${item.institution}`).join(', ');

// Simple rule-based logic
function getBotResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack')) {
    return `Bhupinder's skills are divided into:
• Strong: ${strongSkills}
• Working Knowledge: ${workingSkills}
• Learning: ${learningSkills}`;
  }
  if (lower.includes('test') || lower.includes('qa')) {
    const testJob = EDUCATION.find(e => e.title.toLowerCase().includes('tester') || e.title.toLowerCase().includes('testing'));
    if (testJob) {
      return `Bhupinder is currently working as a ${testJob.title} at ${testJob.institution}. His role involves: ${testJob.description}`;
    }
    return `Bhupinder has a dedicated testing mindset, focusing on manual testing basics, functionality checking, user flows, UI/UX diagnostics, and bug reporting.`;
  }
  if (lower.includes('experience') || lower.includes('work') || lower.includes('job')) {
    return `Bhupinder's active roles include: ${currentJobs}. Previously, he has experience as a ${pastJobs}.`;
  }
  if (lower.includes('contact') || lower.includes('hire') || lower.includes('email')) {
    return `You can reach Bhupinder directly via email at ${PERSONAL_INFO.email}, connect with him on LinkedIn: ${PERSONAL_INFO.linkedin}, or view his projects on GitHub: ${PERSONAL_INFO.github}. You can also use the contact form at the bottom of the page!`;
  }
  if (lower.includes('hello') || lower.includes('hi ') || lower.includes('hey')) {
    return `Hello there! How can I help you learn more about Bhupinder?`;
  }

  return `That's a great question! While I'm just a simple chatbot, Bhupinder would love to discuss this with you. Feel free to reach out to him via the contact form or email!`;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setInput('');

    // Add user message
    setMessages(prev => [...prev, { id: Date.now().toString(), type: 'user', text: userText }]);

    // Simulate thinking delay
    setIsTyping(true);
    await new Promise(res => setTimeout(res, 800 + Math.random() * 1000));

    const botResponse = getBotResponse(userText);
    setIsTyping(false);

    // Add bot message
    setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), type: 'bot', text: botResponse }]);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-primary/30 transition-all active:scale-95 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        title="Chat with my Resume"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 h-[500px] max-h-[80vh] flex flex-col bg-surface border border-glass-stroke shadow-2xl rounded-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-surface-container-high border-b border-glass-stroke p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-on-surface text-sm">Resume Assistant</h3>
                  <p className="text-xs text-on-surface-variant flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-on-surface-variant hover:text-white transition-colors p-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface/50">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-2 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${msg.type === 'user' ? 'bg-surface-container-highest text-on-surface' : 'bg-primary/20 text-primary'}`}>
                      {msg.type === 'user' ? <User size={12} /> : <Bot size={12} />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm ${msg.type === 'user'
                      ? 'bg-surface-container-highest text-on-surface rounded-tr-sm'
                      : 'bg-primary text-on-primary rounded-tl-sm'
                      }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[85%] flex-row">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <Bot size={12} />
                    </div>
                    <div className="p-4 rounded-2xl bg-surface-container text-on-surface rounded-tl-sm flex gap-1">
                      <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-on-surface-variant rounded-full" />
                      <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-on-surface-variant rounded-full" />
                      <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-on-surface-variant rounded-full" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-surface-container border-t border-glass-stroke p-3">
              <form onSubmit={handleSend} className="flex gap-2 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about my experience..."
                  className="flex-1 bg-surface-container-high border border-glass-stroke rounded-full px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant outline-none focus:border-primary transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                >
                  <Send size={16} className="ml-1" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
