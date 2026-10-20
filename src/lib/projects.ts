import { FEATURED_REPOSITORY_NAMES, STATIC_PROJECTS } from '../data/projects';
import type { GitHubRepo, Project } from '../types/project';

export const REPOS_CACHE_KEY = 'gh_featured_repos_cache_v3';
const CACHE_TTL = 1000 * 60 * 30;

export function isGitHubRepo(value: unknown): value is GitHubRepo {
  if (!value || typeof value !== 'object') return false;
  const repo = value as Partial<GitHubRepo>;
  return typeof repo.id === 'number' && typeof repo.name === 'string'
    && typeof repo.html_url === 'string' && repo.html_url.startsWith('https://github.com/')
    && (repo.description === null || typeof repo.description === 'string')
    && (repo.language === null || typeof repo.language === 'string')
    && (repo.homepage === null || typeof repo.homepage === 'string')
    && typeof repo.updated_at === 'string' && Number.isFinite(Date.parse(repo.updated_at))
    && typeof repo.stargazers_count === 'number'
    && Array.isArray(repo.topics) && repo.topics.every(topic => typeof topic === 'string');
}

export function mergeFeaturedRepos(repos: GitHubRepo[]): Project[] {
  const byName = new Map(repos.map(repo => [repo.name, repo]));
  return FEATURED_REPOSITORY_NAMES.map(name => {
    const fallback = STATIC_PROJECTS.find(project => project.name === name)!;
    const repo = byName.get(name);
    if (!repo) return fallback;
    const homepage = repo.homepage?.trim();
    return {
      ...fallback,
      ...repo,
      description: repo.description || fallback.description,
      homepage: homepage && /^https?:\/\//i.test(homepage) ? homepage : fallback.homepage,
      topics: repo.topics.length ? repo.topics : fallback.topics,
      // Case-study content belongs to the portfolio, including on cache reads.
      problem: fallback.problem,
      solution: fallback.solution,
      techStack: fallback.techStack,
      role: fallback.role,
      features: fallback.features,
      testing: fallback.testing,
      images: fallback.images,
      isMobileApp: fallback.isMobileApp,
    };
  });
}

export function readCachedRepos(raw: string | null, now = Date.now()): GitHubRepo[] | null {
  if (!raw) return null;
  try {
    const cache = JSON.parse(raw);
    if (!cache || typeof cache.timestamp !== 'number' || cache.timestamp > now || now - cache.timestamp >= CACHE_TTL) return null;
    return Array.isArray(cache.data) && cache.data.every(isGitHubRepo) ? cache.data : null;
  } catch {
    return null;
  }
}

export function formatRepoName(name: string): string {
  return name.replace(/[-_]+/g, ' ').trim().replace(/\b\w/g, c => c.toUpperCase());
}
