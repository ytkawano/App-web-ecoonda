import type { Product, ProductSearchQueryOutput } from '@/lib/types';

// This function filters products based on an AI-generated query and purchase history.
export function filterProductsByQuery(
  products: Product[],
  query: ProductSearchQueryOutput,
  purchaseHistory: string[]
): Product[] {
  return products
    .filter((p) => !purchaseHistory.includes(p.id))
    .map((product) => {
      let score = 0;
      if (query.category && product.category === query.category) {
        score += 3;
      }
      if (query.suitableSkinTypes) {
        if (
          query.suitableSkinTypes.some((st) =>
            product.suitableSkinTypes.includes(st)
          )
        ) {
          score += 2;
        }
      }
      if (query.sustainabilityAttributes) {
        score += product.sustainabilityAttributes.filter((attr) =>
          query.sustainabilityAttributes?.includes(attr)
        ).length;
      }
      return { product, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.product);
}
