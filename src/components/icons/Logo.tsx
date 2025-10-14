import { cn } from '@/lib/utils';
import Link from 'next/link';
import { EcoondaLogo } from './EcoondaLogo';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'block transition-opacity hover:opacity-80',
        className
      )}
    >
      <EcoondaLogo />
    </Link>
  );
}
