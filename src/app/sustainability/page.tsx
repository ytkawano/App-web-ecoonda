'use client';

import { Leaf, Package, HeartHandshake } from 'lucide-react';

export default function SustainabilityPage() {
    const pillars = [
        {
          icon: Leaf,
          title: 'Ingredientes Naturais e Orgânicos',
          description:
            'Acreditamos que a beleza verdadeira vem da terra. Por isso, selecionamos apenas ingredientes puros, orgânicos e de origem sustentável. Nossos produtos são livres de químicos agressivos, celebrando a simplicidade e a potência da natureza.',
          imageUrl: '/imagem1sustentabilidade.jpg',
        },
        {
          icon: Package,
          title: 'Embalagens Conscientes',
          description:
            'A guerra contra o plástico é uma das nossas maiores missões. Priorizamos embalagens feitas de materiais reciclados, recicláveis ou compostáveis. Estamos constantemente inovando para encontrar soluções que eliminem o plástico de uso único.',
          imageUrl: '/imagem2sustentabilidade.jpg',
        },
        {
          icon: HeartHandshake,
          title: 'Comércio Justo e Comunidade',
          description:
            'Nossa responsabilidade vai além do meio ambiente. Comprometemo-nos com práticas de comércio justo, garantindo que nossos fornecedores e parceiros recebam tratamento e remuneração éticos. Apoiamos as comunidades locais de onde obtemos nossos ingredientes.',
          imageUrl: '/imagem3sustentabilidade.jpg',
        },
      ];

  return (
    <div className="bg-background text-foreground">

      {/* Hero Section */}
      <section className="relative h-[60vh] text-white">
        <div className="absolute inset-0">
            <img src="/bannersustentabilidade.jpg" alt="Oceano limpo" className="h-full w-full object-cover"/>
            <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="container relative mx-auto flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="font-headline text-5xl md:text-7xl font-bold">
            Um Compromisso com o Planeta
          </h1>
          <p className="mt-4 max-w-3xl text-lg md:text-xl">
            Na EcoOnda, nossa paixão pela beleza anda de mãos dadas com o amor pelo nosso planeta. Descubra como estamos causando um impacto positivo.
          </p>
        </div>
      </section>

      {/* Pillars Section */}
      <section>
      <div className="container mx-auto px-4 py-20">
              <div className="mx-auto max-w-4xl mb-16">
                <div className="text-center">
                   <h2 className="font-headline text-4xl font-bold text-primary">
                      Nossos Pilares de Sustentabilidade
                   </h2>
                   <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                      Sustentabilidade para nós não é apenas uma palavra da moda; é o nosso guia. Cada decisão que tomamos é medida em relação ao seu impacto no planeta e nas pessoas.
                  </p>
                </div>
              </div>

              <div className="grid gap-12 md:grid-cols-1">
                {pillars.map((pillar, index) => (
                    <div key={index} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                        <img src={pillar.imageUrl} alt={pillar.title} className="w-full md:w-1/2 h-80 rounded-lg object-cover shadow-lg" />
                        <div className="md:w-1/2">
                            <pillar.icon className="h-12 w-12 text-accent mb-4" />
                            <h3 className="font-headline text-3xl font-bold text-primary mb-3">
                                {pillar.title}
                            </h3>
                            <p className="text-muted-foreground text-lg">
                                {pillar.description}
                            </p>
                        </div>
                    </div>
                ))}
           </div>
        </div>
      </section>
    </div>
  );
}
