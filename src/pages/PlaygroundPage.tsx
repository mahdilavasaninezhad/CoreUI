import { useMemo, useState } from 'react';
import { ArrowUpRight, Code2, Copy, MousePointer2, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { Badge, Button, Select, Switch } from '../components/ui';
import type { ButtonSize, ButtonVariant } from '../components/ui';
import { SectionHeading } from '../components/layout/SectionHeading';
import type { TranslationKey } from '../data/i18n';

export function PlaygroundPage({ t, copy }: { t: (key: TranslationKey) => string; copy: (value: string, message?: string) => void }) {
  const [variant, setVariant] = useState<ButtonVariant>('solid');
  const [size, setSize] = useState<ButtonSize>('lg');
  const [radius, setRadius] = useState(7);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const code = useMemo(() => `<Button\n  variant="${variant}"\n  size="${size}"${disabled ? '\n  disabled' : ''}${loading ? '\n  loading' : ''}\n  style={{ borderRadius: ${radius} }}\n>\n  Launch something\n</Button>`, [variant, size, radius, disabled, loading]);

  return <div className="content-page"><SectionHeading eyebrow="04 / COMPONENT LAB" title={t('playgroundTitle')} description={t('playgroundDescription')} />
    <div className="lab-layout">
      <div className="lab-preview">
        <div className="lab-topline"><span><MousePointer2 size={15} />{t('livePreview')}</span><Badge tone="success" dot>LIVE</Badge></div>
        <div className="lab-preview-stage"><div className="lab-art-grid" /><div className="lab-preview-object"><span>01 / BUTTON COMPONENT</span><Button style={{borderRadius:radius}} variant={variant} size={size} disabled={disabled} loading={loading} trailingIcon={<ArrowUpRight size={18}/>} onClick={() => copy(code, t('copiedCode'))}>{t('buttonText')}</Button><p>{t('tapPreview')}</p></div></div>
        <div className="lab-bottomline"><span>COREUI / INTERACTION ENGINE</span><span>100% REACT</span></div>
      </div>
      <aside className="lab-controls">
        <div className="lab-controls-title"><SlidersHorizontal size={18}/><strong>{t('controlPanel')}</strong><button aria-label="Reset" onClick={() => {setVariant('solid');setSize('lg');setRadius(7);setDisabled(false);setLoading(false);}}><RotateCcw size={16}/></button></div>
        <Select label={t('variant')} value={variant} onChange={(event) => setVariant(event.target.value as ButtonVariant)} options={['solid','outline','soft','ghost'].map((value)=>({label:value.toUpperCase(),value}))}/>
        <Select label={t('size')} value={size} onChange={(event) => setSize(event.target.value as ButtonSize)} options={['sm','md','lg'].map((value)=>({label:value.toUpperCase(),value}))}/>
        <div className="lab-slider"><div><label htmlFor="radiusRange">{t('radius')}</label><strong>{radius}px</strong></div><input id="radiusRange" type="range" min="0" max="30" step="1" value={radius} onChange={(event)=>setRadius(Number(event.target.value))}/></div>
        <div className="lab-toggle-group"><Switch checked={loading} onChange={setLoading} label={t('loading')}/><Switch checked={disabled} onChange={setDisabled} label={t('disabled')}/></div>
        <div className="lab-code"><div><span><Code2 size={17}/>{t('codeExport')}</span><button onClick={() => copy(code,t('copiedCode'))}><Copy size={15}/>{t('copy')}</button></div><pre><code>{code}</code></pre></div>
      </aside>
    </div>
  </div>;
}
