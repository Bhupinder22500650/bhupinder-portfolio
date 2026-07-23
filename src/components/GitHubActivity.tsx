'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCommit, GitPullRequest, GitMerge, Terminal, Activity, Zap, Server } from 'lucide-react';
import { GITHUB_USERNAME } from '@/lib/constants';

interface StreamEvent {
  id: string;
  type: 'push' | 'merge' | 'deploy' | 'fix' | 'refactor';
  repo: string;
  message: string;
  hash: string;
}

const FAKE_MESSAGES = {
  push: ['Pushed to main', 'Updated documentation', 'Added new feature', 'Fixed styling issues', 'Updated dependencies'],
  merge: ['Merged pull request #42', 'Merged feature/auth into main', 'Merged hotfix', 'Resolved merge conflicts'],
  deploy: ['Deployed to production', 'Triggered CI/CD pipeline', 'Vercel deployment successful', 'Docker image built'],
  fix: ['Hotfix applied successfully', 'Patched memory leak', 'Fixed null pointer exception', 'Resolved CORS issue'],
  refactor: ['Refactored core logic', 'Optimized database queries', 'Cleaned up tech debt', 'Migrated to new API'],
};

const EVENT_TYPES = Object.keys(FAKE_MESSAGES) as Array<keyof typeof FAKE_MESSAGES>;

function generateHash() {
  return Math.random().toString(16).substring(2, 9);
}

export default function GitHubActivity() {
  const [repos, setRepos] = useState<string[]>([]);
  const [stream, setStream] = useState<StreamEvent[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const streamRef = useRef<HTMLDivElement>(null);

  // Fetch real repo names once
  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=30&sort=updated`);
        if (!res.ok) return;
        const data = await res.json();
        const repoNames = data.map((r: { name: string }) => r.name);
        if (repoNames.length > 0) {
          setRepos(repoNames);
        } else {
          setRepos(['bhupinder-portfolio', 'ecommerce-app', 'finance-tracker']);
        }
      } catch {
        setRepos(['bhupinder-portfolio', 'ecommerce-app', 'finance-tracker']);
      }
    }
    fetchRepos();
  }, []);

  const addStreamEvent = useCallback(() => {
    if (repos.length === 0) return;

    const type = EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)];
    const messages = FAKE_MESSAGES[type];
    const message = messages[Math.floor(Math.random() * messages.length)];
    const repo = repos[Math.floor(Math.random() * repos.length)];
    const hash = generateHash();

    const newEvent: StreamEvent = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      repo,
      message,
      hash
    };

    setStream(prev => [newEvent, ...prev].slice(0, 15));
  }, [repos]);

  // Start fast streaming when repos are loaded
  useEffect(() => {
    if (repos.length === 0) return;
    
    // Initial burst generated in a single batch to avoid multiple state updates
    const initialEvents: StreamEvent[] = [];
    for (let i = 0; i < 8; i++) {
      const type = EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)];
      const messages = FAKE_MESSAGES[type];
      const message = messages[Math.floor(Math.random() * messages.length)];
      const repo = repos[Math.floor(Math.random() * repos.length)];
      const hash = generateHash();
      initialEvents.push({
        id: Math.random().toString(36).substr(2, 9),
        type,
        repo,
        message,
        hash
      });
    }
    
    const timer = setTimeout(() => {
      setStream(initialEvents);
      setIsStreaming(true);
    }, 0);

    // Fast waterfall interval (every 400ms)
    const interval = setInterval(addStreamEvent, 400);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [repos, addStreamEvent]);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'push': return <GitCommit size={16} className="text-primary" />;
      case 'merge': return <GitMerge size={16} className="text-purple-400" />;
      case 'deploy': return <Server size={16} className="text-emerald-400" />;
      case 'fix': return <Zap size={16} className="text-amber-400" />;
      case 'refactor': return <GitPullRequest size={16} className="text-blue-400" />;
      default: return <Terminal size={16} className="text-outline" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'push': return 'text-primary';
      case 'merge': return 'text-purple-400';
      case 'deploy': return 'text-emerald-400';
      case 'fix': return 'text-amber-400';
      case 'refactor': return 'text-blue-400';
      default: return 'text-on-surface';
    }
  };

  return (
    <section className="py-16 md:py-24 bg-surface relative overflow-hidden">
      {/* Background Matrix-like gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface-container-lowest to-surface z-0 opacity-50" />
      
      <div className="max-w-4xl mx-auto px-6 md:px-10 relative z-10">
        
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-6 shadow-[0_0_15px_rgba(117,213,226,0.2)]"
          >
            <Activity size={14} className="text-primary animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Live Server Stream</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
          >
            Continuous Integration
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-on-surface-variant text-lg max-w-xl mx-auto"
          >
            A real-time simulation of high-velocity development across my repositories.
          </motion.p>
        </div>

        {/* Waterfall Container */}
        <div className="relative h-[450px] w-full rounded-xl bg-[#0a0a0a] border border-glass-stroke shadow-2xl overflow-hidden font-mono">
          
          {/* Terminal Header */}
          <div className="absolute top-0 left-0 w-full h-10 bg-[#1a1a1a] border-b border-glass-stroke flex items-center px-4 z-20">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="ml-4 text-xs text-on-surface-variant flex items-center gap-2">
              <Terminal size={12} /> root@bhupinder-server:~
            </span>
          </div>

          {/* Fade overlays for smooth entry/exit */}
          <div className="absolute top-10 left-0 w-full h-16 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

          {/* Stream Content */}
          <div className="absolute top-10 bottom-0 left-0 right-0 p-4 pt-8 overflow-hidden" ref={streamRef}>
            {!isStreaming ? (
              <div className="text-primary text-sm animate-pulse">Initializing connection to build servers...</div>
            ) : (
              <div className="flex flex-col gap-2">
                <AnimatePresence>
                  {stream.map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                      className="flex items-center gap-3 text-sm border-l-2 border-transparent hover:border-glass-stroke pl-2 transition-colors cursor-default"
                    >
                      <div className="w-20 shrink-0 text-xs text-on-surface-variant/50">
                        [{event.hash}]
                      </div>
                      
                      <div className="flex items-center justify-center w-6 h-6 rounded bg-surface-container-lowest border border-glass-stroke shrink-0">
                        {getEventIcon(event.type)}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 flex-1 overflow-hidden">
                        <span className={`font-semibold shrink-0 ${getEventColor(event.type)}`}>
                          {event.message}
                        </span>
                        <span className="text-on-surface-variant/40 hidden sm:inline-block">→</span>
                        <span className="text-on-surface truncate opacity-80">
                          {event.repo}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
