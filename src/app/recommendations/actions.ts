'use server';

import { collection, getDocs } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
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

// This function fetches all products from Firestore
async function getAllProducts(): Promise<Product[]> {
  const { firestore } = initializeFirebase();
  const productsCollection = collection(firestore, 'products');
  const productSnapshot = await getDocs(productsCollection);
  return productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
}

// This function filters products based on a simple scoring mechanism.
function getScoredRecommendations(
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
    const allProducts = await getAllProducts();
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
      // This case should be less frequent now, but it's a good fallback.
      return { error: 'Não foi possível encontrar produtos na nossa base de dados.', key: Date.now() };
    }
  } catch (e) {
    console.error(e);
    return { error: 'Ocorreu um erro inesperado ao gerar suas recomendações.', key: Date.now() };
  }
}
