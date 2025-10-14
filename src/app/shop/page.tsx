import ProductGrid from '@/components/products/ProductGrid';
import { products } from '@/lib/products';
import { productCategories } from '@/lib/data';

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-5xl font-bold tracking-tight text-primary md:text-6xl">
          Nossos Produtos
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Explore nossa coleção completa de cosméticos sustentáveis, criados
          com ingredientes puros do oceano para nutrir sua pele e proteger o
          planeta.
        </p>
      </div>

      <ProductGrid products={products} categories={productCategories} />
    </div>
  );
}
