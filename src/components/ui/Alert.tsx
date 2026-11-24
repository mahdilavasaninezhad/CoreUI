import { AlertCircle, CheckCircle2, Info, TriangleAlert } from 'lucide-react';
import type { ReactNode } from 'react';

export type AlertTone = 'info' | 'success' | 'warning' | 'danger';
export function Alert({ tone = 'info', title, children }: { tone?: AlertTone; title: string; children: ReactNode }) {
  const Icon = tone === 'success' ? CheckCircle2 : tone === 'warning' ? TriangleAlert : tone === 'danger' ? AlertCircle : Info;
  return <div className={`cu-alert cu-alert--${tone}`} role="status"><Icon size={19} /><div><strong>{title}</strong><p>{children}</p></div></div>;
}
