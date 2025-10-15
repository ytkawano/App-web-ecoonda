'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { placeholderImages } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Leaf, Recycle, Shield } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.id) return;
      setLoading(true);
      try {
        const docRef = doc(db, 'products', params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
        } else {
          notFound();
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <Skeleton className="aspect-[3/4] w-full rounded-lg" />
          <div className="flex flex-col justify-center space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const placeholder = placeholderImages.find((p) => p.id === product.imageId);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
          {placeholder && (
            <Image
              src={placeholder.imageUrl}
              alt={product.name}
              data-ai-hint={placeholder.imageHint}
              fill
              className="object-cover"
            />
          )}
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="font-headline text-4xl font-bold text-primary lg:text-5xl">
            {product.name}
          </h1>
          <p className="mt-2 text-2xl font-semibold text-muted-foreground">
            R${product.price.toFixed(2).replace('.', ',')}
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            {product.description}
          </p>

          <div className="mt-8">
            <Button size="lg" className="w-full wave-animate" onClick={() => addToCart(product)}>
              Adicionar ao Carrinho
            </Button>
          </div>

          <Accordion type="single" collapsible className="mt-8 w-full">
            <AccordionItem value="ingredients">
              <AccordionTrigger className="font-headline text-lg">
                Ingredientes Sustentáveis
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-4 text-sm">
                  {product.ingredients.map((ing) => (
                    <li key={ing.name}>
                      <span className="font-bold">{ing.name}:</span>{' '}
                      {ing.description}
                      <p className="mt-1 text-xs text-muted-foreground">
                        <Leaf className="mr-1 inline h-3 w-3" />
                        <strong>Impacto Ambiental:</strong>{' '}
                        {ing.environmentalImpact}
                      </p>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="sustainability">
              <AccordionTrigger className="font-headline text-lg">
                Atributos Ecológicos
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-sm">
                  {product.sustainabilityAttributes.map((attr) => (
                    <li key={attr} className="flex items-center capitalize">
                      <Shield className="mr-2 h-4 w-4 text-accent" /> {attr.replace(/-/g, ' ')}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
