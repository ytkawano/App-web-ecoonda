import { products, productCategories } from '@/lib/data';
import ProductGrid from '@/components/products/ProductGrid';
import Image from 'next/image';
import { placeholderImages } from '@/lib/data';

export default function Home() {
  const heroImage = placeholderImages.find((p) => p.id === 'hero-ocean');
  return (
    <div>
      <section className="relative h-[60vh] w-full text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt="Oceano"
            data-ai-hint="ocean waves"
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="relative z-10 flex h-full flex-col items-center justify-center bg-black/40 p-4">
          <h1 className="mb-4 font-headline text-5xl font-bold tracking-tight md:text-7xl">
            Beleza, Criada com Consciência
          </h1>
          <p className="mx-auto max-w-2xl text-lg md:text-xl">
            Explore nossa coleção de cosméticos sustentáveis e veganos
            inspirados na pureza do oceano.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <ProductGrid products={products} categories={productCategories} />
      </div>
    </div>
  );
}
