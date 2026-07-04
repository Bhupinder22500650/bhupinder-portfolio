'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Star, Calendar, Image as ImageIcon, FileText, X } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import { useGitHubRepos, GitHubRepo } from '@/hooks/useGitHubRepos';
import { GITHUB_USERNAME, LANGUAGE_COLORS } from '@/lib/constants';
import Image from 'next/image';

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

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-NZ', { month: 'short', year: 'numeric' });
}

function formatRepoName(name: string) {
  return name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function ProjectCard({ repo, onOpenCaseStudy }: { repo: GitHubRepo; onOpenCaseStudy: () => void }) {
  const tags = repo.topics?.length ? repo.topics.slice(0, 3) : repo.language ? [repo.language] : [];
  const langColor = LANGUAGE_COLORS[repo.language || ''] || '#75d5e2';

  return (
    <div className="group relative bg-surface rounded-lg overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:bg-surface-bright flex flex-col h-full border border-glass-stroke">
      {/* Top accent line */}
      <div
        className="h-[3px] w-0 group-hover:w-full transition-all duration-500"
        style={{ background: `linear-gradient(90deg, ${langColor}, var(--color-primary))` }}
      />

      {/* Thumbnail Placeholder/Image */}
      {repo.images && repo.images[0] ? (
        <div className="relative w-full h-40 bg-surface-variant/50 border-b border-glass-stroke overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant/50 z-0">
            <ImageIcon size={48} />
            <span className="ml-2 text-sm">Image Placeholder</span>
          </div>
          {/* The image is currently a placeholder, it will load if the file exists */}
          <Image src={repo.images[0]} alt={repo.name} fill className="object-cover z-10" onError={(e) => (e.currentTarget.style.display = 'none')} />
        </div>
      ) : (
        <div className="relative w-full h-40 bg-surface-variant flex items-center justify-center border-b border-glass-stroke text-on-surface-variant/50">
          <ImageIcon size={48} />
        </div>
      )}

      <div className="p-6 md:p-8 flex flex-col flex-1">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded border border-glass-stroke text-on-surface-variant"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-on-surface mb-3 tracking-tight group-hover:text-primary transition-colors">
          {formatRepoName(repo.name)}
        </h3>

        <p className="text-on-surface-variant text-sm leading-relaxed flex-1 mb-6">
          {repo.description || 'No description provided for this repository.'}
        </p>

        <div className="flex items-center gap-4 text-xs text-on-surface-variant mb-6 flex-wrap">
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: langColor }} />
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Star size={11} />
            {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {formatDate(repo.updated_at)}
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mt-auto">
          <button
            onClick={onOpenCaseStudy}
            className="flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2.5 bg-primary text-on-primary hover:opacity-90 transition-opacity duration-200 rounded-full text-sm font-bold active:scale-95"
          >
            <FileText size={16} />
            Case Study
          </button>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 flex items-center justify-center gap-2 py-2.5 rounded-full border border-glass-stroke hover:bg-surface-variant text-sm font-bold text-on-surface-variant hover:text-on-surface transition-all active:scale-95"
          >
            <GithubIcon size={14} />
            GitHub
          </a>
          {repo.homepage ? (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 flex items-center justify-center gap-2 py-2.5 rounded-full border border-glass-stroke hover:bg-surface-variant text-sm font-bold text-on-surface-variant hover:text-on-surface transition-all active:scale-95"
              title="Live Demo"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          ) : repo.isMobileApp ? (
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 flex items-center justify-center gap-2 py-2.5 rounded-full border border-glass-stroke hover:bg-surface-variant text-sm font-bold text-on-surface-variant hover:text-on-surface transition-all active:scale-95"
            >
              <FileText size={14} />
              Docs
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-surface-container-low rounded-xl p-8 h-[380px] flex flex-col gap-4">
      <div className="h-48 w-full bg-surface-variant animate-pulse rounded" />
      <div className="flex gap-2 mt-4">
        <div className="h-5 w-14 rounded shimmer" />
        <div className="h-5 w-10 rounded shimmer" />
      </div>
      <div className="h-6 w-3/4 rounded shimmer" />
      <div className="space-y-2 flex-1">
        <div className="h-4 w-full rounded shimmer" />
        <div className="h-4 w-5/6 rounded shimmer" />
        <div className="h-4 w-4/6 rounded shimmer" />
      </div>
      <div className="h-10 w-full rounded shimmer" />
    </div>
  );
}

export default function Projects() {
  const { repos, loading, error } = useGitHubRepos();
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);

  return (
    <section id="projects" className="py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <FadeUp>
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
                Portfolio
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tighter">
                Selected Projects
              </h2>
              <p className="text-on-surface-variant mt-3 text-lg">
                Practical projects I have built and tested.
              </p>
            </div>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-primary font-bold text-sm hover:underline underline-offset-4 whitespace-nowrap"
            >
              View GitHub
              <ExternalLink size={14} />
            </a>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : repos.map((repo, i) => (
              <FadeUp key={repo.name} delay={i * 0.1}>
                <ProjectCard repo={repo} onOpenCaseStudy={() => setSelectedRepo(repo)} />
              </FadeUp>
            ))}
        </div>

        {/* Global Case Study Modal */}
        <AnimatePresence>
          {selectedRepo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            >
              <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer" 
                onClick={() => setSelectedRepo(null)} 
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-surface rounded-2xl border border-glass-stroke p-8 md:p-10 shadow-2xl z-10"
              >
                <button 
                  onClick={() => setSelectedRepo(null)} 
                  className="absolute top-4 right-4 p-2 rounded-full bg-surface-variant text-on-surface-variant hover:text-primary hover:bg-surface-bright transition-colors"
                >
                  <X size={20} />
                </button>
                
                <h3 className="text-3xl font-bold text-on-surface mb-2 tracking-tight font-headline">
                  {formatRepoName(selectedRepo.name)}
                </h3>
                <p className="text-primary font-mono text-sm tracking-widest uppercase font-bold mb-8">Case Study</p>
                
                <div className="space-y-8 pt-6 border-t border-glass-stroke text-base text-on-surface-variant leading-relaxed">
                  {selectedRepo.problem && (
                    <div>
                      <strong className="block text-on-surface text-lg mb-2">The Problem</strong>
                      <p>{selectedRepo.problem}</p>
                    </div>
                  )}
                  {selectedRepo.solution && (
                    <div>
                      <strong className="block text-on-surface text-lg mb-2">The Solution</strong>
                      <p>{selectedRepo.solution}</p>
                    </div>
                  )}
                  {selectedRepo.techStack && (
                    <div>
                      <strong className="block text-on-surface text-lg mb-2">Tech Stack</strong>
                      <div className="flex flex-wrap gap-2">
                        {selectedRepo.techStack.map(tech => (
                          <span key={tech} className="px-3 py-1 bg-surface-variant rounded-full text-xs font-mono">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedRepo.role && (
                    <div>
                      <strong className="block text-on-surface text-lg mb-2">My Role</strong>
                      <p>{selectedRepo.role}</p>
                    </div>
                  )}
                  {selectedRepo.features && (
                    <div>
                      <strong className="block text-on-surface text-lg mb-2">Key Features</strong>
                      <ul className="list-disc pl-5 space-y-2">
                        {selectedRepo.features.map(f => <li key={f}>{f}</li>)}
                      </ul>
                    </div>
                  )}
                  {selectedRepo.testing && (
                    <div>
                      <strong className="block text-on-surface text-lg mb-2">Testing Done</strong>
                      <ul className="list-disc pl-5 space-y-2">
                        {selectedRepo.testing.map(t => <li key={t}>{t}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <FadeUp>
            <p className="text-center text-on-surface-variant text-sm mt-8 opacity-60">
              Showing static projects — GitHub API unavailable.
            </p>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
