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

export interface Project extends GitHubRepo {
  problem?: string;
  solution?: string;
  techStack?: string[];
  role?: string;
  features?: string[];
  testing?: string[];
  images?: string[];
  isMobileApp?: boolean;
}
