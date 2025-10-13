import { products, productCategories } from '@/lib/data';
import ProductGrid from '@/components/products/ProductGrid';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-16 text-center">
        <h1 className="mb-4 font-headline text-5xl font-bold tracking-tight text-primary md:text-7xl">
          Beleza, Criada com Consciência
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
          Explore nossa coleção de cosméticos sustentáveis e veganos inspirados na
          pureza do oceano.
        </p>
      </section>

      <ProductGrid products={products} categories={productCategories} />
    </div>
  );
}
