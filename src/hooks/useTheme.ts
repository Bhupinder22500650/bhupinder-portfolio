'use client';

import { useSyncExternalStore } from 'react';
import { isTheme, type Theme } from '@/lib/theme';
import { readStorage, writeStorage } from '@/lib/storage';

const THEME_STORAGE_KEY = 'theme';
const THEME_CHANGE_EVENT = 'theme-change';

function getPreferredTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const current = document.documentElement.dataset.theme;
  if (isTheme(current)) return current;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function subscribe(onStoreChange: () => void) {
  const handleChange = () => {
    const stored = readStorage(THEME_STORAGE_KEY);
    const next = isTheme(stored) ? stored : mediaQuery.matches ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    onStoreChange();
  };
  const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

  window.addEventListener('storage', handleChange);
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);
  mediaQuery.addEventListener('change', handleChange);

  return () => {
    window.removeEventListener('storage', handleChange);
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
    mediaQuery.removeEventListener('change', handleChange);
  };
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getPreferredTheme, () => 'dark');

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    writeStorage(THEME_STORAGE_KEY, next);
    document.documentElement.setAttribute('data-theme', next);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  };

  return { theme, toggle };
}
