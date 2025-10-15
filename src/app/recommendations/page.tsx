'use client';

import RecommendationEngine from "@/components/recommendations/RecommendationEngine";
import { userPreferences } from "@/lib/data";
import { Product } from "@/lib/types";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function RecommendationsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsCollection = collection(db, 'products');
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
        setAllProducts(productList);
      } catch (error) {
        console.error("Error fetching products for recommendations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : (
          <RecommendationEngine
            allProducts={allProducts}
            initialPreferences={userPreferences}
          />
        )}
      </div>
    </div>
  );
}
