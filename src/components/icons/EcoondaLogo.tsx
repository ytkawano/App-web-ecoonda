import { cn } from '@/lib/utils';

export function EcoondaLogo({ className }: { className?: string }) {
  return (
    <div className={cn("font-headline font-bold text-3xl tracking-wide text-primary", className)}>
      ECOONDA
    </div>
  );
}