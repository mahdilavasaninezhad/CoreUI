import { useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowRight, Check, Fingerprint, ShieldCheck, Sparkles } from 'lucide-react';
import { Badge, Button, Card, Checkbox, Progress, TextField } from '../components/ui';
import { SectionHeading } from '../components/layout/SectionHeading';
import { useToast } from '../components/ui/Toast';
import type { TranslationKey } from '../data/i18n';

export function PatternsPage({ t }: { t: (key: TranslationKey) => string }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [updates, setUpdates] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { notify } = useToast();

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) { setError(t('nameRequired')); return; }
    setError('');
    setSubmitted(true);
    notify(t('patternComplete'));
  };

  return <div className="content-page">
    <SectionHeading eyebrow="03 / REAL-WORLD PATTERNS" title={t('patternsTitle')} description={t('patternsDescription')} />
    <div className="pattern-grid">
      <section className="pattern-poster"><span className="pattern-poster-label">THE START OF SOMETHING GOOD / 001</span><div className="pattern-art"><span className="pattern-art-a" /><span className="pattern-art-b" /><span className="pattern-art-symbol">✳</span></div><h2>{t('onboardingTitle')}</h2><p>{t('onboardingSubtitle')}</p><span className="pattern-poster-footer">COREUI · DESIGN FOR HUMANS</span></section>
      <Card className="pattern-form-card">
        <div className="pattern-form-mark"><Fingerprint size={24}/></div>
        {submitted ? <div className="pattern-success"><span><Check size={26}/></span><h2>{t('patternComplete')}</h2><p>{name}</p><Button variant="outline" onClick={() => {setSubmitted(false);setName('');setRole('');}}>{t('startNow')}</Button></div> : <>
          <div className="pattern-form-header"><Badge tone="info">01 / 02</Badge><h2>{t('startNow')}</h2><p>{t('onboardingSubtitle')}</p></div>
          <Progress value={50} label={t('onboarding')} />
          <form className="pattern-form" onSubmit={submit}>
            <TextField label={t('firstName')} value={name} onChange={(event) => {setName(event.target.value);setError('');}} error={error} placeholder={t('firstNamePlaceholder')}/>
            <TextField label={t('role')} value={role} onChange={(event) => setRole(event.target.value)} placeholder={t('rolePlaceholder')}/>
            <Checkbox checked={updates} onChange={setUpdates} label={t('updates')}/>
            <Button type="submit" size="lg" trailingIcon={<ArrowRight size={17}/>} fullWidth>{t('continue')}</Button>
          </form>
          <div className="pattern-form-safe"><ShieldCheck size={16}/><span>{t('accessibleByDesign')}</span></div>
        </>}
      </Card>
    </div>
    <section className="pattern-footer"><div><Sparkles size={25}/><h3>{t('previewHeading')}</h3><p>{t('previewSubtitle')}</p></div><div className="pattern-mini-preview"><Badge tone="success" dot>Live system</Badge><span className="pattern-mini-chip">Form 01</span><span className="pattern-mini-chip">Validation</span><span className="pattern-mini-chip">Keyboard ready</span></div></section>
  </div>;
}
