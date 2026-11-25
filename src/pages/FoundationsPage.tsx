import { Copy, CornerDownRight } from 'lucide-react';
import { SectionHeading } from '../components/layout/SectionHeading';
import { useStudio } from '../context/StudioContext';
import type { TranslationKey } from '../data/i18n';

interface FoundationsProps { t: (key: TranslationKey) => string; copy: (value: string, message?: string) => void }

const colors = [
  { name: 'Ink', light: '#17191E', dark: '#F4F3FB', group: '01', inverted: true },
  { name: 'Paper', light: '#F6F5F3', dark: '#12141C', group: '01', inverted: false },
  { name: 'Electric Iris', light: '#7857E8', dark: '#B49BFF', group: '02', inverted: true },
  { name: 'Graphite', light: '#343647', dark: '#CECBE1', group: '02', inverted: true },
  { name: 'Mint', light: '#DDF5E6', dark: '#223D35', group: '03', inverted: false },
  { name: 'Lilac', light: '#E9E3FD', dark: '#373049', group: '03', inverted: false },
  { name: 'Butter', light: '#EDFFAB', dark: '#46492A', group: '03', inverted: false },
  { name: 'Line', light: '#E0E1E5', dark: '#41424F', group: '01', inverted: false }
];

const spacings = [{px:4,token:1},{px:8,token:2},{px:12,token:3},{px:16,token:4},{px:20,token:5},{px:24,token:6},{px:32,token:8},{px:40,token:10},{px:48,token:12},{px:64,token:16}];
const radii = [{ label: 'Small', px: 7 }, { label: 'Medium', px: 11 }, { label: 'Large', px: 17 }, { label: 'Extra', px: 24 }];

export function FoundationsPage({ t, copy }: FoundationsProps) {
  const { theme } = useStudio();
  return <div className="content-page">
    <SectionHeading eyebrow="01 / FOUNDATIONS" title={t('foundationsTitle')} description={t('foundationsDescription')} />
    <section className="docs-block"><div className="docs-block-heading"><div><span>{t('colors')}</span><h2>{t('semantic')}</h2></div><p>{t('colorNote')}</p></div>
      <div className="swatch-grid">{colors.map((color) => <button type="button" className="swatch-card" key={color.name} onClick={() => copy(theme === 'light' ? color.light : color.dark, t('tokenCopied'))}>
        <span className="swatch-preview" style={{ background: theme === 'light' ? color.light : color.dark, color: color.inverted ? '#fff' : '#20211f' }}><span>{color.group}</span><Copy size={16} /></span><span className="swatch-details"><strong>{color.name}</strong><code>{theme === 'light' ? color.light : color.dark}</code></span>
      </button>)}</div>
    </section>
    <section className="docs-block"><div className="docs-block-heading"><div><span>{t('typography')}</span><h2>{t('typeShowcase')}</h2></div><p>{t('typeCaption')}</p></div>
      <div className="type-specimen"><div className="type-aa">Aa<span>↗</span></div><div className="type-rows"><div><span>01 / {t('typeDisplay')}</span><strong className="specimen-display">Build beautifully.</strong><small>60PX / 700 / -0.065EM</small></div><div><span>02 / {t('typeHeading')}</span><strong className="specimen-heading">Make every detail count.</strong><small>32PX / 700 / -0.045EM</small></div><div><span>03 / {t('typeBody')}</span><strong className="specimen-body">Typography is how information becomes understandable and memorable.</strong><small>15PX / 400 / 1.65</small></div><div><span>04 / {t('typeCaptionLabel')}</span><strong className="specimen-caption">A SMALL PIECE OF USEFUL INFORMATION</strong><small>11PX / 750 / .12EM</small></div></div></div>
    </section>
    <section className="docs-block"><div className="docs-block-heading"><div><span>{t('spacing')}</span><h2>4 / 8 / 12 / 16 / 24 / 32 / 48 / 64</h2></div><p>{t('spacingNote')}</p></div><div className="spacing-demo">{spacings.map(({px,token}) => <div className="spacing-row" key={px}><span>{px.toString().padStart(2, '0')}px</span><div style={{ width: `${px * 4}px` }} /><code>--space-{token}</code></div>)}</div>
      <div className="radius-gallery"><div className="radius-title"><CornerDownRight size={20} />{t('radiusNote')}</div><div className="radius-list">{radii.map((item) => <div key={item.label} className="radius-item"><span style={{ borderRadius: item.px }}/><strong>{item.label}</strong><code>{item.px}px</code></div>)}</div></div>
    </section>
  </div>;
}
