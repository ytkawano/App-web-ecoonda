'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, Waves, Recycle, Heart, WandSparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Product } from '@/lib/types';
import ProductCard from '@/components/products/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const firestore = useFirestore();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true);
      if (!firestore) return;

      try {
        const productsQuery = query(collection(firestore, 'products'), limit(3));
        const querySnapshot = await getDocs(productsQuery);
        const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
        setFeaturedProducts(products);
      } catch (error) {
        console.error("Error fetching featured products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [firestore]);

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full text-center text-white">
        <Image
            src={"/hero%20homepage.jpg"}
            alt="Página inicial da Ecconda"
            data-ai-hint="hero homepage"
            fill
            className="object-cover"
            priority
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-center bg-black/40 p-4">
          <h1 className="mb-4 font-headline text-5xl font-black tracking-tight drop-shadow-md md:text-7xl">
            Descubra o poder da natureza com tecnologia inteligente.
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg drop-shadow-sm md:text-xl">
            Cosméticos sustentáveis e personalizados para sua pele e para o planeta.
          </p>
          <Button asChild size="lg" className="wave-animate">
            <Link href="/shop">
              Explorar Produtos <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Nossa Essência Section */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl font-bold text-primary">
            Nossa Essência
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            EcoOnda une ciência e sustentabilidade para criar produtos que respeitam sua pele e o oceano.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="flex flex-col items-center">
              <Leaf className="h-10 w-10 text-accent" />
              <p className="mt-2 font-semibold">Vegano</p>
            </div>
            <div className="flex flex-col items-center">
              <Waves className="h-10 w-10 text-accent" />
              <p className="mt-2 font-semibold">Consciente com a Água</p>
            </div>
            <div className="flex flex-col items-center">
              <Recycle className="h-10 w-10 text-accent" />
              <p className="mt-2 font-semibold">Materiais Reciclados</p>
            </div>
            <div className="flex flex-col items-center">
              <Heart className="h-10 w-10 text-accent" />
              <p className="mt-2 font-semibold">Livre de Crueldade</p>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section className="py-20">
        <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 md:grid-cols-2">
          <div className="text-center md:text-left">
            <h2 className="font-headline text-3xl font-bold text-primary">Como Nossa IA Funciona</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Nossa tecnologia inteligente analisa seu perfil para criar uma rotina de cuidados única, como uma onda que se molda à costa.
            </p>
            <div className="mt-8 space-y-6">
                <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">1</div>
                    <p>Informe seu tipo de pele e necessidades.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">2</div>
                    <p>Escolha seus valores de sustentabilidade.</p>
                </div>
                 <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">3</div>
                    <p>Receba recomendações únicas e personalizadas.</p>
                </div>
            </div>
            <Button asChild size="lg" className="mt-10 wave-animate">
                <Link href="/recommendations">
                Encontrar meus produtos <WandSparkles className="ml-2 h-5 w-5" />
                </Link>
            </Button>
          </div>
          <div className="relative flex h-80 items-center justify-center">
             <div className="absolute h-64 w-64 rounded-full bg-accent/20 blur-3xl"></div>
             <WandSparkles className="relative h-32 w-32 text-accent opacity-80" />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured-products" className="bg-card py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-headline text-3xl font-bold text-primary">
            Favoritos da Comunidade
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex flex-col space-y-3">
                        <Skeleton className="h-[250px] w-full rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    </div>
                ))
            ) : (
                featuredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))
            )}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-3xl font-bold text-primary">Seu Impacto Conta</h2>
             <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
              Cada produto que você escolhe é um voto para um planeta mais saudável. Juntos, estamos fazendo a diferença.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="rounded-lg border bg-card p-8">
                    <h3 className="font-headline text-5xl font-bold text-accent">+5.000</h3>
                    <p className="mt-2 text-muted-foreground">embalagens plásticas a menos no oceano</p>
                </div>
                <div className="rounded-lg border bg-card p-8">
                    <h3 className="font-headline text-5xl font-bold text-accent">100%</h3>
                    <p className="mt-2 text-muted-foreground">dos nossos produtos são seguros para corais e mares do Brasil</p>
                </div>
            </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-4xl font-bold">Sua escolha muda o mar.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90">
            Junte-se ao movimento por uma beleza consciente.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8 wave-animate">
            <Link href="/signup">Comece com a EcoOnda</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
