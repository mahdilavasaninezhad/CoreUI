import { useMemo, useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, Code2, Copy, ExternalLink, MousePointerClick, RotateCcw, SlidersHorizontal, Sparkles, SunMoon, WandSparkles } from 'lucide-react';
import { Alert, Badge, Button, Progress, Switch, TextField } from '../components/ui';
import type { AlertTone, BadgeTone, ButtonSize, ButtonVariant } from '../components/ui';
import { SectionHeading } from '../components/layout/SectionHeading';
import { useStudio } from '../context/StudioContext';
import type { TranslationKey } from '../data/i18n';

type LabKind = 'button' | 'badge' | 'input' | 'switch' | 'alert' | 'progress';
type LabTheme = 'light' | 'dark';

const components: { id: LabKind; name: string; category: string; story: string }[] = [
  { id: 'button', name: 'Button', category: 'ACTIONS', story: '01-actions-button' },
  { id: 'badge', name: 'Badge', category: 'DISPLAY', story: '03-display-badge' },
  { id: 'input', name: 'TextField', category: 'FORMS', story: '02-forms-textfield' },
  { id: 'switch', name: 'Switch', category: 'FORMS', story: '02-forms-switch' },
  { id: 'alert', name: 'Alert', category: 'FEEDBACK', story: '04-feedback-alert' },
  { id: 'progress', name: 'Progress', category: 'FEEDBACK', story: '04-feedback-progress' }
];

const translations = {
  en: {
    title: 'One lab. Infinite details.', subtitle: 'Choose a component, shape its properties, try the interaction and grab the code. No guesswork.',
    appearance: 'Appearance', choose: 'CHOOSE YOUR COMPONENT', preview: 'LIVE CANVAS', code: 'READY TO USE', settings: 'PROPERTIES & STATES',
    workspace: 'Workspace', grid: 'Grid', light: 'Light canvas', dark: 'Dark canvas', copy: 'Copy code', reset: 'Reset properties',
    open: 'Open full Storybook controls', status: 'Changes appear instantly.',
    label: 'Label', variant: 'Variant', size: 'Size', radius: 'Corner radius', state: 'Component state',
    loading: 'Loading', disabled: 'Disabled', fullWidth: 'Full width', dot: 'Status dot',
    tone: 'Color tone', placeholder: 'Placeholder', error: 'Show error', checked: 'Checked',
    value: 'Progress', description: 'Description', titleText: 'Title',
    help: 'More components and their full APIs are available in Storybook.',
    stepOne: '01 SELECT', stepTwo: '02 CONFIGURE', stepThree: '03 COPY',
    previewTitle: 'A real component, your decisions.',
    shared: 'Theme and direction are shared with the documentation.'
  },
  fa: {
    title: 'یک آزمایشگاه، بی‌نهایت جزئیات.', subtitle: 'کامپوننت رو انتخاب کن، ویژگی‌هاش رو تغییر بده، باهاش کار کن و کد آماده رو بردار.',
    appearance: 'ظاهر', choose: 'انتخاب کامپوننت', preview: 'بوم زنده', code: 'کد آماده استفاده', settings: 'ویژگی‌ها و وضعیت‌ها',
    workspace: 'فضای کار', grid: 'گرید', light: 'بوم روشن', dark: 'بوم تاریک', copy: 'کپی کد', reset: 'بازنشانی',
    open: 'باز کردن کنترل‌های کامل Storybook', status: 'تغییرات بلافاصله نمایش داده می‌شن.',
    label: 'متن', variant: 'نوع', size: 'اندازه', radius: 'گردی گوشه‌ها', state: 'وضعیت کامپوننت',
    loading: 'در حال بارگذاری', disabled: 'غیرفعال', fullWidth: 'عرض کامل', dot: 'نشانگر وضعیت',
    tone: 'رنگ', placeholder: 'متن راهنما', error: 'نمایش خطا', checked: 'فعال',
    value: 'پیشرفت', description: 'توضیحات', titleText: 'عنوان',
    help: 'کامپوننت‌های بیشتر و تمام APIها در Storybook در دسترسن.',
    stepOne: '۰۱ انتخاب', stepTwo: '۰۲ تغییر', stepThree: '۰۳ کپی',
    previewTitle: 'کامپوننت واقعی، با انتخاب‌های تو.',
    shared: 'تم و جهت نوشتار با مستندات هماهنگه.'
  }
};

export function PlaygroundPage({ t, copy }: { t: (key: TranslationKey) => string; copy: (value: string, message?: string) => void }) {
  const { locale } = useStudio();
  const m = translations[locale];
  const [kind, setKind] = useState<LabKind>('button');
  const [canvasTheme, setCanvasTheme] = useState<LabTheme>('light');
  const [showGrid, setShowGrid] = useState(true);
  const [label, setLabel] = useState('Create workspace');
  const [variant, setVariant] = useState<ButtonVariant>('solid');
  const [size, setSize] = useState<ButtonSize>('lg');
  const [radius, setRadius] = useState(12);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullWidth, setFullWidth] = useState(false);
  const [tone, setTone] = useState<BadgeTone>('brand');
  const [hasDot, setHasDot] = useState(true);
  const [placeholder, setPlaceholder] = useState('you@company.com');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const [checked, setChecked] = useState(true);
  const [title, setTitle] = useState('Everything is up to date');
  const [description, setDescription] = useState('Your workspace is synchronized and ready to go.');
  const [alertTone, setAlertTone] = useState<AlertTone>('success');
  const [progress, setProgress] = useState(72);
  const current = components.find((component) => component.id === kind) || components[0];
  const storybookUrl = import.meta.env.DEV ? 'http://localhost:6006' : `${import.meta.env.BASE_URL}storybook/`;
  const reset = () => {
    setLabel('Create workspace'); setVariant('solid'); setSize('lg'); setRadius(12);
    setDisabled(false); setLoading(false); setFullWidth(false);
    setTone('brand'); setHasDot(true); setPlaceholder('you@company.com'); setInputValue(''); setError(false);
    setChecked(true); setTitle('Everything is up to date'); setDescription('Your workspace is synchronized and ready to go.');
    setAlertTone('success'); setProgress(72);
  };
  const snippet = useMemo(() => {
    const quoted = (value: string) => JSON.stringify(value);
    if (kind === 'button') return `<Button variant=${quoted(variant)} size=${quoted(size)} style={{ borderRadius: ${radius} }}${disabled ? ' disabled' : ''}${loading ? ' loading' : ''}${fullWidth ? ' fullWidth' : ''}>\n  ${label}\n</Button>`;
    if (kind === 'badge') return `<Badge tone=${quoted(tone)}${hasDot ? ' dot' : ''}>${label}</Badge>`;
    if (kind === 'input') return `<TextField label=${quoted(label)} placeholder=${quoted(placeholder)}${disabled ? ' disabled' : ''}${error ? ' error="Please check this value"' : ''} />`;
    if (kind === 'switch') return `<Switch label=${quoted(label)} checked={${checked}} onChange={setChecked}${disabled ? ' disabled' : ''} />`;
    if (kind === 'alert') return `<Alert tone=${quoted(alertTone)} title=${quoted(title)}>\n  ${description}\n</Alert>`;
    return `<Progress value={${progress}} label=${quoted(label)} />`;
  }, [kind, variant, size, radius, disabled, loading, fullWidth, label, tone, hasDot, placeholder, error, checked, alertTone, title, description, progress]);

  const componentPreview = () => {
    if (kind === 'button') return <Button variant={variant} size={size} style={{ borderRadius: radius }} disabled={disabled} loading={loading} fullWidth={fullWidth} trailingIcon={<ArrowUpRight size={17}/>}>{label}</Button>;
    if (kind === 'badge') return <Badge tone={tone} dot={hasDot}>{label}</Badge>;
    if (kind === 'input') return <div className="v3-lab-preview-field"><TextField label={label} placeholder={placeholder} value={inputValue} onChange={(event) => setInputValue(event.target.value)} error={error ? 'Please check this value' : undefined} disabled={disabled} /></div>;
    if (kind === 'switch') return <div className="v3-lab-preview-field"><Switch checked={checked} onChange={setChecked} label={label} disabled={disabled} /></div>;
    if (kind === 'alert') return <div className="v3-lab-preview-field"><Alert tone={alertTone} title={title}>{description}</Alert></div>;
    return <div className="v3-lab-preview-field"><Progress value={progress} label={label}/></div>;
  };
  const labelField = (titleText: string, value: string, change: (value: string) => void) => <label className="v3-lab-property"><span>{titleText}</span><input type="text" value={value} onChange={(event) => change(event.target.value)} /></label>;
  const selectField = <T extends string,>(titleText: string, value: T, change: (value: T) => void, options: readonly T[]) => <label className="v3-lab-property"><span>{titleText}</span><select value={value} onChange={(event) => change(event.target.value as T)}>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
  const toggleField = (titleText: string, value: boolean, change: (value: boolean) => void) => <label className="v3-lab-checkbox"><span>{titleText}</span><input type="checkbox" checked={value} onChange={(event) => change(event.target.checked)} /></label>;
  const story = `${storybookUrl}?path=/story/${current.story}--playground`;

  return <div className="content-page v3-playground">
    <SectionHeading eyebrow="04 / THE INTERACTIVE LAB" title={m.title} description={m.subtitle} />
    <div className="v3-lab-workflow"><span><strong>01</strong>{m.stepOne}</span><ArrowRight size={15}/><span><strong>02</strong>{m.stepTwo}</span><ArrowRight size={15}/><span><strong>03</strong>{m.stepThree}</span></div>
    <div className="v3-lab-picker"><div><span className="v3-lab-overline">{m.choose}</span><p>17 COMPONENTS / 6 IN THIS LAB</p></div><div className="v3-lab-picker-items">{components.map((item) => <button key={item.id} className={kind === item.id ? 'is-active' : ''} onClick={() => { setKind(item.id); reset(); }}>{item.name}<span>{item.category}</span></button>)}</div></div>
    <div className="v3-lab-workspace">
      <section className="v3-lab-visual"><div className="v3-lab-visual-bar"><div><span className="v3-lab-live-dot"/>{m.preview}<small> / {current.name}</small></div><div className="v3-lab-visual-tools"><button title={m.grid} aria-pressed={showGrid} className={showGrid ? 'is-active' : ''} onClick={() => setShowGrid((value) => !value)}><span className="v3-grid-glyph"/></button><button title={m.light} aria-pressed={canvasTheme === 'light'} className={canvasTheme === 'light' ? 'is-active' : ''} onClick={() => setCanvasTheme('light')}><SunMoon size={16}/></button><button title={m.dark} aria-pressed={canvasTheme === 'dark'} className={canvasTheme === 'dark' ? 'is-active' : ''} onClick={() => setCanvasTheme('dark')}><span className="v3-dark-glyph"/></button></div></div>
        <div className={`v3-lab-canvas ${showGrid ? 'is-grid' : ''}`} data-theme={canvasTheme}><div className="v3-lab-canvas-glow" aria-hidden="true"/><div className="v3-lab-product"><span className="v3-lab-spec-label"><MousePointerClick size={16}/>{m.previewTitle}</span><div className="v3-lab-specimen" key={kind}>{componentPreview()}</div><p>{m.status}</p></div><span className="v3-lab-coordinate">X:024 / Y:017</span></div>
        <div className="v3-lab-code-panel"><div className="v3-lab-code-title"><span><Code2 size={16}/>{m.code}</span><button onClick={() => copy(snippet, t('copiedCode'))}><Copy size={15}/>{m.copy}</button></div><pre><code>{snippet}</code></pre></div>
      </section>
      <aside className="v3-lab-inspector"><div className="v3-lab-inspector-head"><div><SlidersHorizontal size={18}/><strong>{m.settings}</strong></div><button title={m.reset} aria-label={m.reset} onClick={reset}><RotateCcw size={16}/></button></div><div className="v3-lab-inspector-scroll"><div className="v3-lab-inspector-group"><span className="v3-lab-group-title">01 / CONTENT</span>
          {['button', 'badge', 'input', 'switch', 'progress'].includes(kind) && labelField(m.label, label, setLabel)}
          {kind === 'input' && labelField(m.placeholder, placeholder, setPlaceholder)}
          {kind === 'alert' && <>{labelField(m.titleText, title, setTitle)}{labelField(m.description, description, setDescription)}</>}
        </div><div className="v3-lab-inspector-group"><span className="v3-lab-group-title">02 / {m.appearance.toUpperCase()}</span>
          {kind === 'button' && <>{selectField(m.variant, variant, setVariant, ['solid','outline','soft','ghost'] as const)}{selectField(m.size, size, setSize, ['sm','md','lg'] as const)}<label className="v3-lab-property"><span>{m.radius}<strong>{radius}px</strong></span><input type="range" min={0} max={32} value={radius} onChange={(event) => setRadius(Number(event.target.value))}/></label></>}
          {kind === 'badge' && selectField(m.tone, tone, setTone, ['neutral','brand','success','warning','info','danger'] as const)}
          {kind === 'alert' && selectField(m.tone, alertTone, setAlertTone, ['info','success','warning','danger'] as const)}
          {kind === 'progress' && <label className="v3-lab-property"><span>{m.value}<strong>{progress}%</strong></span><input type="range" min="0" max="100" value={progress} onChange={(event) => setProgress(Number(event.target.value))}/></label>}
          {kind === 'badge' && toggleField(m.dot, hasDot, setHasDot)}
          {kind === 'button' && toggleField(m.fullWidth, fullWidth, setFullWidth)}
          {kind === 'input' && toggleField(m.error, error, setError)}
        </div>{['button','input','switch'].includes(kind) && <div className="v3-lab-inspector-group"><span className="v3-lab-group-title">03 / {m.state.toUpperCase()}</span>
          {kind === 'button' && toggleField(m.loading, loading, setLoading)}
          {kind === 'switch' && toggleField(m.checked, checked, setChecked)}
          {toggleField(m.disabled, disabled, setDisabled)}
        </div>}</div><div className="v3-lab-inspector-footer"><div><Sparkles size={18}/><p>{m.help}</p></div><a href={story} target="_blank" rel="noopener noreferrer">{m.open}<ExternalLink size={16}/></a><span><Check size={14}/>{m.shared}</span></div></aside>
    </div>
    <div className="v3-lab-bottom-note"><span><WandSparkles size={16}/> PLAYGROUND / DESIGN IN MOTION</span><button onClick={() => copy(snippet, t('copiedCode'))}>{m.copy}<Copy size={16}/></button></div>
  </div>;
}
