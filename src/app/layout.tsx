'use client';

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from '@/components/ui/toaster';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from '@/components/layout/SplashScreen';

const metadata: Metadata = {
  title: 'ECOONDA: Beleza Marinha',
  description:
    'Descubra cosméticos sustentáveis e veganos inspirados no oceano. Junte-se à nossa missão por um planeta mais limpo.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <title>{String(metadata.title)}</title>
        <meta name="description" content={String(metadata.description)} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700;900&family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body text-foreground antialiased'
        )}
      >
        <AnimatePresence>
          {isLoading && <SplashScreen />}
        </AnimatePresence>
        
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              {!isLoading && (
                <div className="relative flex min-h-screen flex-col">
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
              )}
              <Toaster />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}