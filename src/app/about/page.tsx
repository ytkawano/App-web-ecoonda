'use client';

import { Heart, Target, Wind } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-20">

        {/* Header Section */}
        <div className="text-center mb-20">
          <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary">
            Nascemos da Paixão pelo Oceano
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
            Acreditamos em uma beleza que nutre a si mesma e ao planeta. Uma beleza que é gentil, eficaz e, acima de tudo, consciente.
          </p>
        </div>

        {/* Main Content with Image */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <img 
              src="/sobre-nos.jpg" 
              alt="Mulher na praia ao pôr do sol" 
              className="w-full h-auto rounded-lg object-cover shadow-xl" 
            />
          </div>

          {/* Text Section */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Heart className="h-10 w-10 text-accent" />
                </div>
                <div>
                  <h2 className="font-headline text-2xl font-bold text-primary mb-2">Nossa Missão</h2>
                  <p className="text-muted-foreground text-lg">
                  Criar produtos de beleza de alta performance que sejam bons para você e para o oceano. Nossa missão é liderar uma onda de mudança na indústria da beleza, promovendo práticas sustentáveis, embalagens conscientes e um profundo respeito pela vida marinha.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Target className="h-10 w-10 text-accent" />
                </div>
                <div>
                  <h2 className="font-headline text-2xl font-bold text-primary mb-2">Nossa Visão</h2>
                  <p className="text-muted-foreground text-lg">
                  Sonhamos com um mundo onde a beleza e a sustentabilidade são inseparáveis. Uma indústria que devolve ao planeta mais do que retira, e consumidores que se sentem empoderados por suas escolhas conscientes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Wind className="h-10 w-10 text-accent" />
                </div>
                <div>
                  <h2 className="font-headline text-2xl font-bold text-primary mb-2">Nosso Compromisso com a ODS 14</h2>
                  <p className="text-muted-foreground text-lg">
                  Estamos profundamente comprometidos com o Objetivo de Desenvolvimento Sustentável 14 da ONU: Vida na Água. Isso se reflete em nossas fórmulas biodegradáveis, nosso combate ao plástico e nosso apoio a projetos de conservação dos oceanos.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
