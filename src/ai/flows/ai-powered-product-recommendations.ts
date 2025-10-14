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

const RecommendedProductSchema = z.object({
  productId: z.string().describe('The ID of the recommended product.'),
  justification: z.string().describe('A brief explanation of why this product is recommended for the user.'),
});

const ProductRecommendationsOutputSchema = z.object({
  recommendations: z.array(RecommendedProductSchema).describe('List of recommended products with justifications.')
});
export type ProductRecommendationsOutput = z.infer<typeof ProductRecommendationsOutputSchema>;

export const productRecommendationsFlow = ai.defineFlow(
  {
    name: 'productRecommendationsFlow',
    inputSchema: ProductRecommendationsInputSchema,
    outputSchema: ProductRecommendationsOutputSchema,
  },
  async (input) => {
    const prompt = `You are an AI assistant specializing in providing personalized product recommendations for ECOONDA, a sustainable vegan cosmetic brand.

    Based on the user's purchase history, sustainability preferences, and skin type, recommend up to 3 products that align with their values and needs. For each recommendation, provide a short, friendly justification explaining *why* it's a good fit.

    User Profile:
    - Purchase History: ${JSON.stringify(input.purchaseHistory)}
    - Sustainability Preferences: ${JSON.stringify(input.sustainabilityPreferences)}
    - Skin Type: ${input.skinType}
    
    Available Products: ${JSON.stringify(input.products)}

    Your response MUST be a valid JSON object matching this format exactly: 
    { 
      "recommendations": [
        { 
          "productId": "prod_001", 
          "justification": "Because you like products with plastic-free packaging and have dry skin, this hydrating serum is a perfect match."
        },
        { 
          "productId": "prod_002", 
          "justification": "This shampoo is great for oily hair and is made with recycled materials, which aligns with your preferences."
        }
      ]
    }`;

    const llmResponse = await ai.generate(prompt);
    const textResponse = llmResponse.text;

    try {
      const parsed = JSON.parse(textResponse);
      // Validate the parsed structure against the Zod schema
      return ProductRecommendationsOutputSchema.parse(parsed);
    } catch (e) {
        console.error("Failed to parse or validate LLM response", e, textResponse);
        // Return an empty recommendation list in case of failure
        return { recommendations: [] };
    }
  }
);

export async function getProductRecommendations(input: ProductRecommendationsInput): Promise<ProductRecommendationsOutput> {
    return productRecommendationsFlow(input);
}
