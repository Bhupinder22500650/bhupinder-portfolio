'use client';

import { useEffect, useState } from 'react';
import { GITHUB_USERNAME, STATIC_PROJECTS } from '@/lib/constants';

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  updated_at: string;
  stargazers_count: number;
}

const CACHE_KEY = 'gh_repos_cache';
const CACHE_TTL = 1000 * 60 * 30; // 30 minutes

export function useGitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        // Check cache first
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_TTL) {
            setRepos(data);
            setLoading(false);
            return;
          }
        }

        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`,
          { headers: { Accept: 'application/vnd.github+json' } }
        );

        if (!res.ok) throw new Error('GitHub API error');

        const data: GitHubRepo[] = await res.json();
        const filtered = data.filter((r) => !r.name.startsWith('.')).slice(0, 6);

        localStorage.setItem(CACHE_KEY, JSON.stringify({ data: filtered, timestamp: Date.now() }));
        setRepos(filtered.length > 0 ? filtered : STATIC_PROJECTS);
      } catch {
        setError(true);
        setRepos(STATIC_PROJECTS);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return { repos, loading, error };
}
