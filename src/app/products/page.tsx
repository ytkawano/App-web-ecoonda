'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { Product } from '@/lib/types';
import { productCategories } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from '@/components/products/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const firestore = useFirestore();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!firestore) return;
      setLoading(true);
      const productsCollection = collection(firestore, 'products');
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
      setProducts(productList);
      setLoading(false);
    };

    fetchProducts();
  }, [firestore]);

  const filteredProducts = products.filter(product => 
    activeCategory === 'all' || product.category === activeCategory
  );

  return (
    <div className="bg-background min-h-screen text-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        {/* Cabeçalho */}
        <header className="mb-12 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
            Explore Nossos Produtos
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Beleza sustentável, inspirada no oceano.
          </p>
        </header>

        {/* Filtros de Categoria */}
        <Tabs defaultValue="all" onValueChange={setActiveCategory} className="w-full mb-10">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full md:w-fit mx-auto">
            <TabsTrigger value="all">Todos</TabsTrigger>
            {productCategories.map(category => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Grade de Produtos */}
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
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
                <p className="text-lg text-muted-foreground">Nenhum produto encontrado nesta categoria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
