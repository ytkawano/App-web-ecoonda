// use server'

/**
 * @fileOverview Provides AI-powered product recommendations based on user data.
 *
 * - getProductRecommendations -  A function that returns product recommendations.
 * - ProductRecommendationsInput - The input type for the getProductRecommendations function.
 * - ProductRecommendationsOutput - The return type for the getProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductRecommendationsInputSchema = z.object({
  purchaseHistory: z.array(z.string()).describe('List of product IDs the user has purchased.'),
  sustainabilityPreferences: z.array(z.string()).describe('List of sustainability preferences of the user (e.g., vegan, cruelty-free, plastic-free).'),
  skinType: z.string().describe('The user\u2019s skin type (e.g., oily, dry, sensitive).'),
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

const ProductRecommendationsOutputSchema = z.object({
  recommendedProducts: z.array(z.string()).describe('List of recommended product IDs based on the user input.')
});
export type ProductRecommendationsOutput = z.infer<typeof ProductRecommendationsOutputSchema>;

export async function getProductRecommendations(input: ProductRecommendationsInput): Promise<ProductRecommendationsOutput> {
  return productRecommendationsFlow(input);
}

const productRecommendationPrompt = ai.definePrompt({
  name: 'productRecommendationPrompt',
  input: {
    schema: ProductRecommendationsInputSchema,
  },
  output: {
    schema: ProductRecommendationsOutputSchema
  },
  prompt: `You are an AI assistant specializing in providing personalized product recommendations for ECOONDA, a sustainable vegan cosmetic brand.

  Based on the user's purchase history, sustainability preferences, and skin type, recommend products that align with their values and needs.

  Purchase History: {{purchaseHistory}}
  Sustainability Preferences: {{sustainabilityPreferences}}
  Skin Type: {{skinType}}
  Available Products: {{products}}

  Consider the ingredients, sustainability attributes, and suitable skin types of each product when making your recommendations.  Only return the product IDs of the recommended products.

  Example Output: { \"recommendedProducts\": [\"product123\", \"product456\"] }`
});

const productRecommendationsFlow = ai.defineFlow(
  {
    name: 'productRecommendationsFlow',
    inputSchema: ProductRecommendationsInputSchema,
    outputSchema: ProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await productRecommendationPrompt(input);
    return output!;
  }
);
