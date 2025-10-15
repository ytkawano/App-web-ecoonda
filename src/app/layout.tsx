import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import SplashScreen from "@/components/layout/SplashScreen";
import FirebaseClientProvider from "@/firebase/client-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const unbounded = Unbounded({ subsets: ["latin"], variable: "--font-unbounded" });

export const metadata: Metadata = {
  title: "Ecconda - Cosméticos Sustentáveis com IA",
  description: "Descubra o poder da natureza com a Ecconda. Cosméticos veganos, sustentáveis e personalizados para sua pele e para o planeta com o uso de inteligência artificial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${unbounded.variable} font-sans`}>
        <FirebaseClientProvider>
          <CartProvider>
            <WishlistProvider>
              <SplashScreen />
              <Header />
              <main>{children}</main>
              <Footer />
              <Toaster />
            </WishlistProvider>
          </CartProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
