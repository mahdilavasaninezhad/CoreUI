import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Asterisk, Blocks, BookOpenText, CircleDot, Command, Component, Layers, Menu, Moon, Search, SlidersHorizontal, Sun, X } from 'lucide-react';
import { useStudio } from './context/StudioContext';
import { useToast } from './components/ui/Toast';
import { translations } from './data/i18n';
import type { TranslationKey } from './data/i18n';
import { HomePage } from './pages/HomePage';
import { FoundationsPage } from './pages/FoundationsPage';
import { ComponentsPage } from './pages/ComponentsPage';
import { PatternsPage } from './pages/PatternsPage';
import { PlaygroundPage } from './pages/PlaygroundPage';

type Page = 'home' | 'foundations' | 'components' | 'patterns' | 'playground';
const pages: Page[] = ['home', 'foundations', 'components', 'patterns', 'playground'];
function readPage(): Page {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.replace('#', '').split('/')[0];
  return pages.find((page) => page === hash) || 'home';
}

function Logo({ onClick }: { onClick: () => void }) {
  return <button className="site-logo" onClick={onClick} aria-label="CoreUI Home"><span className="site-logo-symbol"><Asterisk size={28} strokeWidth={2} /></span><span>core<span>ui.</span></span></button>;
}

export default function App() {
  const { locale, theme, toggleLocale, toggleTheme } = useStudio();
  const { notify } = useToast();
  const [page, setPage] = useState<Page>(readPage);
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const [quickSearch, setQuickSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchIndex, setSearchIndex] = useState(0);
  const t = useCallback((key: TranslationKey) => translations[locale][key], [locale]);
  const storybookUrl = import.meta.env.DEV ? 'http://localhost:6006' : `${import.meta.env.BASE_URL}storybook/`;

  const navigate = useCallback((next: Page) => {
    window.location.hash = next === 'home' ? '' : next;
    setPage(next);
    setMobileOpen(false);
    setSearchOpen(false);
    setQuickSearch('');
    setSearchIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const copy = useCallback(async (value: string, message?: string) => {
    try {
      await navigator.clipboard.writeText(value);
      notify(message || t('copied'));
    } catch {
      notify(t('clipboardUnavailable'), 'info');
    }
  }, [notify, t]);

  useEffect(() => {
    const onHash = () => setPage(readPage());
    const onKeys = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(true);
        requestAnimationFrame(() => searchRef.current?.focus());
      }
      if (event.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('hashchange', onHash);
    window.addEventListener('keydown', onKeys);
    return () => {
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('keydown', onKeys);
    };
  }, []);

  const navItems = [
    { page: 'home' as Page, key: 'overview' as TranslationKey, icon: <CircleDot size={17} />, serial: '00' },
    { page: 'foundations' as Page, key: 'foundations' as TranslationKey, icon: <Layers size={17} />, serial: '01' },
    { page: 'components' as Page, key: 'components' as TranslationKey, icon: <Component size={17} />, serial: '02' },
    { page: 'patterns' as Page, key: 'patterns' as TranslationKey, icon: <Blocks size={17} />, serial: '03' },
    { page: 'playground' as Page, key: 'playground' as TranslationKey, icon: <SlidersHorizontal size={17} />, serial: '04' }
  ];

  const componentIndex = [
    'buttons', 'badges', 'textFields', 'checkbox', 'switchControl', 'tabs', 'dialogs', 'alerts', 'progress',
    'avatars', 'accordions', 'tags', 'skeletons', 'tooltips', 'select', 'cards', 'toasts'
  ] as const;
  const matchingPages = navItems.filter((item) => t(item.key).toLowerCase().includes(quickSearch.toLowerCase()) || item.page.includes(quickSearch.toLowerCase()));
  const matchingComponents = componentIndex.filter((key) => t(key).toLowerCase().includes(quickSearch.toLowerCase()) || key.toLowerCase().includes(quickSearch.toLowerCase()));
  const searchResults = [
    ...matchingPages.map((item) => ({ label: t(item.key), run: () => navigate(item.page) })),
    ...matchingComponents.map((name) => ({ label: t(name), run: () => navigateComponent(name) }))
  ];
  const navigateComponent = (name: string) => {
    window.location.hash = `components/${name}`;
    setPage('components');
    setSearchOpen(false);
    setQuickSearch('');
    setSearchIndex(0);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return <div className="studio-shell">
    <a className="v3-skip-link" href="#main">Skip to content</a>
    <header className="topbar">
      <Logo onClick={() => navigate('home')} />
      <nav className="topbar-links" aria-label={t('documentation')}><button onClick={() => navigate('foundations')}>{t('documentation')}</button><span>·</span><button onClick={() => navigate('playground')}>{t('playground')}</button><a className="topbar-storybook" href={storybookUrl} target="_blank" rel="noopener noreferrer">{t('launchStorybook')}<ArrowUpRight size={14}/></a></nav>
      <div className="topbar-end"><span className="topbar-version">V3.0.0 / 2026</span><button className="topbar-square topbar-search" aria-label={t('search')} title="Ctrl + K" onClick={() => { setSearchOpen(true); requestAnimationFrame(() => searchRef.current?.focus());}}><Search size={18}/></button><button className="topbar-language" onClick={toggleLocale} aria-label="Change language">{locale === 'en' ? 'FA' : 'EN'}</button><button className="topbar-square" onClick={toggleTheme} aria-label={theme === 'light' ? 'Dark mode' : 'Light mode'}>{theme === 'light' ? <Moon size={18}/> : <Sun size={18}/>}</button><button className="topbar-square mobile-menu-button" aria-label="Open navigation" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X size={19}/> : <Menu size={19}/>}</button></div>
    </header>

    <div className="studio-frame">
      {mobileOpen ? <button className="v3-mobile-backdrop" aria-label="Close navigation" onClick={() => setMobileOpen(false)} /> : null}
      <aside className={`studio-sidebar ${mobileOpen ? 'is-open' : ''}`}>
        <div className="sidebar-label"><span className="v3-sidebar-status-dot"/>{t('version')}<span className="v3-sidebar-edition">STUDIO EDITION</span></div>
        <div className="sidebar-group-label">01 — {t('getStarted')}</div>
        <nav aria-label={t('documentation')} className="sidebar-nav">{navItems.map((item) => <button key={item.page} className={`sidebar-link ${page === item.page ? 'is-active' : ''}`} aria-current={page === item.page ? 'page' : undefined} onClick={() => navigate(item.page)}><span className="sidebar-link-icon">{item.icon}</span><span>{t(item.key)}</span><small>{item.serial}</small></button>)}<a className="sidebar-link" href={storybookUrl} target="_blank" rel="noopener noreferrer"><span className="sidebar-link-icon"><BookOpenText size={17}/></span><span>{t('launchStorybook')}</span><small>↗</small></a></nav>
        <div className="sidebar-bottom"><div className="sidebar-decoration"><Asterisk size={52} strokeWidth={1.15} /><span>THE DETAILS<br/>ARE THE DESIGN.</span></div><div className="sidebar-footer"><BookOpenText size={15}/><span>REACT + TYPESCRIPT</span><span>↗</span></div></div>
      </aside>

      <main id="main" className="studio-main">
        {page === 'home' ? <HomePage t={t} navigate={navigate} copy={copy} /> : null}
        {page === 'foundations' ? <FoundationsPage t={t} copy={copy} /> : null}
        {page === 'components' ? <ComponentsPage t={t} copy={copy} /> : null}
        {page === 'patterns' ? <PatternsPage t={t} /> : null}
        {page === 'playground' ? <PlaygroundPage t={t} copy={copy} /> : null}
        <footer className="site-footer"><span>COREUI® <Asterisk size={14}/></span><span>{t('footerCaption')}</span><button onClick={() => navigate('home')}>{t('overview')} <ArrowRight size={15}/></button></footer>
      </main>
    </div>

    {searchOpen ? <div className="quick-search-root"><button className="quick-search-backdrop" aria-label="Close search" onClick={() => setSearchOpen(false)}/><div className="quick-search-panel" role="dialog" aria-modal="true" aria-label={t('search')}><div className="quick-search-input"><Search size={19}/><input ref={searchRef} autoFocus value={quickSearch} onChange={(event) => { setQuickSearch(event.target.value); setSearchIndex(0); }} onKeyDown={(event) => { if (event.key === 'ArrowDown') { event.preventDefault(); setSearchIndex((index) => Math.min(index + 1, searchResults.length - 1)); } if (event.key === 'ArrowUp') { event.preventDefault(); setSearchIndex((index) => Math.max(0, index - 1)); } if (event.key === 'Enter') { event.preventDefault(); searchResults[Math.max(0, searchIndex)]?.run(); } }} placeholder={t('search')} /><span>ESC</span></div><div className="quick-search-results">{matchingPages.map((item, index) => <button key={item.page} className={searchIndex === index ? 'is-highlighted' : ''} onMouseEnter={() => setSearchIndex(index)} onClick={() => navigate(item.page)}>{item.icon}<span>{t(item.key)}</span><ArrowRight size={16}/></button>)}{matchingComponents.map((name, index) => <button key={name} className={searchIndex === index + matchingPages.length ? 'is-highlighted' : ''} onMouseEnter={() => setSearchIndex(index + matchingPages.length)} onClick={() => navigateComponent(name)}><Component size={17}/><span>{t(name)}</span><ArrowRight size={16}/></button>)}{matchingPages.length === 0 && matchingComponents.length === 0 ? <p>{t('emptyText')}</p> : null}</div><div className="quick-search-hint"><Command size={14}/> CTRL / ⌘ + K</div></div></div> : null}
  </div>;
}
