'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Button } from '@/components/ui/button';
import { fetchRecommendations } from '@/app/recommendations/actions';
import { useEffect, useState } from 'react';
import type { Product } from '@/lib/types';
import ProductCard from '../products/ProductCard';
import { Loader2, Wand2, Info } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { AnimatePresence, motion } from 'framer-motion';

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

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full wave-animate">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Encontrando Seus Produtos...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Obter Recomendações
        </>
      )}
    </Button>
  );
}

export default function RecommendationEngine({
  allProducts,
  initialPreferences,
}: RecommendationEngineProps) {
  const [state, formAction] = useActionState(fetchRecommendations, { key: Date.now() });
  const [skinType, setSkinType] = useState(initialPreferences.skinType);
  const [sustainabilityPrefs, setSustainabilityPrefs] = useState(
    new Set(initialPreferences.sustainabilityPreferences)
  );
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: state.error,
      });
    }
  }, [state.error, state.key, toast]);

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

 const recommendedProducts =
    state.recommendations?.map(rec => {
        const product = allProducts.find(p => p.id === rec.productId);
        if (!product) return null;
        return {
            ...product,
            justification: rec.justification,
        };
    }).filter((p): p is Product & { justification: string } => p !== null) || [];


  return (
    <div>
      <Card>
        <form action={formAction}>
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
            {initialPreferences.purchaseHistory.map(id => (
                <input key={id} type="hidden" name="purchaseHistory" value={id} />
            ))}
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      <AnimatePresence>
        {state.recommendations && (
          <motion.div
            key={state.key}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="mt-12 overflow-hidden"
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
                              <div className="mt-4 rounded-md border border-accent/20 bg-accent/5 p-4 text-sm">
                                  <p className="flex items-start gap-2 text-accent-foreground/80">
                                      <Info className="h-4 w-4 shrink-0 mt-0.5 text-accent"/>
                                      <span className='font-semibold'>Por que para você?</span> {product.justification}
                                  </p>
                              </div>
                          </div>
                      ))}
                  </div>
              ) : (
                  <p className='text-center text-muted-foreground'>Nenhuma recomendação encontrada para suas preferências específicas. Tente ajustar seu perfil!</p>
              )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
