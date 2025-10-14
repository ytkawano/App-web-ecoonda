
'use client';

import { useWishlist } from '@/context/WishlistContext';
import { products } from '@/lib/products';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const wishlistedProducts = products.filter((product) =>
    wishlist.includes(product.id)
  );

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

      {wishlistedProducts.length > 0 ? (
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
