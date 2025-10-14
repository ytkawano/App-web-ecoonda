'use server';

/**
 * @fileOverview Provides AI-powered product recommendations based on user data.
 *
 * - getProductRecommendations -  A function that returns product recommendations with justifications.
 * - ProductRecommendationsInput - The input type for the getProductRecommendations function.
 * - ProductRecommendationsOutput - The return type for the getProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductRecommendationsInputSchema = z.object({
  purchaseHistory: z.array(z.string()).describe('List of product IDs the user has purchased.'),
  sustainabilityPreferences: z.array(z-string()).describe('List of sustainability preferences of the user (e.g., vegan, cruelty-free, plastic-free).'),
  skinType: z.string().describe('The user’s skin type (e.g., oily, dry, sensitive).'),
  products: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    ingredients: z.array(z.string()),
    sustainabilityAttributes: z.array(z.string()),
    suitableSkinTypes: z.array(z.string())
  })).describe('List of all available products with their attributes.')
});
export type ProductRecommendationsInput = z.infer<typeof ProductRecommendationsInputSchema>;

const RecommendedProductSchema = z.object({
  productId: z.string().describe('The ID of the recommended product.'),
  justification: z.string().describe('A brief, friendly, one-line explanation in Portuguese of why this product is recommended for the user. Example: "Por ser ótimo para pele oleosa e ter embalagem sem plástico."'),
});

const ProductRecommendationsOutputSchema = z.object({
  recommendations: z.array(RecommendedProductSchema).describe('List of 3-5 recommended products with justifications.')
});
export type ProductRecommendationsOutput = z.infer<typeof ProductRecommendationsOutputSchema>;

const productRecommendationsPrompt = ai.definePrompt({
  name: 'productRecommendationsPrompt',
  input: { schema: ProductRecommendationsInputSchema },
  output: { schema: ProductRecommendationsOutputSchema },
  prompt: `You are an AI assistant for ECOONDA, a sustainable cosmetic brand. Your goal is to provide personalized product recommendations.

    Analyze the user's profile:
    - Skin Type: {{{skinType}}}
    - Sustainability Preferences: {{{json sustainabilityPreferences}}}
    - Past Purchases (to avoid recommending again): {{{json purchaseHistory}}}

    From the list of available products, select 3 to 5 that are the best match.
    Available Products: {{{json products}}}

    For each recommendation, create a short, friendly, single-sentence justification in Portuguese. The justification should connect the product to the user's skin type and/or sustainability preferences.

    Example Justification: "É perfeito para sua pele mista e seu compromisso com embalagens sem plástico."

    Return your answer in the valid JSON format defined by the output schema.`,
});


export const productRecommendationsFlow = ai.defineFlow(
  {
    name: 'productRecommendationsFlow',
    inputSchema: ProductRecommendationsInputSchema,
    outputSchema: ProductRecommendationsOutputSchema,
  },
  async (input) => {
    const {output} = await productRecommendationsPrompt(input);
    if (!output) {
      return { recommendations: [] };
    }
    return output;
  }
);


export async function getProductRecommendations(input: ProductRecommendationsInput): Promise<ProductRecommendationsOutput> {
    return productRecommendationsFlow(input);
}
