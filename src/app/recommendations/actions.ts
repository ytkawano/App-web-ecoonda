'use server';

import { getProductRecommendations } from '@/ai/flows/ai-powered-product-recommendations';
import { products as allProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import { z } from 'zod';

const recommendationSchema = z.object({
  skinType: z.string(),
  sustainabilityPreferences: z.array(z.string()),
  purchaseHistory: z.array(z.string()),
});

export type RecommendationState = {
  recommendedProductIds?: string[];
  error?: string;
};

export async function fetchRecommendations(
  prevState: RecommendationState,
  formData: FormData
): Promise<RecommendationState> {
  const validatedFields = recommendationSchema.safeParse({
    skinType: formData.get('skinType'),
    sustainabilityPreferences: formData.getAll('sustainabilityPreferences'),
    purchaseHistory: formData.getAll('purchaseHistory'),
  });

  if (!validatedFields.success) {
    return { error: 'Dados de entrada inválidos.' };
  }

  try {
    const aiInput = {
      ...validatedFields.data,
      products: allProducts.map((p: Product) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        ingredients: p.ingredients.map(i => i.name),
        sustainabilityAttributes: p.sustainabilityAttributes,
        suitableSkinTypes: p.suitableSkinTypes,
      })),
    };

    const result = await getProductRecommendations(aiInput);
    
    if (result && result.recommendedProducts) {
      return { recommendedProductIds: result.recommendedProducts };
    } else {
      return { error: 'Não foi possível gerar recomendações no momento.' };
    }
  } catch (e) {
    console.error(e);
    return { error: 'Ocorreu um erro inesperado.' };
  }
}
