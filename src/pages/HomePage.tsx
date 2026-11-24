import { useState } from 'react';
import { ArrowRight, ArrowUpRight, BookOpenText, Check, Component, Layers3, MousePointerClick, Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Badge, Button, Switch, TextField } from '../components/ui';
import { useStudio } from '../context/StudioContext';
import type { ButtonVariant } from '../components/ui';
import type { TranslationKey } from '../data/i18n';

interface HomePageProps { t: (key: TranslationKey) => string; navigate: (page: 'foundations' | 'components' | 'playground') => void }

const messages = {
  en: {
    kicker: 'THE COMPONENT SYSTEM FOR CONSIDERED PRODUCTS',
    heading: 'Build with clarity.',
    accent: 'Design with intent.',
    subtitle: 'Every component in one place. Find what you need, adjust the details, and move from idea to implementation without guesswork.',
    browse: 'Browse components',
    play: 'Open the playground',
    start: 'Start here',
    route: 'Three steps. Zero guesswork.',
    routeHint: 'Choose the next step that matches what you want to do.',
    find: 'Find a component',
    findBody: 'Search the catalog and explore real interactive examples.',
    tune: 'Try and customize',
    tuneBody: 'Adjust props, colors, sizes and states in a live preview.',
    use: 'Implement with confidence',
    useBody: 'Understand design tokens and bring components into React.',
    sample: 'A real component, in real time.',
    sampleHint: 'Try changing the style or toggling the control.',
    ready: 'Ready to publish',
    enabled: 'Email notifications',
    style: 'Button style',
    more: 'See all 17 components',
    small: '17 components · 2 themes · 2 directions',
    solid: 'Solid',
    outline: 'Outline',
    soft: 'Soft'
  },
  fa: {
    kicker: 'سیستم کامپوننت برای محصولات دقیق و حرفه‌ای',
    heading: 'با وضوح بساز.',
    accent: 'با هدف طراحی کن.',
    subtitle: 'هر کامپوننت در جای مشخص خودش. پیدایش کن، ویژگی‌هایش را تغییر بده و بدون سردرگمی از ایده به پیاده‌سازی برس.',
    browse: 'مشاهده کامپوننت‌ها',
    play: 'ورود به آزمایشگاه',
    start: 'از اینجا شروع کن',
    route: 'سه قدم، بدون سردرگمی.',
    routeHint: 'بر اساس کاری که می‌خواهی انجام بدهی، مسیرت را انتخاب کن.',
    find: 'پیدا کردن کامپوننت',
    findBody: 'در کاتالوگ جست‌وجو کن و نمونه تعاملی را ببین.',
    tune: 'آزمایش و شخصی‌سازی',
    tuneBody: 'ویژگی‌ها، اندازه‌ها و وضعیت‌ها را در پیش‌نمایش تغییر بده.',
    use: 'پیاده‌سازی مطمئن',
    useBody: 'توکن‌های طراحی را بشناس و کامپوننت را در React استفاده کن.',
    sample: 'یک کامپوننت واقعی، با تغییرات زنده.',
    sampleHint: 'استایل دکمه را عوض کن یا سوییچ را تغییر بده.',
    ready: 'آماده انتشار',
    enabled: 'اعلان‌های ایمیلی',
    style: 'استایل دکمه',
    more: 'مشاهده تمام ۱۷ کامپوننت',
    small: '۱۷ کامپوننت · ۲ تم · ۲ جهت نمایش',
    solid: 'Solid',
    outline: 'Outline',
    soft: 'Soft'
  }
};

export function HomePage({ navigate }: HomePageProps) {
  const { locale } = useStudio();
  const m = messages[locale];
  const [variant, setVariant] = useState<ButtonVariant>('solid');
  const [enabled, setEnabled] = useState(true);
  const [name, setName] = useState('');
  const steps = [
    { key: '01', icon: <Search size={24} />, title: m.find, description: m.findBody, action: 'components' as const, meta: 'COMPONENT INDEX' },
    { key: '02', icon: <SlidersHorizontal size={24} />, title: m.tune, description: m.tuneBody, action: 'playground' as const, meta: 'INTERACTIVE LAB' },
    { key: '03', icon: <Layers3 size={24} />, title: m.use, description: m.useBody, action: 'foundations' as const, meta: 'FOUNDATIONS' }
  ];
  return <div className="ux-home">
    <section className="ux-hero">
      <div className="ux-hero-copy">
        <span className="ux-eyebrow"><span className="ux-indicator" />{m.kicker}</span>
        <h1>{m.heading}<span>{m.accent}</span></h1>
        <p>{m.subtitle}</p>
        <div className="ux-hero-actions">
          <Button size="lg" trailingIcon={<ArrowUpRight size={18} />} onClick={() => navigate('components')}>{m.browse}</Button>
          <button className="ux-link-button" onClick={() => navigate('playground')}>{m.play}<ArrowRight size={18} /></button>
        </div>
        <div className="ux-hero-proof"><Check size={16} />{m.small}</div>
      </div>
      <div className="ux-demo-panel">
        <div className="ux-demo-bar"><span><span className="ux-demo-dot" />INTERACTIVE PREVIEW</span><Badge tone="success" dot>LIVE</Badge></div>
        <div className="ux-demo-inner">
          <div className="ux-demo-caption"><Sparkles size={17} /><span>{m.sample}</span></div>
          <TextField label="Workspace" placeholder="Your workspace" value={name} onChange={(event) => setName(event.target.value)} />
          <Switch label={m.enabled} checked={enabled} onChange={setEnabled} />
          <div className="ux-demo-choice"><span>{m.style}</span><div>{(['solid', 'outline', 'soft'] as const).map((type) => <button key={type} className={variant === type ? 'is-active' : ''} onClick={() => setVariant(type)}>{m[type]}</button>)}</div></div>
          <Button fullWidth variant={variant} onClick={() => navigate('playground')} trailingIcon={<ArrowRight size={16} />}>{m.ready}</Button>
          <p className="ux-demo-small"><MousePointerClick size={14} />{m.sampleHint}</p>
        </div>
      </div>
    </section>
    <section className="ux-steps">
      <div className="ux-section-heading"><span className="ux-eyebrow">01 / {m.start}</span><h2>{m.route}</h2><p>{m.routeHint}</p></div>
      <div className="ux-step-grid">{steps.map((step) => <button key={step.key} className="ux-step-card" onClick={() => navigate(step.action)}><div className="ux-step-top"><span>{step.key} / {step.meta}</span><ArrowUpRight size={18} /></div><div className="ux-step-icon">{step.icon}</div><strong>{step.title}</strong><p>{step.description}</p><span className="ux-step-footer">{step.key === '01' ? <Component size={17} /> : step.key === '02' ? <MousePointerClick size={17} /> : <BookOpenText size={17} />}<ArrowRight size={18} /></span></button>)}</div>
    </section>
    <div className="ux-home-end"><span>COREUI / REACT + TYPESCRIPT</span><button onClick={() => navigate('components')}>{m.more}<ArrowUpRight size={17} /></button></div>
  </div>;
}
