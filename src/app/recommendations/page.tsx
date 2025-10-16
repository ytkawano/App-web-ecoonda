'use client';

import RecommendationEngine from "@/components/recommendations/RecommendationEngine";
import { Product, UserProfile } from "@/lib/types";
import { useAuth, useFirestore } from "@/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function RecommendationsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const firestore = useFirestore();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!firestore) return;
      setLoading(true);
      try {
        // Fetch all products
        const productsCollection = collection(firestore, 'products');
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
        setAllProducts(productList);

        // Fetch user profile if logged in
        if (user) {
          const userDocRef = doc(firestore, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserProfile(userDoc.data() as UserProfile);
          }
        }
      } catch (error) {
        console.error("Error fetching data for recommendations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [firestore, user]);

  const initialPreferences = {
    // This is a placeholder, skin type should be part of the user profile in a real app
    skinType: 'normal',
    // This is also a placeholder for sustainability preferences
    sustainabilityPreferences: userProfile?.earnedBadges || [],
    purchaseHistory: userProfile?.purchaseHistory || [],
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="text-center">
        <h1 className="mb-4 font-headline text-5xl font-bold tracking-tight text-primary md:text-6xl">
          Selecionado para Você
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
          Deixe nossa IA guiá-lo para os produtos ECOONDA perfeitos com base em seu perfil e preferências únicos.
        </p>
      </div>

      <div className="mt-12">
        {loading || authLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : (
          <RecommendationEngine
            allProducts={allProducts}
            initialPreferences={initialPreferences}
          />
        )}
      </div>
    </div>
  );
}
