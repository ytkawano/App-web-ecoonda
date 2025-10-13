import type { Product } from './types';
import { products } from './products';

export const userPreferences = {
    skinType: 'mista',
    sustainabilityPreferences: ['embalagem-sem-plástico', 'vegano'],
    purchaseHistory: ['prod_001', 'prod_002'],
};

export function getAIRecommendations(): Product[] {
  const { skinType, sustainabilityPreferences, purchaseHistory } = userPreferences;

  const recommendedProducts = products
    .filter(product => !purchaseHistory.includes(product.id))
    .map(product => {
      let matchScore = 0;
      if (product.suitableSkinTypes.includes(skinType)) {
        matchScore += 2;
      }
      product.sustainabilityAttributes.forEach(attr => {
        if (sustainabilityPreferences.includes(attr)) {
          matchScore += 1;
        }
      });
      return { ...product, matchScore };
    })
    .filter(product => product.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);

  return recommendedProducts;
}
