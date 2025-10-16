
'use client';

import { useEffect, useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import type { Product } from '@/lib/types';
import ProductCard from '../products/ProductCard';
import { AnimatePresence, motion } from 'framer-motion';

// This function filters products based on a simple scoring mechanism.
function getScoredRecommendations(
  products: Product[],
  skinType: string,
  sustainabilityPreferences: Set<string>,
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
      const matchingPrefs = product.sustainabilityAttributes.filter(attr =>
        sustainabilityPreferences.has(attr)
      );
      score += matchingPrefs.length;
      
      return { product, score };
    });
  
  // Sort by score and return the top 3, even if the score is 0
  return scoredProducts
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.product);
}

interface RecommendationEngineProps {
  allProducts: Product[];
  initialPreferences: {
    skinType: string;
    sustainabilityPreferences: string[];
    purchaseHistory: string[];
  };
}

const skinTypes = [
  { value: 'oily', label: 'Oleosa' },
  { value: 'dry', label: 'Seca' },
  { value: 'combination', label: 'Mista' },
  { value: 'normal', label: 'Normal' },
  { value: 'sensitive', label: 'Sensível' },
  { value: 'acne-prone', label: 'Com acne' }
];

const sustainabilityOptions = [
  { value: 'vegan', label: 'Vegano' },
  { value: 'cruelty-free', label: 'Livre de crueldade' },
  { value: 'plastic-free-packaging', label: 'Embalagem sem plástico' },
  { value: 'recycled-materials', label: 'Materiais reciclados' },
  { value: 'fair-trade', label: 'Comércio justo' },
  { value: 'water-conscious', label: 'Consciente com a água' },
  { value: 'reef-safe', label: 'Seguro para corais' }
];


export default function RecommendationEngine({
  allProducts,
  initialPreferences,
}: RecommendationEngineProps) {
  const [skinType, setSkinType] = useState(initialPreferences.skinType);
  const [sustainabilityPrefs, setSustainabilityPrefs] = useState(
    new Set(initialPreferences.sustainabilityPreferences)
  );

  const handleCheckboxChange = (pref: string, checked: boolean) => {
    setSustainabilityPrefs((prev) => {
      const newPrefs = new Set(prev);
      if (checked) {
        newPrefs.add(pref);
      } else {
        newPrefs.delete(pref);
      }
      return newPrefs;
    });
  };

  const recommendedProducts = useMemo(() => {
    return getScoredRecommendations(
      allProducts,
      skinType,
      sustainabilityPrefs,
      initialPreferences.purchaseHistory
    );
  }, [allProducts, skinType, sustainabilityPrefs, initialPreferences.purchaseHistory]);


  return (
    <div>
      <Card>
          <CardHeader>
            <CardTitle className="font-headline">Seu Perfil</CardTitle>
            <CardDescription>
              Ajuste suas preferências para obter as recomendações mais precisas.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <Label htmlFor="skinType">Seu Tipo de Pele</Label>
              <Select name="skinType" value={skinType} onValueChange={setSkinType}>
                <SelectTrigger id="skinType">
                  <SelectValue placeholder="Selecione seu tipo de pele" />
                </SelectTrigger>
                <SelectContent>
                  {skinTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value} className="capitalize">
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4">
              <Label>Valores de Sustentabilidade</Label>
              <div className="grid grid-cols-2 gap-4">
                {sustainabilityOptions.map((pref) => (
                  <div key={pref.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={pref.value}
                      name="sustainabilityPreferences"
                      value={pref.value}
                      checked={sustainabilityPrefs.has(pref.value)}
                      onCheckedChange={(checked) => handleCheckboxChange(pref.value, !!checked)}
                    />
                    <Label
                      htmlFor={pref.value}
                      className="text-sm font-medium capitalize leading-none"
                    >
                      {pref.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
      </Card>

      <AnimatePresence>
        <motion.div
            key={skinType + Array.from(sustainabilityPrefs).join('-')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="mt-12"
        >
              <div className="text-center mb-8">
                  <h2 className="font-headline text-3xl font-bold text-primary">
                      Seus Resultados Personalizados
                  </h2>
                  <p className="text-muted-foreground">Com base no seu perfil, achamos que você vai adorar estes.</p>
              </div>
              {recommendedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                      {recommendedProducts.map((product) => (
                          <div key={product.id}>
                              <ProductCard product={product} />
                          </div>
                      ))}
                  </div>
              ) : (
                  <p className='text-center text-muted-foreground'>Nenhuma recomendação encontrada para suas preferências específicas. Tente ajustar seu perfil!</p>
              )}
          </motion.div>
      </AnimatePresence>
    </div>
  );
}
