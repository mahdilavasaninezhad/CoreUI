import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Check, Info, X } from 'lucide-react';

type ToastKind = 'success' | 'info';
interface ToastData { id: string; message: string; kind: ToastKind }
interface ToastAPI { notify: (message: string, kind?: ToastKind) => void }
const ToastContext = createContext<ToastAPI | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastData[]>([]);
  const notify = useCallback((message: string, kind: ToastKind = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setItems((prev) => [...prev, { id, kind, message }].slice(-4));
    window.setTimeout(() => setItems((prev) => prev.filter((item) => item.id !== id)), 3500);
  }, []);
  const api = useMemo(() => ({ notify }), [notify]);
  return <ToastContext.Provider value={api}>{children}<div className="cu-toast-area" aria-live="polite" aria-atomic="false">{items.map((item) => <div key={item.id} className="cu-toast" role="status">{item.kind === 'success' ? <Check size={18} /> : <Info size={18} />}<span>{item.message}</span><button type="button" aria-label="Dismiss" onClick={() => setItems((prev) => prev.filter((entry) => entry.id !== item.id))}><X size={16} /></button></div>)}</div></ToastContext.Provider>;
}

export function useToast(): ToastAPI {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}
