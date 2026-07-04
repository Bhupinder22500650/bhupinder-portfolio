'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, CheckCircle2, Circle, X } from 'lucide-react';

const TEST_SUITE = [
  { id: '1', name: 'Verify Hero section renders correctly', duration: 800 },
  { id: '2', name: 'Check navigation links for broken URLs', duration: 1200 },
  { id: '3', name: 'Validate About timeline chronological order', duration: 1500 },
  { id: '4', name: 'Ensure Project grid is responsive', duration: 1000 },
  { id: '5', name: 'Simulate Contact form validation errors', duration: 1400 },
  { id: '6', name: 'Check Accessibility (A11y) contrast ratio', duration: 900 },
];

interface LiveTesterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LiveTester({ isOpen, onClose }: LiveTesterProps) {
  const [running, setRunning] = useState(false);
  const [completedTests, setCompletedTests] = useState<string[]>([]);
  const [currentTest, setCurrentTest] = useState<string | null>(null);

  const runTests = async () => {
    setRunning(true);
    setCompletedTests([]);

    for (const test of TEST_SUITE) {
      setCurrentTest(test.id);
      
      // Auto-scroll the page a little bit to simulate the runner moving
      window.scrollBy({ top: 300, behavior: 'smooth' });
      
      await new Promise(resolve => setTimeout(resolve, test.duration));
      
      setCompletedTests(prev => [...prev, test.id]);
    }
    
    setCurrentTest(null);
    setRunning(false);
    
    // Scroll back up
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
  };

  useEffect(() => {
    if (!isOpen) {
      setRunning(false);
      setCompletedTests([]);
      setCurrentTest(null);
      return;
    }

    if (isOpen && !running && completedTests.length === 0) {
      runTests();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          className="fixed top-24 right-6 w-80 sm:w-96 bg-[#1e1e1e] border border-glass-stroke shadow-2xl rounded-xl z-50 overflow-hidden font-mono text-sm"
        >
          {/* Header */}
          <div className="bg-[#2d2d2d] border-b border-glass-stroke p-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-on-surface">
              <Play size={16} className="text-primary" />
              <span className="font-bold tracking-wider text-xs">CYPRESS_MOCK_RUNNER</span>
            </div>
            <button onClick={onClose} className="text-on-surface-variant hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>

          {/* Test List */}
          <div className="p-4 max-h-[400px] overflow-y-auto space-y-3">
            {TEST_SUITE.map(test => {
              const isCompleted = completedTests.includes(test.id);
              const isRunning = currentTest === test.id;
              
              return (
                <div key={test.id} className={`flex items-start gap-3 ${isCompleted ? 'opacity-100' : isRunning ? 'opacity-100' : 'opacity-40'}`}>
                  <div className="mt-0.5">
                    {isCompleted ? (
                      <CheckCircle2 size={16} className="text-green-500" />
                    ) : isRunning ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      >
                        <Circle size={16} className="text-blue-400 border-t-transparent border-blue-400 border-2 rounded-full" />
                      </motion.div>
                    ) : (
                      <Circle size={16} className="text-outline-variant" />
                    )}
                  </div>
                  <div className={`flex-1 ${isCompleted ? 'text-green-400' : isRunning ? 'text-blue-300' : 'text-on-surface-variant'}`}>
                    {test.name}
                    {isRunning && <span className="ml-2 animate-pulse text-xs text-blue-400">running...</span>}
                    {isCompleted && <span className="ml-2 text-xs text-green-500 font-bold opacity-70">{test.duration}ms</span>}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Footer */}
          <div className="bg-[#2d2d2d] border-t border-glass-stroke p-3 flex justify-between items-center text-xs">
            {running ? (
              <span className="text-blue-400 font-bold animate-pulse">Tests in progress...</span>
            ) : (
              <span className="text-green-500 font-bold">{completedTests.length} tests passed</span>
            )}
            
            {!running && completedTests.length > 0 && (
              <button 
                onClick={runTests}
                className="px-3 py-1 bg-surface-container hover:bg-surface-container-high rounded text-on-surface"
              >
                Run Again
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
