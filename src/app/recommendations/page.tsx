import RecommendationEngine from "@/components/recommendations/RecommendationEngine";
import { products, userPreferences } from "@/lib/data";

export default function RecommendationsPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="text-center">
        <h1 className="mb-4 font-headline text-5xl font-bold tracking-tight text-primary md:text-6xl">
          Selecionado para Você
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
          Deixe nossa IA guiá-lo para os produtos ECOONDA perfeitos com base em seu perfil e preferências únicos.
        </p>
      </div>

      <div className="mt-12">
        <RecommendationEngine
          allProducts={products}
          initialPreferences={userPreferences}
        />
      </div>
    </div>
  );
}
