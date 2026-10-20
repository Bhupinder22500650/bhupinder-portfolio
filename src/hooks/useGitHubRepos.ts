'use client';

import { useEffect, useState } from 'react';
import { GITHUB_USERNAME } from '@/data/site';
import { STATIC_PROJECTS } from '@/data/projects';
import { isGitHubRepo, mergeFeaturedRepos, readCachedRepos, REPOS_CACHE_KEY } from '@/lib/projects';
import { readStorage, writeStorage } from '@/lib/storage';
import type { Project } from '@/types/project';

export function useGitHubRepos() {
  const [repos, setRepos] = useState<Project[]>(STATIC_PROJECTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8000);
    let active = true;

    async function fetchRepos() {
      try {
        const cached = readCachedRepos(readStorage(REPOS_CACHE_KEY));
        if (cached) {
          setRepos(mergeFeaturedRepos(cached));
          return;
        }
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, {
          headers: { Accept: 'application/vnd.github+json' },
          signal: controller.signal,
        });
        if (!res.ok) throw new Error('GitHub API unavailable');
        const data: unknown = await res.json();
        if (!Array.isArray(data) || !data.every(isGitHubRepo)) throw new Error('Invalid GitHub response');
        const featured = mergeFeaturedRepos(data);
        if (active) {
          setRepos(featured);
          writeStorage(REPOS_CACHE_KEY, JSON.stringify({ data: featured, timestamp: Date.now() }));
        }
      } catch {
        if (active) setError(true);
      } finally {
        window.clearTimeout(timeout);
        if (active) setLoading(false);
      }
    }

    void fetchRepos();
    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  return { repos, loading, error };
}
