import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export type Locale = 'en' | 'fa';
export type Theme = 'light' | 'dark';
interface StudioContextValue {
  locale: Locale;
  theme: Theme;
  toggleTheme: () => void;
  toggleLocale: () => void;
}

const StudioContext = createContext<StudioContextValue | null>(null);

function getSaved<T extends string>(key: string, values: readonly T[], fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  const saved = window.localStorage.getItem(key);
  return values.find((item) => item === saved) || fallback;
}

export function StudioProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => getSaved('coreui-language', ['en', 'fa'], 'en'));
  const [theme, setTheme] = useState<Theme>(() => getSaved('coreui-theme', ['light', 'dark'], 'light'));
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('coreui-language', locale);
    window.localStorage.setItem('coreui-theme', theme);
  }, [locale, theme]);
  const value = useMemo(() => ({
    locale,
    theme,
    toggleTheme: () => setTheme((current) => current === 'light' ? 'dark' : 'light'),
    toggleLocale: () => setLocale((current) => current === 'en' ? 'fa' : 'en')
  }), [locale, theme]);
  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
}

export function useStudio() {
  const state = useContext(StudioContext);
  if (!state) throw new Error('useStudio must be used within StudioProvider');
  return state;
}
