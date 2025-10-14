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
import { useCart } from '@/context/CartContext';
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
import { Avatar, AvatarFallback } from '../ui/avatar';

const mainNavLinks = [
  { href: '/shop', label: 'Loja' },
  { href: '/recommendations', label: 'Para Você' },
  { href: '/about', label: 'Sobre' },
  { href: '/sustainability', label: 'Sustentabilidade' },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();
  const { wishlist } = useWishlist();
  const { totalItems } = useCart();
  const { toast } = useToast();

  const handleLogout = async () => {
    await signOut(auth);
    toast({ title: "Você saiu da sua conta." });
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return names[0][0];
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
              'text-sm font-medium transition-colors hover:text-accent wave-hover',
              isActive ? 'text-accent' : 'text-foreground/80',
              isMobile && 'block px-4 py-2 text-base'
            )}
          >
            {label}
          </Link>
        );
      })}
        {user && (
          <Link
            key="/account"
            href="/account"
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
            className={cn(
              'text-sm font-medium transition-colors hover:text-accent wave-hover',
              pathname.startsWith('/account') || pathname.startsWith('/dashboard') ? 'text-accent' : 'text-foreground/80',
              isMobile && 'block px-4 py-2 text-base'
            )}
          >
            Minha Conta
          </Link>
        )}
    </>
  );

  const UserMenu = () => {
    if (loading) return null;

    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <p>Minha Conta</p>
              <p className="text-xs text-muted-foreground font-normal">{user.email}</p>
              </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/account">Perfil</Link>
            </DropdownMenuItem>
             <DropdownMenuItem asChild>
              <Link href="/dashboard/impact">Meu Impacto</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
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
            <Link href="/cart" passHref>
              <Button variant="ghost" size="icon" className="relative wave-hover">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Carrinho</span>
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
