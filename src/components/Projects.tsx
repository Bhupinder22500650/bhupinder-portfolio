'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Download, Star, Calendar } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import { useGitHubRepos, GitHubRepo } from '@/hooks/useGitHubRepos';
import { GITHUB_USERNAME, LANGUAGE_COLORS } from '@/lib/constants';

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

function ProjectCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  const tags = repo.topics?.length ? repo.topics.slice(0, 3) : repo.language ? [repo.language] : [];
  const langColor = LANGUAGE_COLORS[repo.language || ''] || '#75d5e2';
  const archiveUrl = `${repo.html_url}/archive/refs/heads/main.zip`;

  return (
    <FadeUp delay={index * 0.09}>
      <div className="group relative bg-surface-container-low rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:bg-surface-container-high shadow-[0px_24px_48px_rgba(0,0,0,0.15)] hover:shadow-[0px_32px_64px_rgba(0,0,0,0.25)] flex flex-col h-full">
        {/* Top accent line */}
        <div
          className="h-[3px] w-0 group-hover:w-full transition-all duration-500"
          style={{ background: `linear-gradient(90deg, ${langColor}, #75d5e2)` }}
        />

        <div className="p-8 flex flex-col flex-1">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-on-surface mb-3 tracking-tight group-hover:text-primary transition-colors">
            {formatRepoName(repo.name)}
          </h3>

          {/* Description */}
          <p className="text-on-surface-variant text-sm leading-relaxed flex-1 mb-6">
            {repo.description || 'No description provided for this repository.'}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-on-surface-variant mb-6">
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
          <div className="flex gap-3">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-surface-variant hover:bg-primary hover:text-on-primary transition-all duration-200 rounded text-sm font-bold text-on-surface-variant active:scale-95"
            >
              <GithubIcon size={14} />
              GitHub
            </a>
            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded border border-outline-variant/30 hover:bg-surface-variant text-on-surface-variant hover:text-on-surface transition-all active:scale-95"
                title="Live Demo"
              >
                <ExternalLink size={14} />
              </a>
            )}
            <a
              href={archiveUrl}
              className="p-2.5 rounded border border-outline-variant/30 hover:bg-surface-variant text-on-surface-variant hover:text-on-surface transition-all active:scale-95"
              title="Download ZIP"
            >
              <Download size={14} />
            </a>
          </div>
        </div>
      </div>
    </FadeUp>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-surface-container-low rounded-xl p-8 h-[280px] flex flex-col gap-4">
      <div className="flex gap-2">
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

  return (
    <section id="projects" className="py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <FadeUp>
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
                Portfolio
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tighter">
                Selected Works
              </h2>
              <p className="text-on-surface-variant mt-3 text-lg">
                A curated gallery of{' '}
                {error ? 'featured' : 'recent'} technical implementations.
              </p>
            </div>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-primary font-bold text-sm hover:underline underline-offset-4 whitespace-nowrap"
            >
              View Archive
              <ExternalLink size={14} />
            </a>
          </div>
        </FadeUp>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : repos.map((repo, i) => (
              <ProjectCard key={repo.id} repo={repo} index={i} />
            ))}
        </div>

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
