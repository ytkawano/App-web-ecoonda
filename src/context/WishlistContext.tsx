'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useAuth, useFirestore } from '@/firebase';
import { useToast } from "@/components/ui/use-toast";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { UserProfile } from '@/lib/types';
import { FirestorePermissionError } from '@/firebase/errors';
import { errorEmitter } from '@/firebase/error-emitter';

interface WishlistContextType {
  wishlist: string[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isProductInWishlist: (productId: string) => boolean;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading: authLoading } = useAuth();
  const firestore = useFirestore();
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchWishlist = useCallback(async () => {
    if (user && firestore) {
      setLoading(true);
      const userDocRef = doc(firestore, 'users', user.uid);
      try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const userData = docSnap.data() as UserProfile;
          setWishlist(userData.wishlist || []);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    } else if (!authLoading) {
      setWishlist([]);
      setLoading(false);
    }
  }, [user, firestore, authLoading]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const updateFirestoreWishlist = async (productId: string, operation: 'add' | 'remove') => {
    if (!user || !firestore) return;

    const userDocRef = doc(firestore, 'users', user.uid);
    const updatePayload = {
        wishlist: operation === 'add' ? arrayUnion(productId) : arrayRemove(productId)
    };
    
    updateDoc(userDocRef, updatePayload).catch(serverError => {
        const permissionError = new FirestorePermissionError({
            path: userDocRef.path,
            operation: 'update',
            requestResourceData: updatePayload,
        });
        errorEmitter.emit('permission-error', permissionError);
        // Revert local state on failure
        fetchWishlist();
        toast({
            variant: "destructive",
            title: "Erro na Lista de Desejos",
            description: "Não foi possível atualizar sua lista de desejos.",
        });
    });
  }

  const addToWishlist = (productId: string) => {
    if (!user) {
        toast({ title: "Faça login para adicionar à sua lista de desejos." });
        return;
    }
    setWishlist((prev) => {
        if (prev.includes(productId)) return prev;
        const newWishlist = [...prev, productId];
        updateFirestoreWishlist(productId, 'add');
        return newWishlist;
    });
  };

  const removeFromWishlist = (productId: string) => {
    if (!user) return;
    setWishlist((prev) => {
        if (!prev.includes(productId)) return prev;
        const newWishlist = prev.filter((id) => id !== productId);
        updateFirestoreWishlist(productId, 'remove');
        return newWishlist;
    });
  };

  const isProductInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isProductInWishlist, loading }}
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
