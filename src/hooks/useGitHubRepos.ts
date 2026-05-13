'use client';

import { useEffect, useState } from 'react';
import { FEATURED_REPOSITORY_NAMES, GITHUB_USERNAME, STATIC_PROJECTS } from '@/lib/constants';

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
  default_branch?: string;
}

const CACHE_KEY = 'gh_featured_repos_cache_v2';
const CACHE_TTL = 1000 * 60 * 30; // 30 minutes

const staticProjectByName = new Map(STATIC_PROJECTS.map((project) => [project.name, project]));

function orderFeaturedRepos(repos: GitHubRepo[]) {
  return FEATURED_REPOSITORY_NAMES.map((name) => repos.find((repo) => repo.name === name))
    .filter((repo): repo is GitHubRepo => Boolean(repo))
    .map((repo) => {
      const fallback = staticProjectByName.get(repo.name);

      return {
        ...repo,
        description: repo.description || fallback?.description || null,
        homepage: repo.homepage || fallback?.homepage || null,
        topics: repo.topics?.length ? repo.topics : fallback?.topics || [],
      };
    });
}

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
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
          { headers: { Accept: 'application/vnd.github+json' } }
        );

        if (!res.ok) throw new Error('GitHub API error');

        const data: GitHubRepo[] = await res.json();
        const filtered = orderFeaturedRepos(data);
        const finalRepos = filtered.length > 0 ? filtered : STATIC_PROJECTS;

        localStorage.setItem(CACHE_KEY, JSON.stringify({ data: finalRepos, timestamp: Date.now() }));
        setRepos(finalRepos);
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
