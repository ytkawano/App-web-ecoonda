
'use server';

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
