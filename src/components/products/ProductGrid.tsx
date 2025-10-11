'use client';

import { useState } from 'react';
import type { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';

interface ProductGridProps {
  products: Product[];
  categories: string[];
}

export default function ProductGrid({ products, categories }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div>
      <ProductFilters
        categories={['All', ...categories]}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
