'use client';

import FadeUp from '@/components/ui/FadeUp';
import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import { useGitHubRepos } from '@/hooks/useGitHubRepos';
import type { Project } from '@/types/project';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectCaseStudy from '@/components/projects/ProjectCaseStudy';
import { GITHUB_USERNAME } from '@/data/site';

function SkeletonCard() {
  return (
    <div className="bg-surface-container-low rounded-xl p-8 flex flex-col gap-4 h-full border border-glass-stroke">
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
  const [selectedRepo, setSelectedRepo] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-16 md:py-32 bg-surface">
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
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : repos.map((repo, i) => (
              <FadeUp key={repo.name} delay={i * 0.1} className="h-full">
                <ProjectCard repo={repo} onOpenCaseStudy={() => setSelectedRepo(repo)} />
              </FadeUp>
            ))}
        </div>

        {/* Note below projects */}
        <FadeUp delay={0.2}>
          <div className="mt-16 text-center border-t border-glass-stroke/50 pt-12 max-w-xl mx-auto">
            <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
              Looking for more? These featured projects represent a snapshot of my skills in web development, testing, and IT support. For more coding experiments, automation suites, and full-stack repositories, please explore my GitHub profile!
            </p>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-surface-container-low border border-glass-stroke text-on-surface hover:text-primary hover:border-primary/40 hover:bg-surface-bright transition-all active:scale-95 shadow-sm text-sm font-bold group"
            >
              <span>Explore more on GitHub</span>
              <GithubIcon size={16} className="text-on-surface-variant group-hover:text-primary transition-colors" />
            </a>
          </div>
        </FadeUp>

        {selectedRepo && <ProjectCaseStudy repo={selectedRepo} onClose={() => setSelectedRepo(null)} />}

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
