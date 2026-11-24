import { useId } from 'react';
import type { ReactNode } from 'react';

export function Tooltip({ children, label }: { children: ReactNode; label: string }) {
  const id = useId();
  return <span className="cu-tooltip-wrap"><span className="cu-tooltip-target" tabIndex={0} aria-describedby={id}>{children}</span><span role="tooltip" id={id} className="cu-tooltip-bubble">{label}</span></span>;
}
