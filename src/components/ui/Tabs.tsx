import { useId } from 'react';
import type { ReactNode } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel?: string;
}

export function Tabs({ items, value, onChange, ariaLabel = 'Tabs' }: TabsProps) {
  const instanceId = useId();
  const selected = items.find((item) => item.id === value) || items[0];
  return <div className="cu-tabs">
    <div className="cu-tab-list" role="tablist" aria-label={ariaLabel}>
      {items.map((item, index) => <button key={item.id} type="button" id={`${instanceId}-tab-${index}`} role="tab" aria-selected={selected?.id === item.id} aria-controls={`${instanceId}-panel-${index}`} tabIndex={selected?.id === item.id ? 0 : -1} className={`cu-tab ${selected?.id === item.id ? 'is-selected' : ''}`} onClick={() => onChange(item.id)} onKeyDown={(event) => {
        const direction = document.documentElement.dir === 'rtl' ? -1 : 1;
        const increment = event.key === 'ArrowRight' ? direction : event.key === 'ArrowLeft' ? -direction : 0;
        if (!increment) return;
        event.preventDefault();
        const next = (index + increment + items.length) % items.length;
        onChange(items[next].id);
        const parent = event.currentTarget.parentElement;
        const buttons = parent?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
        buttons?.[next]?.focus();
      }}>{item.label}</button>)}
    </div>
    {selected ? <div className="cu-tab-panel" role="tabpanel" id={`${instanceId}-panel-${items.indexOf(selected)}`} aria-labelledby={`${instanceId}-tab-${items.indexOf(selected)}`} tabIndex={0}>{selected.content}</div> : null}
  </div>;
}
