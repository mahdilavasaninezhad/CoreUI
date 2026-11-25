import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Asterisk, BookOpen, Check, CheckCheck, ChevronRight, Code2, Component, Copy, Gauge, Layers, MoveUpRight, Palette, Play, Search, ShieldCheck, SlidersHorizontal, Sparkles, WandSparkles, Zap } from 'lucide-react';
import { Alert, Avatar, Badge, Button, Progress, Switch, TextField } from '../components/ui';
import type { ButtonVariant } from '../components/ui';
import { useStudio } from '../context/StudioContext';
import type { TranslationKey } from '../data/i18n';

type Destination = 'foundations' | 'components' | 'playground';
type Preview = 'components' | 'activity' | 'tokens';
interface HomePageProps {
  t: (key: TranslationKey) => string;
  navigate: (page: Destination) => void;
  copy: (value: string, message?: string) => void;
}

const content = {
  en: {
    eyebrow: 'THE INTERFACE ENGINEERING STUDIO',
    first: 'Make', second: 'every', third: 'pixel', fourth: 'matter.',
    lead: 'A thoughtfully engineered component library, alive with details. Discover, experiment, and build interfaces that feel extraordinary.',
    browse: 'Explore the library', lab: 'Enter the playground', hint: 'YOUR NEXT GREAT INTERFACE STARTS HERE',
    overline: 'AN INTERACTIVE SYSTEM',
    sample: 'The little details are the whole experience.',
    sampleSub: 'A real component in a real interface. Everything here responds to you.',
    project: 'New workspace', projectHint: 'Give your next big idea a place to live.',
    field: 'Workspace name', placeholder: 'e.g. Orbit Studio', notifications: 'Email updates', create: 'Create workspace',
    created: 'Workspace preview is ready', inputHint: 'Try typing a name',
    live: 'Live preview', controls: 'Component lab', foundations: 'Design tokens',
    way: 'One system. Three ways to create.', wayLead: 'No hunting through dozens of pages. Start where your work begins.',
    explore: 'Discover components', exploreDescription: 'Find the right building block. Preview it, inspect its behavior, and copy the code.',
    customize: 'Make it yours', customizeDescription: 'Fine-tune variants, states and details. See changes as you make them.',
    understand: 'Build consistently', understandDescription: 'Tokens, typography and patterns keep the whole experience connected.',
    components: 'Components', interactive: 'Interactive stories', themes: 'Color modes', directions: 'Writing directions',
    collection: 'THE COLLECTION', collectionTitle: 'An entire system. Not another pile of buttons.',
    collectionLead: 'Purpose-built primitives that belong together — thoughtfully designed for the moments people actually interact with.',
    all: 'Explore all 17 components',
    specimen: 'THE DETAILS / 001', specimenTitle: 'Designed to be felt.',
    specimenLead: 'Considered motion, expressive typography, accessible focus states and a visual language that adapts.',
    switchTo: 'Play with the components', ready: 'Make something excellent.', readyDesc: 'Go from a design decision to a working component in a few clicks.',
    openLab: 'Open the live lab', viewDocs: 'Browse components',
    current: 'Current selection', example: 'Appearance', active: 'Active', variant: 'Button style', feedback: 'Delivery status',
    normal: 'Solid', outline: 'Outline', soft: 'Soft',
    palette: 'Token palette', verified: 'Purposeful by default',
    free: 'Independent React project',
    note: 'Interactivity is local to this demo.'
  },
  fa: {
    eyebrow: 'استودیوی مهندسی رابط کاربری',
    first: 'هر', second: 'پیکسل', third: 'باید', fourth: 'معنا داشته باشه.',
    lead: 'کتابخانه‌ای از کامپوننت‌های دقیق و خوش‌ساخت. کشف کن، آزمایش کن و رابط‌هایی بساز که کیفیتشان در جزئیات مشخص باشد.',
    browse: 'مشاهده کتابخانه', lab: 'ورود به آزمایشگاه', hint: 'رابط حرفه‌ای بعدی از همین‌جا شروع می‌شه',
    overline: 'یک سیستم کاملاً تعاملی',
    sample: 'تفاوت اصلی در جزئیاته.',
    sampleSub: 'یک کامپوننت واقعی در یک رابط واقعی. همه چیز اینجا به تعامل تو پاسخ می‌ده.',
    project: 'فضای کاری جدید', projectHint: 'برای ایده بعدی خودت یک فضای اختصاصی بساز.',
    field: 'نام فضای کاری', placeholder: 'مثلاً Orbit Studio', notifications: 'اعلان ایمیلی', create: 'ساخت فضای کاری',
    created: 'پیش‌نمایش فضای کاری آماده‌ست', inputHint: 'نام دلخواهت رو وارد کن',
    live: 'پیش‌نمایش زنده', controls: 'آزمایشگاه کامپوننت', foundations: 'توکن‌های طراحی',
    way: 'یک سیستم؛ سه مسیر روشن.', wayLead: 'نیازی نیست بین ده‌ها صفحه سرگردان بشی؛ از کاری که می‌خوای انجام بدی شروع کن.',
    explore: 'کشف کامپوننت‌ها', exploreDescription: 'کامپوننت مناسب رو پیدا کن، رفتارش رو ببین و کد آماده رو بردار.',
    customize: 'شخصی‌سازی کن', customizeDescription: 'ظاهر، وضعیت‌ها و جزئیات رو تغییر بده و نتیجه رو زنده ببین.',
    understand: 'یکپارچه طراحی کن', understandDescription: 'رنگ، تایپوگرافی و الگوهای طراحی رو در کنار هم بشناس.',
    components: 'کامپوننت', interactive: 'استوری تعاملی', themes: 'حالت رنگ', directions: 'جهت نوشتار',
    collection: 'مجموعه کامپوننت‌ها', collectionTitle: 'یک سیستم کامل؛ نه چند دکمه پراکنده.',
    collectionLead: 'اجزایی که با هم هماهنگ طراحی شدن و برای تجربه‌های واقعی کاربر ساخته شدن.',
    all: 'مشاهده تمام ۱۷ کامپوننت',
    specimen: 'جزئیات / ۰۰۱', specimenTitle: 'طراحی‌ای که حس می‌شه.',
    specimenLead: 'حرکت‌های هدفمند، تایپوگرافی دقیق، فوکوس در دسترس و زبان بصری منعطف.',
    switchTo: 'کامپوننت‌ها رو آزمایش کن', ready: 'یه محصول عالی بساز.', readyDesc: 'از تصمیم طراحی تا کامپوننت واقعی، فقط چند کلیک فاصله‌ست.',
    openLab: 'باز کردن آزمایشگاه', viewDocs: 'دیدن کامپوننت‌ها',
    current: 'انتخاب فعلی', example: 'ظاهر', active: 'فعال', variant: 'استایل دکمه', feedback: 'وضعیت تحویل',
    normal: 'Solid', outline: 'Outline', soft: 'Soft',
    palette: 'پالت توکن‌ها', verified: 'طراحی هدفمند',
    free: 'پروژه مستقل React',
    note: 'تعاملات این بخش نمایشی و محلی‌اند.'
  }
};

export function HomePage({ navigate, copy }: HomePageProps) {
  const { locale } = useStudio();
  const m = content[locale];
  const [view, setView] = useState<Preview>('components');
  const [variant, setVariant] = useState<ButtonVariant>('solid');
  const [notifications, setNotifications] = useState(true);
  const [workspace, setWorkspace] = useState('');
  const [created, setCreated] = useState(false);
  const [featured, setFeatured] = useState<'button' | 'feedback' | 'forms'>('button');
  const steps = [
    { number: '01', label: m.explore, desc: m.exploreDescription, icon: Search, to: 'components' as const, className: 'v3-journey-first' },
    { number: '02', label: m.customize, desc: m.customizeDescription, icon: SlidersHorizontal, to: 'playground' as const, className: 'v3-journey-second' },
    { number: '03', label: m.understand, desc: m.understandDescription, icon: Layers, to: 'foundations' as const, className: 'v3-journey-third' }
  ];
  const code = `<Button variant="${variant}" size="md">${m.create}</Button>`;

  return <div className="v3-home">
    <section className="v3-hero" aria-label={m.eyebrow}>
      <div className="v3-hero-noise" aria-hidden="true" />
      <div className="v3-hero-content">
        <div className="v3-kicker"><span className="v3-pulse" />{m.eyebrow}<span className="v3-kicker-index">/ 2026</span></div>
        <h1><span>{m.first} <em>{m.second}</em></span><span>{m.third}</span><span className="v3-hero-outlined">{m.fourth}</span></h1>
        <p className="v3-hero-lead">{m.lead}</p>
        <div className="v3-hero-actions">
          <button className="v3-action-primary" onClick={() => navigate('components')}>{m.browse}<ArrowUpRight size={19}/></button>
          <button className="v3-action-quiet" onClick={() => navigate('playground')}><Play size={15} fill="currentColor" />{m.lab}<ArrowRight size={16}/></button>
        </div>
        <div className="v3-hero-micro"><Asterisk size={17}/><span>{m.hint}</span><span className="v3-micro-line" /></div>
      </div>
      <div className="v3-hero-art">
        <div className="v3-orbit v3-orbit-one" aria-hidden="true"/><div className="v3-orbit v3-orbit-two" aria-hidden="true"/>
        <span className="v3-hero-float v3-hero-float-top"><Sparkles size={15}/> INTERACTIVE / 01</span>
        <div className="v3-art-window">
          <div className="v3-art-chrome"><div className="v3-window-dots"><i/><i/><i/></div><span>coreui / studio / preview</span><span><Gauge size={14}/> 100%</span></div>
          <div className="v3-art-navigation" role="tablist" aria-label="Live preview sections">
            <button role="tab" aria-selected={view === 'components'} className={view === 'components' ? 'is-active' : ''} onClick={() => setView('components')}><Component size={15}/>{locale === 'fa' ? 'کامپوننت' : 'Component'}</button>
            <button role="tab" aria-selected={view === 'activity'} className={view === 'activity' ? 'is-active' : ''} onClick={() => setView('activity')}><Gauge size={15}/>{locale === 'fa' ? 'پیشرفت' : 'Progress'}</button>
            <button role="tab" aria-selected={view === 'tokens'} className={view === 'tokens' ? 'is-active' : ''} onClick={() => setView('tokens')}><Palette size={15}/>{locale === 'fa' ? 'رنگ‌ها' : 'Colors'}</button>
          </div>
          <div className="v3-art-body" role="tabpanel" aria-live="polite">
            {view === 'components' ? <div className="v3-art-example">
              <div className="v3-art-example-header"><span>{m.sample}</span><Badge tone="success" dot>{m.live}</Badge></div>
              <h3>{m.project}</h3><p>{m.projectHint}</p>
              <TextField label={m.field} placeholder={m.placeholder} value={workspace} onChange={(event) => { setWorkspace(event.target.value); setCreated(false); }}/>
              <Switch label={m.notifications} checked={notifications} onChange={setNotifications}/>
              <div className="v3-art-options"><span>{m.variant}</span><div>{(['solid', 'outline', 'soft'] as const).map((item) => <button key={item} className={variant === item ? 'is-active' : ''} onClick={() => setVariant(item)}>{item}</button>)}</div></div>
              <Button fullWidth variant={variant} onClick={() => setCreated(true)} trailingIcon={created ? <Check size={16}/> : <ArrowUpRight size={16}/>} >{created ? m.created : m.create}</Button>
            </div> : view === 'activity' ? <div className="v3-art-activity">
              <div className="v3-art-example-header"><span>OVERVIEW / 2026</span><Badge tone="brand" dot>{m.active}</Badge></div>
              <span className="v3-activity-number">92<span>%</span></span><h3>{locale === 'fa' ? 'تجربه‌ای در حال پیشرفت' : 'A better experience, daily.'}</h3>
              <Progress value={92} label={locale === 'fa' ? 'درصد تکمیل' : 'Project readiness'}/>
              <div className="v3-activity-team"><div className="v3-team-avatars"><Avatar name="Mina" color="#E5D9FF"/><Avatar name="Alex" color="#D8F5DD"/><Avatar name="Taylor" color="#F9CFBE"/></div><span>12 {locale === 'fa' ? 'تسک تکمیل‌شده' : 'tasks completed'} <CheckCheck size={16}/></span></div>
            </div> : <div className="v3-art-tokens">
              <div className="v3-art-example-header"><span>{m.palette}</span><Badge tone="info">CSS VARIABLES</Badge></div>
              <h3>{locale === 'fa' ? 'رنگ، با منطق.' : 'Color with intention.'}</h3><p>{locale === 'fa' ? 'توکن‌های معنایی برای ساخت تجربه‌ای هماهنگ.' : 'A semantic language that keeps the experience connected.'}</p>
              <div className="v3-art-swatches"><span/><span/><span/><span/><span/></div>
              <button className="v3-token-copy" onClick={() => copy('--color-brand: #7857E8;', 'Token copied')}><Code2 size={15}/> --color-brand: #7857E8 <Copy size={14}/></button>
              <div className="v3-art-token-demo"><Badge tone="brand">Primary</Badge><Badge tone="success">Success</Badge><Badge tone="warning">Warning</Badge></div>
            </div>}
          </div>
          <div className="v3-art-status"><span><span className="v3-status-dot"/>{m.verified}</span><span>REACT · TYPESCRIPT</span></div>
        </div>
        <span className="v3-hero-float v3-hero-float-bottom"><WandSparkles size={16}/> PIXEL PERFECT / NOT JUST PRETTY</span>
        <span className="v3-art-cross" aria-hidden="true">✳</span>
      </div>
    </section>

    <div className="v3-utility-strip" aria-label="Project features"><span><ShieldCheck size={17}/> {m.free}</span><span><Component size={16}/> 17 {m.components}</span><span><BookOpen size={16}/> 17 {m.interactive}</span><span><Palette size={16}/> 02 {m.themes}</span><span><MoveUpRight size={16}/> RTL / LTR</span></div>

    <section className="v3-section v3-journey">
      <div className="v3-section-intro"><span className="v3-section-marker"><span/>/ 01 — START SOMEWHERE</span><h2>{m.way}</h2><p>{m.wayLead}</p></div>
      <div className="v3-journey-grid">{steps.map(({ number, label, desc, icon: Icon, to, className }) => <button key={number} className={`v3-journey-card ${className}`} onClick={() => navigate(to)}>
        <span className="v3-journey-number">/ {number} <ArrowUpRight size={20}/></span><span className="v3-journey-illustration"><Icon size={37} strokeWidth={1.55}/><span className="v3-journey-illustration-shadow"/></span><strong>{label}</strong><p>{desc}</p><span className="v3-journey-end">{number === '01' ? 'COMPONENT INDEX' : number === '02' ? 'LIVE PLAYGROUND' : 'DESIGN FOUNDATIONS'} <ArrowRight size={15}/></span>
      </button>)}</div>
    </section>

    <section className="v3-showcase-section">
      <div className="v3-showcase-head"><div><span className="v3-section-marker"><span/>/ 02 — {m.collection}</span><h2>{m.collectionTitle}</h2><p>{m.collectionLead}</p></div><button onClick={() => navigate('components')}>{m.all}<ArrowUpRight size={18}/></button></div>
      <div className="v3-showcase-grid">
        <div className="v3-showcase-card v3-showcase-button"><div className="v3-showcase-card-head"><span>01 / ACTIONS</span><ArrowUpRight size={17}/></div><div className="v3-showcase-demo"><div className="v3-button-showcase"><Button size="lg" trailingIcon={<ArrowUpRight size={17}/>} onClick={() => navigate('playground')}>{m.openLab}</Button><Button size="md" variant="outline" onClick={() => navigate('components')}>{m.viewDocs}</Button><Button size="sm" variant="soft" leadingIcon={<Zap size={15}/>}>Quick action</Button></div></div><div className="v3-showcase-caption"><strong>01. Buttons & actions</strong><p>{locale === 'fa' ? 'هر تعامل، یک تصمیم دقیق.' : 'Every interaction is a design decision.'}</p></div></div>
        <div className="v3-showcase-card v3-showcase-feedback"><div className="v3-showcase-card-head"><span>02 / FEEDBACK</span><ArrowUpRight size={17}/></div><div className="v3-showcase-demo"><Alert tone="success" title={locale === 'fa' ? 'همه چیز آماده‌ست' : 'Everything is in sync'}>{locale === 'fa' ? 'آخرین تغییرات ذخیره شدن.' : 'Your changes have been saved successfully.'}</Alert><div className="v3-feedback-badges"><Badge tone="success" dot>Live</Badge><Badge tone="brand">New release</Badge><Badge tone="warning">Pending</Badge></div></div><div className="v3-showcase-caption"><strong>02. Meaningful feedback</strong><p>{locale === 'fa' ? 'وضعیت‌ها واضح و قابل تشخیص.' : 'Make every system state unmistakable.'}</p></div></div>
        <div className="v3-showcase-card v3-showcase-form"><div className="v3-showcase-card-head"><span>03 / INPUTS</span><ArrowUpRight size={17}/></div><div className="v3-showcase-demo"><TextField label={m.field} placeholder={m.placeholder} value={workspace} onChange={(event) => setWorkspace(event.target.value)} /><Switch checked={notifications} onChange={setNotifications} label={m.notifications}/></div><div className="v3-showcase-caption"><strong>03. Thoughtful inputs</strong><p>{locale === 'fa' ? 'فرم‌هایی که کار با آن‌ها راحت است.' : 'Forms that feel effortless to use.'}</p></div></div>
        <div className="v3-showcase-card v3-showcase-system"><div className="v3-showcase-card-head"><span>04 / SYSTEM</span><ArrowUpRight size={17}/></div><div className="v3-showcase-demo"><div className="v3-system-art"><div className="v3-system-blob"><Asterisk size={72} strokeWidth={1.15}/></div><div className="v3-system-lines"><span/><span/><span/></div></div></div><div className="v3-showcase-caption"><strong>04. Design language</strong><p>{locale === 'fa' ? 'هماهنگی، فراتر از یک صفحه.' : 'Consistency that scales past one screen.'}</p></div></div>
      </div>
    </section>

    <section className="v3-statement"><div><span className="v3-section-marker"><span/>/ 03 — {m.specimen}</span><h2>{m.specimenTitle}</h2><p>{m.specimenLead}</p><button onClick={() => navigate('playground')}>{m.switchTo}<ChevronRight size={18}/></button></div><div className="v3-statement-art"><div className="v3-statement-disc"><span>Aa</span></div><span className="v3-statement-label v3-statement-label-top">RADIUS / 24PX</span><span className="v3-statement-label v3-statement-label-bottom">FORM MEETS FUNCTION</span><div className="v3-statement-colors"><i/><i/><i/><i/></div></div></section>

    <section className="v3-final-cta"><div className="v3-final-mark"><Asterisk size={42}/></div><div><span>COREUI / CREATE WITH INTENT</span><h2>{m.ready}</h2><p>{m.readyDesc}</p></div><button onClick={() => navigate('playground')}>{m.openLab}<ArrowUpRight size={20}/></button></section>
  </div>;
}
