'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';

export default function Dialog({ children, labelledBy, onClose, className = '' }: {
  children: ReactNode;
  labelledBy: string;
  onClose: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    const opener = document.activeElement;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    closeRef.current?.focus({ preventScroll: true });
    document.body.style.overflow = 'hidden';
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus({ preventScroll: true });
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onCancel={event => { event.preventDefault(); onClose(); }}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={event => {
        if (event.key !== 'Tab') return;
        const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )).filter(element => element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-4 text-on-surface open:flex items-center justify-center sm:p-6 backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className={`relative max-h-[85dvh] w-full overflow-y-auto rounded-2xl border border-glass-stroke bg-surface p-8 shadow-2xl md:p-10 ${className}`}>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close dialog" className="absolute top-4 right-4 rounded-full bg-surface-variant p-2 text-on-surface-variant transition-colors hover:bg-surface-bright hover:text-primary">
          <X size={20} aria-hidden="true" />
        </button>
        {children}
      </div>
    </dialog>
  );
}
