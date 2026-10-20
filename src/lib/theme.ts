export type Theme = 'dark' | 'light';

export const ACCENT_THEMES = [
  { id: 'clay', name: 'Clay', color: '#C28459' },
  { id: 'slate', name: 'Slate', color: '#768D9C' },
  { id: 'sage', name: 'Sage', color: '#7C9573' },
  { id: 'rose', name: 'Rose', color: '#C98686' },
  { id: 'ochre', name: 'Ochre', color: '#C59E5E' },
] as const;
export type AccentTheme = typeof ACCENT_THEMES[number]['id'];

export function isTheme(value: unknown): value is Theme {
  return value === 'dark' || value === 'light';
}

export function isAccentTheme(value: unknown): value is AccentTheme {
  return ACCENT_THEMES.some(theme => theme.id === value);
}

// Runs before paint and uses the same supported values as the interactive controls.
export const THEME_INIT_SCRIPT = `(() => {
  const root = document.documentElement;
  let theme, accent;
  try { theme = localStorage.getItem('theme'); accent = localStorage.getItem('primary-theme'); } catch {}
  root.dataset.theme = ['light', 'dark'].includes(theme) ? theme : (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  root.dataset.primary = ${JSON.stringify(ACCENT_THEMES.map(theme => theme.id))}.includes(accent) ? accent : 'clay';
})();`;
