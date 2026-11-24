import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'solid' | 'outline' | 'soft' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'solid', size = 'md', loading = false, leadingIcon, trailingIcon, fullWidth = false, className = '', disabled, children, ...props },
  ref
) {
  return <button ref={ref} {...props} disabled={disabled || loading} className={`cu-button cu-button--${variant} cu-button--${size} ${fullWidth ? 'cu-button--full' : ''} ${className}`}>
    {loading ? <span aria-hidden="true" className="cu-spinner" /> : leadingIcon ? <span className="cu-button-icon">{leadingIcon}</span> : null}
    <span>{children}</span>
    {!loading && trailingIcon ? <span className="cu-button-icon">{trailingIcon}</span> : null}
  </button>;
});
