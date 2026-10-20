import { ExternalLink, Star, Calendar, FileText } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import { LANGUAGE_COLORS } from '@/data/projects';
import { formatRepoName } from '@/lib/projects';
import type { Project } from '@/types/project';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-NZ', { month: 'short', year: 'numeric' });
}

export default function ProjectCard({ repo, onOpenCaseStudy }: { repo: Project; onOpenCaseStudy: () => void }) {
  const tags = repo.topics?.length ? repo.topics.slice(0, 3) : repo.language ? [repo.language] : [];
  const langColor = LANGUAGE_COLORS[repo.language || ''] || '#C28459';

  return (
    <div className="group relative bg-surface rounded-lg overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:bg-surface-bright flex flex-col h-full border border-glass-stroke">
      {/* Top accent line */}
      <div
        className="h-[3px] w-0 group-hover:w-full transition-all duration-500"
        style={{ background: `linear-gradient(90deg, ${langColor}, var(--palette-primary))` }}
      />

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

