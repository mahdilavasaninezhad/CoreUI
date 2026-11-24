import { useId } from 'react';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
}

export function Switch({ checked, onChange, label, description, disabled = false }: SwitchProps) {
  const id = useId();
  return <label className={`cu-switch-field ${disabled ? 'is-disabled' : ''}`} htmlFor={id}>
    <span><span className="cu-choice-label">{label}</span>{description ? <span className="cu-choice-description">{description}</span> : null}</span>
    <span className="cu-switch-wrap"><input id={id} type="checkbox" role="switch" checked={checked} disabled={disabled} onChange={(event) => onChange(event.target.checked)} /><span aria-hidden="true" className="cu-switch-track"><span className="cu-switch-thumb" /></span></span>
  </label>;
}
