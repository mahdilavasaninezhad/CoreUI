import type { CSSProperties } from 'react';

export interface AvatarProps { name: string; size?: 'sm' | 'md' | 'lg'; color?: string }
export function Avatar({ name, size = 'md', color }: AvatarProps) {
  const initials = name.trim().split(/\s+/).slice(0, 2).map((part) => part[0] || '').join('').toUpperCase();
  return <span className={`cu-avatar cu-avatar--${size}`} title={name} aria-label={name} style={color ? { backgroundColor: color } as CSSProperties : undefined}>{initials}</span>;
}
