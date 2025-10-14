'use server';

import { getProductSearchQuery, filterProductsByQuery } from '@/ai/flows/ai-powered-product-recommendations';
import { products as allProducts } from '@/lib/products';
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
    const aiInput = validatedFields.data;

    // 1. Get the search query from the AI
    const searchQuery = await getProductSearchQuery(aiInput);

    // 2. Filter products based on the AI's query
    const recommendedProducts = filterProductsByQuery(allProducts, searchQuery, aiInput.purchaseHistory);
    
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
    return { error: 'Ocorreu um erro inesperado ao se comunicar com a IA.', key: Date.now() };
  }
}
