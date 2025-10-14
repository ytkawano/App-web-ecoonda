'use client';

import { Product } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { placeholderImages } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const placeholder = placeholderImages.find((p) => p.id === product.imageId);
  const { isProductInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isProductInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  }

  return (
    <Card className="group overflow-hidden rounded-lg border-none shadow-none transition-all duration-300 ease-in-out hover:shadow-xl">
      <Link href={`/products/${product.id}`} className="block">
        <CardContent className="p-0">
          <div className="relative aspect-[3/4] overflow-hidden rounded-md">
            {placeholder && (
              <Image
                src={placeholder.imageUrl}
                alt={product.name}
                data-ai-hint={placeholder.imageHint}
                fill
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            )}
            <div className="absolute top-2 right-2 z-10">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full bg-background/50 text-foreground backdrop-blur-sm hover:bg-background/75"
                onClick={handleWishlistClick}
              >
                <Heart className={isProductInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''} />
              </Button>
            </div>
             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
               <div className="translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                <Button variant="secondary" size="sm" className="w-full" onClick={handleAddToCartClick}>
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Adicionar
                </Button>
              </div>
            </div>
          </div>
          <div className="p-4 bg-transparent">
            <h3 className="font-headline text-lg font-semibold text-primary truncate">
              {product.name}
            </h3>
            <p className="text-md font-medium text-muted-foreground">R${product.price.toFixed(2).replace('.', ',')}</p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
