import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'font-headline text-2xl font-bold tracking-tight text-primary transition-colors hover:text-accent',
        className
      )}
    >
      ECOONDA
    </Link>
  );
}
