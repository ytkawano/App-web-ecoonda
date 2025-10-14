'use server';

import { products as allProducts } from '@/lib/products';
import { Product } from '@/lib/types';
import { z } from 'zod';

const recommendationSchema = z.object({
  skinType: z.string(),
  sustainabilityPreferences: z.array(z.string()),
  purchaseHistory: z.array(z.string()),
});

export type RecommendationState = {
  recommendations?: {
    productId: string;
  }[];
  error?: string;
  key?: number;
};

// This function filters products based on a simple scoring mechanism.
function getScoredRecommendations(
  products: Product[],
  skinType: string,
  sustainabilityPreferences: string[],
  purchaseHistory: string[]
): Product[] {
  return products
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
    })
    .filter(item => item.score > 0)
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
    const { skinType, sustainabilityPreferences, purchaseHistory } = validatedFields.data;

    // Get recommendations using the new scoring logic
    const recommendedProducts = getScoredRecommendations(
        allProducts, 
        skinType,
        sustainabilityPreferences,
        purchaseHistory
    );
    
    if (recommendedProducts.length > 0) {
      return { 
        recommendations: recommendedProducts.map(p => ({ productId: p.id })), 
        key: Date.now() 
      };
    } else {
      return { error: 'Não foi possível encontrar produtos para suas preferências.', key: Date.now() };
    }
  } catch (e) {
    console.error(e);
    return { error: 'Ocorreu um erro inesperado ao gerar suas recomendações.', key: Date.now() };
  }
}
