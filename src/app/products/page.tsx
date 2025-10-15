'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/products';
import { productCategories } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { placeholderImages } from '@/lib/data';

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = products.filter(product => 
    activeCategory === 'all' || product.category === activeCategory
  );

  return (
    <div className="bg-background min-h-screen text-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        {/* Cabeçalho */}
        <header className="mb-12 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
            Explore Nossos Produtos
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Beleza sustentável, inspirada no oceano.
          </p>
        </header>

        {/* Filtros de Categoria */}
        <Tabs defaultValue="all" onValueChange={setActiveCategory} className="w-full mb-10">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full md:w-fit mx-auto">
            <TabsTrigger value="all">Todos</TabsTrigger>
            {productCategories.map(category => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Grade de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => {
            // Encontrar a imagem correspondente no arquivo JSON
            const placeholder = placeholderImages.find(p => p.imageId === product.imageId);

            return (
              <Link href={`/products/${product.id}`} key={product.id}>
                <Card className="overflow-hidden h-full group transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardHeader className="p-0">
                    <div className="aspect-[4/5] relative">
                      <Image 
                        src={placeholder?.base64 || ''} 
                        alt={product.name} 
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <p className="font-bold text-primary mt-2 text-lg">R$ {product.price.toFixed(2).replace('.', ',')}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
            <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">Nenhum produto encontrado nesta categoria.</p>
            </div>
        )}

      </div>
    </div>
  );
}
