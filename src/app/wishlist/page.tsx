
'use client';

import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Product } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const [wishlistedProducts, setWishlistedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const firestore = useFirestore();

  useEffect(() => {
    const fetchWishlistedProducts = async () => {
      setLoading(true);
      if (wishlist.length === 0 || !firestore) {
        setWishlistedProducts([]);
        setLoading(false);
        return;
      }
      
      try {
        const productsQuery = query(collection(firestore, 'products'), where('__name__', 'in', wishlist));
        const querySnapshot = await getDocs(productsQuery);
        const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
        setWishlistedProducts(products);
      } catch (error) {
        console.error("Error fetching wishlisted products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistedProducts();
  }, [wishlist, firestore]);


  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-5xl font-bold tracking-tight text-primary md:text-6xl">
          Sua Lista de Desejos
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Seus produtos favoritos, salvos em um só lugar.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[250px] w-full rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            </div>
            ))}
        </div>
      ) : wishlistedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted bg-card p-12 text-center">
          <h3 className="font-headline text-2xl font-semibold">
            Sua lista de desejos está vazia.
          </h3>
          <p className="mt-2 text-muted-foreground">
            Adicione produtos que você ama para vê-los aqui.
          </p>
          <Button asChild className="mt-6">
            <Link href="/shop">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Explorar Produtos
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
