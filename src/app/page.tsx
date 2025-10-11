import { products, productCategories } from '@/lib/data';
import ProductGrid from '@/components/products/ProductGrid';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-16 text-center">
        <h1 className="mb-4 font-headline text-5xl font-bold tracking-tight text-primary md:text-7xl">
          Beauty, Consciously Crafted
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
          Explore our collection of sustainable, vegan cosmetics inspired by the
          purity of the ocean.
        </p>
      </section>

      <ProductGrid products={products} categories={productCategories} />
    </div>
  );
}
