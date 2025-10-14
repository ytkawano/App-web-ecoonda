'use client';

import { Logo } from '@/components/icons/Logo';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { Menu, ShoppingCart, User, Heart, LogOut } from 'lucide-react';

const mainNavLinks = [
  { href: '/', label: 'Loja' },
  { href: '/dashboard', label: 'Painel' },
  { href: '/recommendations', label: 'Para Você' },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();
  const { wishlist } = useWishlist();
  const { toast } = useToast();

  const handleLogout = async () => {
    await signOut(auth);
    toast({ title: "Você saiu da sua conta." });
  };

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

  const UserMenu = () => {
    if (loading) return null;

    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="wave-hover">
              <User className="h-5 w-5" />
              <span className="sr-only">Minha Conta</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/account">Minha Conta</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <Button variant="ghost" asChild>
        <Link href="/login">Login</Link>
      </Button>
    );
  };

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
                <span className="sr-only">Alternar Menu</span>
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
            <UserMenu />
            <Link href="/wishlist" passHref>
              <Button variant="ghost" size="icon" className="relative wave-hover">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Lista de Desejos</span>
                {wishlist.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="wave-hover">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Carrinho</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
