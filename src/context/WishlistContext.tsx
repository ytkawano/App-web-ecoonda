'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from "@/components/ui/use-toast"

interface WishlistContextType {
  wishlist: string[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isProductInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<string[]>([]);
  const { toast } = useToast()


  useEffect(() => {
    if (user) {
      // Here you can load the user's wishlist from a database
      // and set the wishlist state.
    }
  }, [user]);

  const addToWishlist = (productId: string) => {
    if (!user) {
        toast({ title: "Faça login para adicionar à sua lista de desejos." });
        return;
    }
    setWishlist((prevWishlist) => [...prevWishlist, productId]);
    toast({ title: "Produto adicionado à sua lista de desejos!" });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((id) => id !== productId)
    );
    toast({ title: "Produto removido da sua lista de desejos." });

  };

  const isProductInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isProductInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
