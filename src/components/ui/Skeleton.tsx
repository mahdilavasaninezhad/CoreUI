export function Skeleton({ width = '100%', height = 16, round = false }: { width?: string | number; height?: string | number; round?: boolean }) {
  return <span className={`cu-skeleton ${round ? 'cu-skeleton--round' : ''}`} aria-hidden="true" style={{ width, height }} />;
}
