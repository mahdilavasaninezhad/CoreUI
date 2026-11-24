import { useId } from 'react';
import { Check } from 'lucide-react';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
}

export function Checkbox({ checked, onChange, label, description, disabled = false }: CheckboxProps) {
  const id = useId();
  return <label className={`cu-check-field ${disabled ? 'is-disabled' : ''}`} htmlFor={id}>
    <span className="cu-check-wrap"><input id={id} type="checkbox" checked={checked} disabled={disabled} onChange={(event) => onChange(event.target.checked)} /><span className="cu-check-art" aria-hidden="true"><Check size={13} strokeWidth={3} /></span></span>
    <span><span className="cu-choice-label">{label}</span>{description ? <span className="cu-choice-description">{description}</span> : null}</span>
  </label>;
}
