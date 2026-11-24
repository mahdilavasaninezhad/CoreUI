import type { HTMLAttributes } from 'react';

export function Card({ className = '', children, ...props }: HTMLAttributes<HTMLElement>) {
  return <article {...props} className={`cu-card ${className}`}>{children}</article>;
}
