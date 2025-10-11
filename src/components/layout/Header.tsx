'use client';

import { Logo } from '@/components/icons/Logo';
import { cn } from '@/lib/utils';
import { Menu, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { useState } from 'react';

const mainNavLinks = [
  { href: '/', label: 'Shop' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/recommendations', label: 'For You' },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {mainNavLinks.map(({ href, label }) => {
        const isActive =
          href === '/'
            ? pathname === href
            : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
            className={cn(
              'text-sm font-medium transition-colors hover:text-accent',
              isActive ? 'text-accent' : 'text-foreground/80',
              isMobile && 'block px-4 py-2 text-base'
            )}
          >
            {label}
          </Link>
        );
      })}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] pt-10">
              <Logo className="mb-8 ml-4" />
              <nav className="flex flex-col gap-2">
                <NavLinks isMobile />
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Can be a search bar later */}
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <NavLinks />
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="wave-hover">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
            <Button variant="ghost" size="icon" className="wave-hover">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
