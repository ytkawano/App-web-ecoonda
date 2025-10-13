import { Leaf, Water, Heart } from 'lucide-react';
import Image from 'next/image';
import { placeholderImages } from '@/lib/data';

export default function AboutPage() {
  const aboutImage = placeholderImages.find(p => p.id === 'hero-ocean');
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-center font-headline text-5xl font-bold text-primary">
            Nossa História: Uma Onda de Mudança
          </h1>
          <p className="mb-12 text-center text-lg text-muted-foreground">
            ECOONDA nasceu do amor pelo oceano e da crença de que a beleza pode
            e deve ser sustentável. Somos uma startup brasileira dedicada a
            distribuir cosméticos veganos que cuidam de você e do nosso
            planeta.
          </p>

          {aboutImage &&
            <div className="relative mb-12 h-80 w-full overflow-hidden rounded-lg shadow-lg">
                <Image
                    src={aboutImage.imageUrl}
                    alt="Oceano e corais"
                    data-ai-hint="ocean coral"
                    fill
                    className="object-cover"
                />
            </div>
          }


          <div className="space-y-12">
            <div className="flex flex-col items-center text-center">
              <Water className="mb-4 h-12 w-12 text-accent" />
              <h2 className="font-headline text-3xl font-semibold text-primary">
                ODS 14 – Vida na Água
              </h2>
              <p className="mt-2 text-muted-foreground">
                Estamos comprometidos com o Objetivo de Desenvolvimento
                Sustentável 14 da ONU. Nossa missão é proteger a vida marinha
                combatendo a poluição plástica e promovendo práticas que
                preservam nossos oceanos para as futuras gerações.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <Leaf className="mb-4 h-12 w-12 text-accent" />
              <h2 className="font-headline text-3xl font-semibold text-primary">
                Por Que Cosméticos Veganos?
              </h2>
              <p className="mt-2 text-muted-foreground">
                Nossos produtos são 100% veganos e livres de crueldade.
                Escolhemos ingredientes biodegradáveis e seguros para os
                ecossistemas marinhos, garantindo que sua rotina de beleza não
                deixe um impacto negativo no planeta.
              </p>
            </div>

             <div className="flex flex-col items-center text-center">
              <Heart className="mb-4 h-12 w-12 text-accent" />
              <h2 className="font-headline text-3xl font-semibold text-primary">
                Nosso Compromisso
              </h2>
              <p className="mt-2 text-muted-foreground">
                Cada produto ECOONDA é um passo em direção a um futuro mais limpo. Das nossas embalagens recicladas e recicláveis ao nosso sistema EcoReturn, inovamos constantemente para minimizar nossa pegada ecológica e maximizar nosso impacto positivo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
