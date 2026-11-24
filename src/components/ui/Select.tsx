import { forwardRef, useId } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string }[];
}
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({ label, options, className = '', id, ...props }, ref) {
  const generatedId = useId();
  const inputId = id || generatedId;
  return <div className={`cu-field ${className}`}>
    {label ? <label className="cu-field-label" htmlFor={inputId}>{label}</label> : null}
    <div className="cu-select-wrap"><select {...props} id={inputId} ref={ref} className="cu-select">{options.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select><ChevronDown size={16} aria-hidden="true" /></div>
  </div>;
});
