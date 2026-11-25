import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, Check, Copy, Download, ExternalLink, Grid3X3, HelpCircle, Mail, Moon, Plus, Search, Sun } from 'lucide-react';
import {
  Accordion, Alert, Avatar, Badge, Button, Card, Checkbox, Dialog, Progress, Select, Skeleton, Switch, Tabs, Tag, TextField, Tooltip
} from '../components/ui';
import { useToast } from '../components/ui/Toast';
import { SectionHeading } from '../components/layout/SectionHeading';
import type { TranslationKey } from '../data/i18n';

interface ComponentsPageProps { t: (key: TranslationKey) => string; copy: (value: string, message?: string) => void }
type Category = 'all' | 'actions' | 'inputs' | 'feedback' | 'display';

type ComponentItem = {
  id: string;
  name: TranslationKey;
  group: Exclude<Category, 'all'>;
  snippet: string;
  view: () => ReactNode;
};

export function ComponentsPage({ t, copy }: ComponentsPageProps) {
  const [category, setCategory] = useState<Category>('all');
  const [selectedId, setSelectedId] = useState('01');
  const [search, setSearch] = useState('');
  const [previewMode, setPreviewMode] = useState<'light' | 'dark' | 'grid'>('light');
  const [checked, setChecked] = useState(true);
  const [enabled, setEnabled] = useState(true);
  const [tab, setTab] = useState('overview');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [progress, setProgress] = useState(68);
  const [selected, setSelected] = useState('design');
  const [tags, setTags] = useState(['React', 'TypeScript', 'Accessibility']);
  const { notify } = useToast();

  const items: ComponentItem[] = [
    { id: '01', name: 'buttons', group: 'actions', snippet: '<Button variant="solid" size="md">Create project</Button>', view: () => <div className="demo-flex"><Button leadingIcon={<Plus size={16}/>} onClick={() => notify(t('toastMessage'))}>{t('buttonDefault')}</Button><Button variant="outline" onClick={() => notify(t('toastMessage'))}>{t('buttonOutline')}</Button><Button variant="soft" onClick={() => notify(t('toastMessage'))}>{t('buttonSoft')}</Button><Button variant="ghost" trailingIcon={<ArrowRight size={16}/>} onClick={() => notify(t('toastMessage'))}>{t('buttonGhost')}</Button><Button disabled>{t('buttonDisabled')}</Button><Button loading>{t('buttonLoading')}</Button></div> },
    { id: '02', name: 'badges', group: 'display', snippet: '<Badge tone="success" dot>Active</Badge>', view: () => <div className="demo-flex"><Badge tone="neutral">{t('defaultLabel')}</Badge><Badge tone="brand" dot>{t('newLabel')}</Badge><Badge tone="success" dot>{t('active')}</Badge><Badge tone="info">{t('beta')}</Badge><Badge tone="warning">{t('pending')}</Badge><Badge tone="danger">{t('failed')}</Badge></div> },
    { id: '03', name: 'textFields', group: 'inputs', snippet: '<TextField label="Email" type="email" placeholder="you@company.com" />', view: () => <div className="demo-form-grid"><TextField label={t('fieldLabel')} type="email" prefix={<Mail size={15}/>} placeholder={t('fieldPlaceholder')} value={email} onChange={(event) => {setEmail(event.target.value); setInvalid(false);}} hint={t('fieldHint')} error={invalid ? t('fieldError') : undefined}/><Button variant="outline" onClick={() => setInvalid(!/^\S+@\S+\.\S+$/.test(email))}>{t('validate')} <Check size={14}/></Button></div> },
    { id: '04', name: 'checkbox', group: 'inputs', snippet: '<Checkbox checked={checked} onChange={setChecked} label="Weekly digest" />', view: () => <div className="demo-selections"><Checkbox checked={checked} onChange={setChecked} label={t('selectionTwo')} description={t('selectionHint')}/></div> },
    { id: '05', name: 'switchControl', group: 'inputs', snippet: '<Switch checked={enabled} onChange={setEnabled} label="Notifications" />', view: () => <div className="demo-selections"><Switch checked={enabled} onChange={setEnabled} label={t('selectionOne')} description={t('selectionHint')}/></div> },
    { id: '06', name: 'tabs', group: 'actions', snippet: '<Tabs items={items} value={tab} onChange={setTab} />', view: () => <Tabs value={tab} onChange={setTab} items={[{ id: 'overview', label: t('tabsFirst'), content: t('tabContent') }, { id: 'activity', label: t('tabsSecond'), content: `${t('tabsSecond')}: 4` }, { id: 'settings', label: t('tabsThird'), content: `${t('tabsThird')}` }]} /> },
    { id: '07', name: 'dialogs', group: 'actions', snippet: '<Dialog open={open} onClose={close} title="New workspace">...</Dialog>', view: () => <><Button variant="outline" leadingIcon={<Plus size={15}/>} onClick={() => setDialogOpen(true)}>{t('openDialog')}</Button><Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} title={t('dialogTitle')} description={t('dialogBody')} closeLabel={t('cancel')}><div className="dialog-demo-body"><TextField label={t('workspaceLabel')} placeholder={t('workspacePlaceholder')} /><div className="dialog-demo-actions"><Button variant="ghost" onClick={() => setDialogOpen(false)}>{t('cancel')}</Button><Button onClick={() => {setDialogOpen(false); notify(t('toastMessage'));}}>{t('create')}</Button></div></div></Dialog></> },
    { id: '08', name: 'alerts', group: 'feedback', snippet: '<Alert tone="success" title="Saved">Your changes are ready.</Alert>', view: () => <div className="demo-alerts"><Alert title={t('alertsInfo')}>{t('alertsText')}</Alert><Alert tone="success" title={t('alertsSuccess')}>{t('alertsText')}</Alert><Alert tone="warning" title={t('alertsWarning')}>{t('alertsText')}</Alert></div> },
    { id: '09', name: 'progress', group: 'feedback', snippet: '<Progress value={68} label="Profile completion" />', view: () => <div className="demo-progress"><Progress label={t('progressCaption')} value={progress}/><input aria-label="Progress value" type="range" min={0} max={100} value={progress} onChange={(event) => setProgress(Number(event.target.value))} /></div> },
    { id: '10', name: 'avatars', group: 'display', snippet: '<Avatar name="Alex Morgan" size="md" />', view: () => <div className="demo-flex"><Avatar name="Alex Morgan" size="sm" color="#D8D1FB" /><Avatar name="Taylor Lee" size="md" color="#D9F3DF" /><Avatar name="Sam Rivera" size="lg" color="#F4EC9D" /><span className="avatar-stack"><Avatar name="Mia Chen" size="md" color="#ffd4cc" /><Avatar name="Noah Smith" size="md" color="#d8d1fb" /><Avatar name="Jo Park" size="md" color="#d9f3df" /></span></div> },
    { id: '11', name: 'accordions', group: 'display', snippet: '<Accordion items={[{ title: "FAQ", content: "Answer" }]} />', view: () => <Accordion items={[{title:t('accordionQ1'),content:t('accordionA1')},{title:t('accordionQ2'),content:t('accordionA2')},{title:t('accordionQ3'),content:t('accordionA3')}]} /> },
    { id: '12', name: 'tags', group: 'display', snippet: '<Tag onRemove={() => removeTag()}>React</Tag>', view: () => <div className="demo-flex">{tags.map((tag) => <Tag key={tag} onRemove={() => setTags((current) => current.filter((item) => item !== tag))}>{tag}</Tag>)}<Button size="sm" variant="outline" onClick={() => setTags(['React', 'TypeScript', 'Accessibility'])}>{t('reset')}</Button></div> },
    { id: '13', name: 'skeletons', group: 'feedback', snippet: '<Skeleton width="80%" height={14} />', view: () => <div className="skeleton-layout"><Skeleton round width={52} height={52} /><div className="skeleton-lines"><Skeleton width="63%" height={14}/><Skeleton width="100%" height={10}/><Skeleton width="82%" height={10}/></div></div> },
    { id: '14', name: 'tooltips', group: 'feedback', snippet: '<Tooltip label="More details"><button>Info</button></Tooltip>', view: () => <div className="demo-flex"><Tooltip label={t('tooltipBubble')}><Button variant="outline" leadingIcon={<HelpCircle size={16}/>} >{t('tooltipHint')}</Button></Tooltip></div> },
    { id: '15', name: 'select', group: 'inputs', snippet: '<Select label="Team" options={[{label: "Design", value: "design"}]} />', view: () => <div className="demo-select"><Select value={selected} onChange={(event) => setSelected(event.target.value)} label={t('team')} options={[{label:'Design',value:'design'},{label:'Engineering',value:'engineering'},{label:'Product',value:'product'}]}/></div> },
    { id: '16', name: 'cards', group: 'display', snippet: '<Card><h3>Project overview</h3><p>...</p></Card>', view: () => <Card className="demo-sample-card"><span className="mini-eyebrow">WORKSPACE / 003</span><h3>{t('previewHeading')}</h3><p>{t('previewSubtitle')}</p><Button variant="soft" trailingIcon={<ArrowRight size={15}/>} onClick={() => notify(t('toastMessage'))}>{t('explore')}</Button></Card> },
    { id: '17', name: 'toasts', group: 'feedback', snippet: 'const { notify } = useToast(); notify("Saved successfully");', view: () => <Button variant="outline" leadingIcon={<Download size={15}/>} onClick={() => notify(t('toastMessage'))}>{t('toastButton')}</Button> }
  ];

  const filtered = useMemo(() => items.filter((item) => {
    const term = search.trim().toLowerCase();
    return (category === 'all' || item.group === category) && (!term || t(item.name).toLowerCase().includes(term) || item.name.toLowerCase().includes(term));
  }), [search, category, t, items]);

  useEffect(() => {
    const readSelection = () => {
      const route = window.location.hash.split('/')[1]?.toLowerCase();
      if (!route) return;
      const match = items.find((item) => item.name.toLowerCase() === route);
      if (match) {
        setSelectedId(match.id);
        setCategory('all');
        setSearch('');
      }
    };
    readSelection();
    window.addEventListener('hashchange', readSelection);
    return () => window.removeEventListener('hashchange', readSelection);
  }, []);
  const categories: Category[] = ['all', 'actions', 'inputs', 'display', 'feedback'];
  const active = filtered.find((item) => item.id === selectedId) || filtered[0];
  const helper = t('componentDescription');
  const storyNames: Record<string, string> = { buttons: 'button', badges: 'badge', textFields: 'textfield', checkbox: 'checkbox', switchControl: 'switch', tabs: 'tabs', dialogs: 'dialog', alerts: 'alert', progress: 'progress', avatars: 'avatar', accordions: 'accordion', tags: 'tag', skeletons: 'skeleton', tooltips: 'tooltip', select: 'select', cards: 'card', toasts: 'toast' };
  const storyGroups: Record<Exclude<Category, 'all'>, string> = { actions: '01-actions', inputs: '02-forms', display: '03-display', feedback: '04-feedback' };
  const storybookBase = import.meta.env.DEV ? 'http://localhost:6006' : `${import.meta.env.BASE_URL}storybook/`;
  const storybookLink = active ? `${storybookBase}?path=/story/${storyGroups[active.group]}-${storyNames[active.name]}--playground` : storybookBase;
  return <div className="content-page ux-catalog">
    <SectionHeading eyebrow="02 / COMPONENT INDEX" title={t('componentTitle')} description={helper} />
    <div className="ux-catalog-instructions">
      <span><strong>01</strong> {t('search')}</span>
      <ArrowRight size={15} />
      <span><strong>02</strong> {t('livePreview')}</span>
      <ArrowRight size={15} />
      <span><strong>03</strong> {t('copy')}</span>
    </div>
    <div className="catalog-toolbar"><div className="catalog-filters">{categories.map((item) => <button key={item} className={`filter-chip ${category === item ? 'is-active' : ''}`} onClick={() => setCategory(item)}>{t(item)}</button>)}</div><div className="catalog-search"><Search size={17}/><input aria-label={t('search')} value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t('search')}/></div></div>
    <div className="ux-catalog-layout">
      <aside className="ux-component-directory" aria-label={t('components')}>
        <div className="ux-directory-title"><span>{t('components')}</span><span>{filtered.length} / 17</span></div>
        {filtered.length ? filtered.map((item) => <button key={item.id} className={`ux-directory-item ${active?.id === item.id ? 'is-active' : ''}`} aria-current={active?.id === item.id ? 'true' : undefined} onClick={() => { setSelectedId(item.id); window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#components/${item.name}`); }}><span>{t(item.name)}</span><small>{t(item.group)}</small><ArrowRight size={16} /></button>) : <div className="ux-directory-empty">{t('emptyText')}</div>}
      </aside>
      <section className="ux-component-stage" aria-live="polite">
        {active ? <>
          <header className="ux-stage-header"><div><span className="mini-eyebrow">ELEMENT / {active.id} — {t(active.group)}</span><h2>{t(active.name)}</h2></div><div className="v3-catalog-actions"><Badge tone="success" dot>LIVE</Badge><a href={storybookLink} target="_blank" rel="noopener noreferrer">Storybook <ArrowUpRight size={16}/></a></div></header>
          <div className="ux-stage-preview"><div className="v3-preview-toolbar"><span className="ux-stage-kicker">{t('livePreview')}</span><div className="v3-preview-modes" aria-label="Preview appearance"><button className={previewMode === 'light' ? 'is-active' : ''} onClick={() => setPreviewMode('light')} aria-label="Light preview" aria-pressed={previewMode === 'light'} title="Light"><Sun size={15}/></button><button className={previewMode === 'dark' ? 'is-active' : ''} onClick={() => setPreviewMode('dark')} aria-label="Dark preview" aria-pressed={previewMode === 'dark'} title="Dark"><Moon size={15}/></button><button className={previewMode === 'grid' ? 'is-active' : ''} onClick={() => setPreviewMode('grid')} aria-label="Grid preview" aria-pressed={previewMode === 'grid'} title="Grid"><Grid3X3 size={15}/></button></div></div><div className={`ux-stage-demo v3-preview-canvas ${previewMode === 'grid' ? 'is-grid' : ''}`} data-theme={previewMode === 'dark' ? 'dark' : 'light'} key={active.id}>{active.view()}</div></div>
          <div className="ux-stage-code"><div className="ux-code-heading"><span>REACT / JSX</span><button onClick={() => copy(active.snippet, t('copiedCode'))}><Copy size={16}/>{t('copy')}</button></div><pre><code>{active.snippet}</code></pre></div>
          <div className="ux-stage-bottom"><Check size={16}/><span>{t('demoNote')}</span><a href={storybookLink} target="_blank" rel="noopener noreferrer">All properties in Storybook <ExternalLink size={14}/></a></div>
        </> : <div className="component-empty">{t('emptyText')}</div>}
      </section>
    </div>
  </div>;
}
