'use server';

import { getProductRecommendations } from '@/ai/flows/ai-powered-product-recommendations';
import { products as allProducts } from '@/lib/products';
import type { Product } from '@/lib/types';
import { z } from 'zod';

const recommendationSchema = z.object({
  skinType: z.string(),
  sustainabilityPreferences: z.array(z.string()),
  purchaseHistory: z.array(z.string()),
});

export type RecommendationState = {
  recommendations?: {
    productId: string;
    justification: string;
  }[];
  error?: string;
  key?: number;
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
    return { error: 'Dados de entrada inválidos.', key: Date.now() };
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
    
    if (result && result.recommendations) {
      return { recommendations: result.recommendations, key: Date.now() };
    } else {
      return { error: 'Não foi possível gerar recomendações no momento.', key: Date.now() };
    }
  } catch (e) {
    console.error(e);
    return { error: 'Ocorreu um erro inesperado ao se comunicar com a IA.', key: Date.now() };
  }
}
