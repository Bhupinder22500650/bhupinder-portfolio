'use client';

import { useSyncExternalStore } from 'react';

export type Theme = 'dark' | 'light';

const THEME_STORAGE_KEY = 'theme';
const THEME_CHANGE_EVENT = 'theme-change';

function isTheme(value: string | null): value is Theme {
  return value === 'dark' || value === 'light';
}

function getPreferredTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';

  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (isTheme(stored)) return stored;

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function subscribe(onStoreChange: () => void) {
  const handleChange = () => {
    document.documentElement.setAttribute('data-theme', getPreferredTheme());
    onStoreChange();
  };
  const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

  window.addEventListener('storage', handleChange);
  window.addEventListener(THEME_CHANGE_EVENT, handleChange);
  mediaQuery.addEventListener('change', handleChange);

  return () => {
    window.removeEventListener('storage', handleChange);
    window.removeEventListener(THEME_CHANGE_EVENT, handleChange);
    mediaQuery.removeEventListener('change', handleChange);
  };
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getPreferredTheme, () => 'dark');

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_STORAGE_KEY, next);
    document.documentElement.setAttribute('data-theme', next);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  };

  return { theme, toggle };
}
