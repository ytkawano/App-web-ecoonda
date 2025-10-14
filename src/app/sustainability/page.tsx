import { Leaf, Waves, Recycle, Package, TestTube2, HeartHandshake } from 'lucide-react';
import Image from 'next/image';
import { placeholderImages } from '@/lib/data';

export default function SustainabilityPage() {
  const heroImage = placeholderImages.find(p => p.id === 'sustainability-coral');

  const pillars = [
    {
      icon: Recycle,
      title: 'Economia Circular e EcoReturn',
      description:
        'Acreditamos em um ciclo de vida completo para nossos produtos. Com nosso sistema EcoReturn, você pode devolver as embalagens vazias, que nós reciclamos ou reutilizamos. Isso reduz o desperdício, conserva recursos e diminui nossa pegada de carbono.',
    },
    {
      icon: TestTube2,
      title: 'Ingredientes Conscientes',
      description:
        'Nossas fórmulas são 100% veganas e livres de crueldade. Selecionamos cuidadosamente ingredientes biodegradáveis e seguros para os ecossistemas marinhos (reef-safe), garantindo que sua beleza não custe a saúde do planeta.',
    },
    {
      icon: Package,
      title: 'Embalagens Ecológicas',
      description:
        'A guerra contra o plástico é uma das nossas maiores missões. Priorizamos embalagens feitas de materiais reciclados, recicláveis ou compostáveis. Estamos constantemente inovando para encontrar soluções que eliminem o plástico de uso único.',
    },
    {
      icon: HeartHandshake,
      title: 'Comércio Justo e Comunidade',
      description:
        'Nossa responsabilidade vai além do meio ambiente. Comprometemo-nos com práticas de comércio justo, garantindo que nossos fornecedores e parceiros recebam tratamento e remuneração éticos. Apoiamos as comunidades locais de onde obtemos nossos ingredientes.',
    },
  ];

  return (
    <div className="bg-background">
      {heroImage &&
        <section className="relative h-[60vh] w-full text-white">
            <Image
                src={heroImage.imageUrl}
                alt="Recife de coral vibrante"
                data-ai-hint="coral reef vibrant"
                fill
                className="object-cover"
                priority
            />
            <div className="relative z-10 flex h-full flex-col items-center justify-center bg-black/40 p-4 text-center">
                <h1 className="mb-4 font-headline text-5xl font-black tracking-tight drop-shadow-md md:text-7xl">
                    Beleza que Regenera
                </h1>
                <p className="mx-auto max-w-3xl text-lg drop-shadow-sm md:text-xl">
                    Nosso compromisso com a sustentabilidade é a essência de tudo o que fazemos.
                </p>
            </div>
        </section>
      }

      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
             <h2 className="font-headline text-3xl font-bold text-primary">
                Nossos Pilares de Sustentabilidade
             </h2>
             <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                Sustentabilidade para nós não é apenas uma palavra da moda; é o nosso guia. Cada decisão que tomamos é medida em relação ao seu impacto no planeta e nas pessoas.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
            {pillars.map((pillar, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <pillar.icon className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="font-headline text-xl font-semibold text-primary">{pillar.title}</h3>
                  <p className="mt-2 text-muted-foreground">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
          
           <div className="mt-20 flex flex-col items-center rounded-lg border-2 border-dashed border-accent bg-accent/10 p-12 text-center">
              <Waves className="mb-4 h-12 w-12 text-accent" />
              <h2 className="font-headline text-3xl font-semibold text-primary">
                ODS 14 – Vida na Água
              </h2>
              <p className="mt-2 text-muted-foreground">
                Estamos totalmente comprometidos com o Objetivo de Desenvolvimento Sustentável 14 da ONU. Nossa missão é conservar e usar de forma sustentável os oceanos, os mares e os recursos marinhos. Cada produto ECOONDA é um passo para proteger a vida aquática.
              </p>
            </div>

        </div>
      </div>
    </div>
  );
}
