import { productCategories } from '@/lib/data';
import { products as allProducts } from '@/lib/products';
import { getAIRecommendations } from '@/lib/recommendations';
import ProductGrid from '@/components/products/ProductGrid';
import Image from 'next/image';
import { placeholderImages } from '@/lib/data';

export default function Home() {
  const heroImage = placeholderImages.find((p) => p.id === 'hero-ocean');
  const recommendedProducts = getAIRecommendations();

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
        <section id="recommended-products" className="mb-16">
          <h2 className="mb-8 text-center font-headline text-4xl font-bold">
            Recomendado para Você
          </h2>
          <ProductGrid
            products={recommendedProducts}
            categories={productCategories}
          />
        </section>

        <section id="all-products">
          <h2 className="mb-8 text-center font-headline text-4xl font-bold">
            Todos os Produtos
          </h2>
          <ProductGrid products={allProducts} categories={productCategories} />
        </section>
      </div>
    </div>
  );
}
