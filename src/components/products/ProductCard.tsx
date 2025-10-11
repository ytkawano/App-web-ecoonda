import { Product } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { placeholderImages } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const placeholder = placeholderImages.find((p) => p.id === product.imageId);

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl">
        <CardContent className="p-0">
          <div className="relative aspect-[3/4]">
            {placeholder && (
              <Image
                src={placeholder.imageUrl}
                alt={product.name}
                data-ai-hint={placeholder.imageHint}
                fill
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
               <div className="translate-y-4 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
                <Button variant="secondary" size="sm" className="w-full">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Quick Add
                </Button>
              </div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-headline text-lg font-semibold text-primary truncate">
              {product.name}
            </h3>
            <p className="text-md font-medium text-muted-foreground">${product.price.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
