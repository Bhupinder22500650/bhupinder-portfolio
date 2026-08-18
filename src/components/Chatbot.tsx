'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL_INFO, SKILLS, EDUCATION } from '@/lib/constants';

type Message = {
  id: string;
  type: 'bot' | 'user';
  text: string;
};

const SUGGESTED_QUESTIONS = [
  'What are your top skills?',
  'Tell me about your QA & testing experience',
  'Where did you study?',
  'How can I contact Bhupinder?',
];

const INITIAL_MESSAGE: Message = {
  id: 'init',
  type: 'bot',
  text: "Welcome! I am a rule-based Portfolio Assistant Demo. Click a suggested question below or type a query to search details about Bhupinder's experience and skills.",
};

// Format skills dynamically from constants
const strongSkills = SKILLS.find((s) => s.category === 'Strong')?.items.join(', ') || '';
const workingSkills = SKILLS.find((s) => s.category === 'Working Knowledge')?.items.join(', ') || '';
const learningSkills = SKILLS.find((s) => s.category === 'Learning')?.items.join(', ') || '';

// Format experience dynamically from constants
const activeRoles = EDUCATION.filter((item) => item.current)
  .map((item) => `${item.title} at ${item.institution}`)
  .join('; ');
const pastRoles = EDUCATION.filter((item) => !item.current)
  .map((item) => `${item.title} at ${item.institution}`)
  .join('; ');

function getBotResponse(input: string): string {
  const lower = input.toLowerCase().trim();

  if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack')) {
    return `Bhupinder's skills categorized in the portfolio:
• Strong: ${strongSkills}
• Working Knowledge: ${workingSkills}
• Learning: ${learningSkills}`;
  }

  if (lower.includes('test') || lower.includes('qa') || lower.includes('bug')) {
    const testRole = EDUCATION.find(
      (e) => e.title.toLowerCase().includes('tester') || e.title.toLowerCase().includes('testing')
    );
    if (testRole) {
      return `Bhupinder serves as a ${testRole.title} at ${testRole.institution} (${testRole.period}). Role summary: ${testRole.description}`;
    }
    return `Bhupinder focuses on manual testing fundamentals, functional validation, UI/UX diagnostics, edge case testing, and structured bug reporting.`;
  }

  if (lower.includes('study') || lower.includes('education') || lower.includes('degree') || lower.includes('weltec')) {
    const edu = EDUCATION.find((e) => e.institution.includes('Wellington Institute of Technology') || e.title.includes('Bachelor'));
    if (edu) {
      return `Bhupinder is studying for his ${edu.title} at ${edu.institution} (${edu.period}). Focus areas: ${edu.description}`;
    }
    return `Bhupinder is pursuing a Bachelor of Information Technology at Wellington Institute of Technology (WelTec).`;
  }

  if (lower.includes('experience') || lower.includes('work') || lower.includes('job') || lower.includes('role')) {
    return `Current active roles: ${activeRoles}. Previous background includes: ${pastRoles}.`;
  }

  if (
    lower.includes('contact') ||
    lower.includes('email') ||
    lower.includes('reach') ||
    lower.includes('hire') ||
    lower.includes('linkedin')
  ) {
    return `You can reach Bhupinder via:
• Email: ${PERSONAL_INFO.email}
• LinkedIn: ${PERSONAL_INFO.linkedin}
• GitHub: ${PERSONAL_INFO.github}
• Location: ${PERSONAL_INFO.location}
Or send a message using the contact form on this page!`;
  }

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return `Hello! Select one of the suggested questions below or type a query about skills, testing, education, or contact options.`;
  }

  return `I am a rule-based helper programmed for specific portfolio topics. For custom questions, please email Bhupinder directly at ${PERSONAL_INFO.email} or submit the contact form below.`;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing, isOpen]);

  const sendQuestion = async (queryText: string) => {
    const userText = queryText.trim();
    if (!userText || isProcessing) return;

    setInput('');
    setMessages((prev) => [...prev, { id: Date.now().toString(), type: 'user', text: userText }]);

    setIsProcessing(true);
    await new Promise((res) => setTimeout(res, 300));

    const botResponse = getBotResponse(userText);
    setIsProcessing(false);

    setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), type: 'bot', text: botResponse }]);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuestion(input);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-primary/30 transition-all active:scale-95 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
        title="Portfolio Assistant Demo (Rule-based)"
        aria-label="Open Portfolio Assistant Demo"
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
            className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 h-[520px] max-h-[80vh] flex flex-col bg-surface border border-glass-stroke shadow-2xl rounded-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-surface-container-high border-b border-glass-stroke p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-on-surface text-sm">Portfolio Assistant Demo</h3>
                  <p className="text-xs text-on-surface-variant flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-surface-variant" />
                    Rule-based Q&amp;A
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-on-surface-variant hover:text-white transition-colors p-1"
                aria-label="Close Assistant"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface/50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-2 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div
                      className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${
                        msg.type === 'user' ? 'bg-surface-container-highest text-on-surface' : 'bg-primary/20 text-primary'
                      }`}
                    >
                      {msg.type === 'user' ? <User size={12} /> : <Bot size={12} />}
                    </div>
                    <div
                      className={`p-3 rounded-2xl text-sm whitespace-pre-line ${
                        msg.type === 'user'
                          ? 'bg-surface-container-highest text-on-surface rounded-tr-sm'
                          : 'bg-primary text-on-primary rounded-tl-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}

              {/* Processing Indicator */}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[85%] flex-row">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <Bot size={12} />
                    </div>
                    <div className="p-3 rounded-2xl bg-surface-container text-on-surface text-xs rounded-tl-sm">
                      Searching portfolio index…
                    </div>
                  </div>
                </div>
              )}

              {/* Suggested Questions Chips */}
              <div className="pt-2">
                <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-2">
                  <HelpCircle size={12} />
                  <span>Suggested questions:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendQuestion(q)}
                      disabled={isProcessing}
                      className="text-xs text-left px-3 py-1.5 rounded-full bg-surface-container-high border border-glass-stroke text-on-surface-variant hover:text-primary hover:border-primary/50 transition-colors disabled:opacity-50"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-surface-container border-t border-glass-stroke p-3">
              <form onSubmit={handleSend} className="flex gap-2 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a portfolio question..."
                  className="flex-1 bg-surface-container-high border border-glass-stroke rounded-full px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant outline-none focus:border-primary transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isProcessing}
                  className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                  aria-label="Send query"
                >
                  <Send size={16} className="ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
