export interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
}

export function Progress({ value, max = 100, label, showValue = true }: ProgressProps) {
  const pct = Math.max(0, Math.min(100, max > 0 ? value / max * 100 : 0));
  return <div className="cu-progress-wrap">
    {label || showValue ? <div className="cu-progress-caption"><span>{label}</span>{showValue ? <strong>{Math.round(pct)}%</strong> : null}</div> : null}
    <div className="cu-progress" role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={Math.max(0, Math.min(max, value))} aria-label={label || 'Progress'}><span style={{ width: `${pct}%` }} /></div>
  </div>;
}
