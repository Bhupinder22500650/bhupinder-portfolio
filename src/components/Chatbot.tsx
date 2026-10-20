'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, HelpCircle, RotateCcw, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ASSISTANT_WELCOME, getAssistantReply, SUGGESTED_QUESTIONS,
  type AssistantAction, type AssistantContext,
} from '@/lib/assistant';

type Message = {
  id: string;
  type: 'bot' | 'user';
  text: string;
  actions?: AssistantAction[];
};

const INITIAL_MESSAGE: Message = {
  id: 'init',
  type: 'bot',
  text: ASSISTANT_WELCOME,
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [conversation, setConversation] = useState<{ messages: Message[]; context: AssistantContext; suggestions: string[] }>({
    messages: [INITIAL_MESSAGE], context: {}, suggestions: SUGGESTED_QUESTIONS,
  });
  const { messages, suggestions } = conversation;
  const [input, setInput] = useState('');
  const messagesViewportRef = useRef<HTMLDivElement>(null);
  const latestReplyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;
    const viewport = messagesViewportRef.current;
    const latest = latestReplyRef.current;
    if (!viewport || !latest) return;
    const replyTop = latest.getBoundingClientRect().top - viewport.getBoundingClientRect().top + viewport.scrollTop;
    // Keep the start of a long answer visible instead of jumping past its content.
    viewport.scrollTo({
      top: viewport.scrollHeight - replyTop > viewport.clientHeight ? Math.max(0, replyTop - 16) : viewport.scrollHeight,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  }, [messages, isOpen, reducedMotion]);

  const sendQuestion = (queryText: string) => {
    const text = queryText.trim().slice(0, 1000);
    if (!text) return;
    setInput('');
    const userId = crypto.randomUUID();
    const responseId = crypto.randomUUID();
    setConversation(previous => {
      const response = getAssistantReply(text, previous.context);
      return {
        messages: [...previous.messages,
          { id: userId, type: 'user', text },
          { id: responseId, type: 'bot', text: response.text, actions: response.actions },
        ],
        context: response.context,
        suggestions: response.suggestions,
      };
    });
    inputRef.current?.focus({ preventScroll: true });
  };

  const closeAssistant = () => {
    setIsOpen(false);
    launcherRef.current?.focus({ preventScroll: true });
  };

  const resetConversation = () => {
    setConversation({ messages: [INITIAL_MESSAGE], context: {}, suggestions: SUGGESTED_QUESTIONS });
    setInput('');
    inputRef.current?.focus({ preventScroll: true });
  };

  useEffect(() => {
    if (!isOpen) return;
    const focusTimer = window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 100);
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        launcherRef.current?.focus({ preventScroll: true });
      }
    };
    window.addEventListener('keydown', close);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', close);
    };
  }, [isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuestion(input);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        ref={launcherRef}
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-controls="portfolio-assistant"
        tabIndex={isOpen ? -1 : 0}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-primary/30 transition-all active:scale-95 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
        title="Portfolio Assistant"
        aria-label="Open Portfolio Assistant"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="portfolio-assistant"
            role="dialog"
            aria-modal="false"
            aria-labelledby="portfolio-assistant-title"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-48px)] sm:w-96 h-[520px] max-h-[80dvh] flex flex-col bg-surface border border-glass-stroke shadow-2xl rounded-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-surface-container-high border-b border-glass-stroke p-4 flex items-center justify-between">
              <div className="min-w-0 flex flex-1 items-center gap-3">
                <div className="shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Bot size={18} />
                </div>
                <div className="min-w-0">
                  <h3 id="portfolio-assistant-title" className="truncate font-bold text-on-surface text-sm">Portfolio Assistant</h3>
                  <p className="text-[11px] text-on-surface-variant flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Explore Bhupinder’s work
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={resetConversation}
                  className="p-2 text-on-surface-variant hover:text-primary transition-colors"
                  aria-label="Start a new conversation"
                  title="Start a new conversation"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  type="button"
                  onClick={closeAssistant}
                  className="text-on-surface-variant hover:text-primary transition-colors p-2"
                  aria-label="Close Assistant"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div ref={messagesViewportRef} role="log" aria-label="Assistant conversation" aria-live="polite" className="min-h-0 flex-1 overflow-y-auto p-4 space-y-4 bg-surface/50">
              {messages.map((msg, index) => (
                <div ref={index === messages.length - 1 ? latestReplyRef : undefined} key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`min-w-0 flex gap-2 max-w-[90%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div
                      className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${
                        msg.type === 'user' ? 'bg-surface-container-highest text-on-surface' : 'bg-primary/20 text-primary'
                      }`}
                    >
                      {msg.type === 'user' ? <User size={12} /> : <Bot size={12} />}
                    </div>
                    <div
                      className={`min-w-0 p-3 rounded-2xl text-sm whitespace-pre-line [overflow-wrap:anywhere] ${
                        msg.type === 'user'
                          ? 'bg-surface-container-highest text-on-surface rounded-tr-sm'
                          : 'bg-primary text-on-primary rounded-tl-sm'
                      }`}
                    >
                      {msg.text}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2" aria-label="Related links">
                          {msg.actions.map(action => (
                            <a
                              key={action.href}
                              href={action.href}
                              download={action.download ? 'Bhupinder_Singh_CV.pdf' : undefined}
                              target={action.href.startsWith('https://') || action.href.startsWith('/certificates/') ? '_blank' : undefined}
                              rel={action.href.startsWith('https://') || action.href.startsWith('/certificates/') ? 'noopener noreferrer' : undefined}
                              onClick={() => { if (action.href.startsWith('/#')) closeAssistant(); }}
                              className="inline-flex items-center gap-1 rounded-lg border border-current/30 px-2.5 py-1.5 text-xs font-semibold hover:bg-on-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                              {action.label}<ArrowUpRight size={12} aria-hidden="true" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Suggested Questions Chips */}
              <div className="pt-2">
                <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-2">
                  <HelpCircle size={12} />
                  <span>Suggested questions:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {suggestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendQuestion(q)}
                      className="text-xs text-left px-3 py-1.5 rounded-full bg-surface-container-high border border-glass-stroke text-on-surface-variant hover:text-primary hover:border-primary/50 transition-colors disabled:opacity-50"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Input Area */}
            <div className="bg-surface-container border-t border-glass-stroke p-3">
              <form onSubmit={handleSend} className="flex gap-2 relative">
                <input
                  ref={inputRef}
                  aria-label="Ask a portfolio question"
                  maxLength={1000}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a portfolio question..."
                  className="min-w-0 flex-1 bg-surface-container-high border border-glass-stroke rounded-full px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant outline-none focus:border-primary transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
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
