'use client';

import { useSyncExternalStore } from 'react';
import { isAccentTheme, type AccentTheme } from '@/lib/theme';
import { readStorage, writeStorage } from '@/lib/storage';

const CHANGE_EVENT = 'accent-change';

function getSnapshot(): AccentTheme {
  const value = document.documentElement.dataset.primary;
  return isAccentTheme(value) ? value : 'clay';
}

function subscribe(onChange: () => void) {
  const sync = () => {
    const stored = readStorage('primary-theme');
    if (isAccentTheme(stored)) document.documentElement.dataset.primary = stored;
    onChange();
  };
  window.addEventListener('storage', sync);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener('storage', sync);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

export function useAccentTheme() {
  const activeTheme = useSyncExternalStore(subscribe, getSnapshot, () => 'clay');
  const changeTheme = (theme: AccentTheme) => {
    document.documentElement.dataset.primary = theme;
    writeStorage('primary-theme', theme);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };
  return { activeTheme, changeTheme };
}
