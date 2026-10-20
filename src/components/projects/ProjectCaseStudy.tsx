import Image from 'next/image';
import Dialog from '@/components/ui/Dialog';
import { formatRepoName } from '@/lib/projects';
import type { Project } from '@/types/project';

export default function ProjectCaseStudy({ repo, onClose }: { repo: Project; onClose: () => void }) {
  const title = formatRepoName(repo.name);
  return (
    <Dialog labelledBy="case-study-title" onClose={onClose} className="max-w-3xl">
      <h3 id="case-study-title" className="pr-8 text-3xl font-bold text-on-surface mb-2 tracking-tight font-headline">{title}</h3>
      <p className="text-primary font-mono text-sm tracking-widest uppercase font-bold mb-8">Case Study</p>
      {repo.images?.map((src, index) => (
        <div key={src} className="relative mb-8 h-64 sm:h-80 overflow-hidden rounded-lg bg-surface-container-low">
          <Image src={src} alt={`${title} screenshot ${index + 1}`} fill sizes="(max-width: 768px) 90vw, 688px" className="object-contain" />
        </div>
      ))}
      <div className="space-y-8 pt-6 border-t border-glass-stroke text-base text-on-surface-variant leading-relaxed">
        {repo.problem && (
          <div>
            <strong className="block text-on-surface text-lg mb-2">The Problem</strong>
            <p>{repo.problem}</p>
          </div>
        )}
        {repo.solution && (
          <div>
            <strong className="block text-on-surface text-lg mb-2">The Solution</strong>
            <p>{repo.solution}</p>
          </div>
        )}
        {repo.techStack && (
          <div>
            <strong className="block text-on-surface text-lg mb-2">Tech Stack</strong>
            <div className="flex flex-wrap gap-2">
              {repo.techStack.map(tech => (
                <span key={tech} className="px-3 py-1 bg-surface-variant rounded-full text-xs font-mono">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
        {repo.role && (
          <div>
            <strong className="block text-on-surface text-lg mb-2">My Role</strong>
            <p>{repo.role}</p>
          </div>
        )}
        {repo.features && (
          <div>
            <strong className="block text-on-surface text-lg mb-2">Key Features</strong>
            <ul className="list-disc pl-5 space-y-2">
              {repo.features.map(f => <li key={f}>{f}</li>)}
            </ul>
          </div>
        )}
        {repo.testing && (
          <div>
            <strong className="block text-on-surface text-lg mb-2">Testing Done</strong>
            <ul className="list-disc pl-5 space-y-2">
              {repo.testing.map(t => <li key={t}>{t}</li>)}
            </ul>
          </div>
        )}
      </div>
    </Dialog>
  );
}
