'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { getAnalytics, logEvent } from "firebase/analytics";
import ProductCard from '@/components/products/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import type { Product } from '@/lib/types';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const firestore = useFirestore();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!firestore) return;
      const productsCollection = collection(firestore, 'products');
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
      setProducts(productList);
      setLoading(false);
      
      try {
        const analytics = getAnalytics();
        logEvent(analytics, 'view_item_list', {
            item_list_name: 'Produtos da Loja',
            item_list_id: 'shop_page',
            items: productList.map(p => ({
                item_id: p.id,
                item_name: p.name,
                price: p.price,
                item_category: p.category
            }))
        });
      } catch (error) {
          console.error("Firebase Analytics não pôde ser inicializado.", error);
      }
    };

    fetchProducts();
  }, [firestore]);

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="font-headline text-5xl font-bold text-primary">Nossa Coleção</h1>
          <p className="text-lg text-muted-foreground mt-4">Encontre o produto perfeito para você, feito com amor e ingredientes sustentáveis.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[250px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))
          ) : (
            products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
