import { X } from 'lucide-react';
export function Tag({ children, onRemove, removeLabel = 'Remove' }: { children: string; onRemove?: () => void; removeLabel?: string }) {
  return <span className="cu-tag"><span>{children}</span>{onRemove ? <button type="button" aria-label={`${removeLabel} ${children}`} onClick={onRemove}><X size={13} /></button> : null}</span>;
}
