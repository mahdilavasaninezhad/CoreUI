import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  label?: string;
  hint?: string;
  error?: string;
  prefix?: ReactNode;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, hint, error, prefix, className = '', id, required, ...props },
  ref
) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const helpId = `${inputId}-help`;
  return <div className={`cu-field ${className}`}>
    {label ? <label className="cu-field-label" htmlFor={inputId}>{label}{required ? <span className="cu-required"> *</span> : null}</label> : null}
    <div className={`cu-input-shell ${error ? 'cu-input-shell--error' : ''}`}>
      {prefix ? <span className="cu-input-prefix">{prefix}</span> : null}
      <input {...props} ref={ref} id={inputId} required={required} aria-invalid={Boolean(error)} aria-describedby={error || hint ? helpId : undefined} className="cu-input" />
    </div>
    {error || hint ? <span id={helpId} className={`cu-field-hint ${error ? 'cu-field-error' : ''}`}>{error || hint}</span> : null}
  </div>;
});
