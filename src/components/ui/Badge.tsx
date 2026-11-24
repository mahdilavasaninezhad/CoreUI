import type { HTMLAttributes } from 'react';

export type BadgeTone = 'neutral' | 'brand' | 'success' | 'warning' | 'info' | 'danger';
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  dot?: boolean;
}

export function Badge({ tone = 'neutral', dot = false, className = '', children, ...props }: BadgeProps) {
  return <span {...props} className={`cu-badge cu-badge--${tone} ${className}`}>{dot ? <span className="cu-badge-dot" /> : null}{children}</span>;
}
