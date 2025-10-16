'use server';

import { Product } from '@/lib/types';
import { z } from 'zod';

const recommendationSchema = z.object({
  skinType: z.string(),
  sustainabilityPreferences: z.array(z.string()),
  purchaseHistory: z.array(z.string()),
});

type UserPreferences = z.infer<typeof recommendationSchema>;

export type RecommendationState = {
  preferences?: UserPreferences;
  error?: string;
  key?: number;
};

// This function filters products based on a simple scoring mechanism.
export function getScoredRecommendations(
  products: Product[],
  skinType: string,
  sustainabilityPreferences: string[],
  purchaseHistory: string[]
): Product[] {
  const scoredProducts = products
    .filter(p => !purchaseHistory.includes(p.id))
    .map(product => {
      let score = 0;
      // High score for matching skin type
      if (product.suitableSkinTypes.includes(skinType) || product.suitableSkinTypes.includes('todos')) {
        score += 3;
      }
      // Add score for each matching sustainability attribute
      score += product.sustainabilityAttributes.filter(attr =>
        sustainabilityPreferences.includes(attr)
      ).length;
      
      return { product, score };
    });
  
  // Sort by score and return the top 3, even if the score is 0
  return scoredProducts
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.product);
}

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
    return { 
        preferences: validatedFields.data, 
        key: Date.now() 
    };

  } catch (e) {
    console.error(e);
    return { error: 'Ocorreu um erro inesperado ao gerar suas recomendações.', key: Date.now() };
  }
}
