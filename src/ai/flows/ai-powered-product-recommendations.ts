'use server';

/**
 * @fileOverview Provides AI-powered product recommendations by generating a search query.
 *
 * - getProductSearchQuery - A function that returns a search query based on user preferences.
 * - filterProductsByQuery - A function to filter products based on the AI-generated query.
 * - ProductSearchQueryInput - The input type for the getProductSearchQuery function.
 * - ProductSearchQueryOutput - The return type for the getProductSearchQuery function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { Product } from '@/lib/types';

// 1. DEFINE INPUT SCHEMA
const ProductSearchQueryInputSchema = z.object({
  purchaseHistory: z
    .array(z.string())
    .describe('List of product IDs the user has purchased.'),
  sustainabilityPreferences: z
    .array(z.string())
    .describe(
      'List of sustainability preferences of the user (e.g., vegan, cruelty-free, plastic-free).'
    ),
  skinType: z
    .string()
    .describe('The user’s skin type (e.g., oily, dry, sensitive).'),
});
export type ProductSearchQueryInput = z.infer<
  typeof ProductSearchQueryInputSchema
>;

// 2. DEFINE OUTPUT SCHEMA
const ProductSearchQueryOutputSchema = z.object({
  category: z
    .string()
    .optional()
    .describe(
      'A relevant product category to suggest. e.g., "Cuidado Facial"'
    ),
  sustainabilityAttributes: z
    .array(z.string())
    .optional()
    .describe(
      'A list of sustainability attributes that are most relevant to the user.'
    ),
  suitableSkinTypes: z
    .array(z.string())
    .optional()
    .describe('A list of skin types to look for in products.'),
});
export type ProductSearchQueryOutput = z.infer<
  typeof ProductSearchQueryOutputSchema
>;

// 3. DEFINE THE PROMPT
const productSearchQueryPrompt = ai.definePrompt({
  name: 'productSearchQueryPrompt',
  input: { schema: ProductSearchQueryInputSchema },
  output: { schema: ProductSearchQueryOutputSchema },
  prompt: `You are an AI assistant for ECOONDA, a sustainable cosmetic brand.
Your goal is to generate a search query to find products for a user based on their profile.

USER PROFILE:
- Skin Type: {{{skinType}}}
- Sustainability Preferences: {{{json sustainabilityPreferences}}}
- Purchase History (Do not recommend these): {{{json purchaseHistory}}}

INSTRUCTIONS:
1.  Analyze the user's profile.
2.  Determine the most relevant product category, sustainability attributes, and skin types to search for.
3.  Return a query in the valid JSON format defined by the output schema.
    For example, for a user with oily skin who likes vegan products, you could return:
    { "category": "Cuidado Facial", "sustainabilityAttributes": ["vegan"], "suitableSkinTypes": ["oleosa", "mista"] }
`,
});

// 4. DEFINE THE FLOW
export const productSearchQueryFlow = ai.defineFlow(
  {
    name: 'productSearchQueryFlow',
    inputSchema: ProductSearchQueryInputSchema,
    outputSchema: ProductSearchQueryOutputSchema,
  },
  async (input) => {
    const { output } = await productSearchQueryPrompt(input);
    if (!output) {
      return {};
    }
    return output;
  }
);

// 5. DEFINE EXPORTED FUNCTION
export async function getProductSearchQuery(
  input: ProductSearchQueryInput
): Promise<ProductSearchQueryOutput> {
  return productSearchQueryFlow(input);
}


// 6. FILTERING FUNCTION (to be used in server action)
export function filterProductsByQuery(products: Product[], query: ProductSearchQueryOutput, purchaseHistory: string[]): Product[] {
  return products
    .filter(p => !purchaseHistory.includes(p.id))
    .map(product => {
      let score = 0;
      if (query.category && product.category === query.category) {
        score += 3;
      }
      if (query.suitableSkinTypes) {
        if (query.suitableSkinTypes.some(st => product.suitableSkinTypes.includes(st))) {
            score += 2;
        }
      }
      if (query.sustainabilityAttributes) {
        score += product.sustainabilityAttributes.filter(attr => query.sustainabilityAttributes?.includes(attr)).length;
      }
      return { product, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.product);
}
