'use client';

import { useFormState, useFormStatus } from 'react-dom';
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
import { Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RecommendationEngineProps {
  allProducts: Product[];
  initialPreferences: {
    skinType: string;
    sustainabilityPreferences: string[];
    purchaseHistory: string[];
  };
}

const skinTypes = ['oily', 'dry', 'combination', 'normal', 'sensitive', 'acne-prone'];
const sustainabilityOptions = [
  'vegan',
  'cruelty-free',
  'plastic-free-packaging',
  'recycled-materials',
  'fair-trade',
  'water-conscious',
  'reef-safe'
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full wave-animate">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Finding Your Products...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Get Recommendations
        </>
      )}
    </Button>
  );
}

export default function RecommendationEngine({
  allProducts,
  initialPreferences,
}: RecommendationEngineProps) {
  const [state, formAction] = useFormState(fetchRecommendations, {});
  const [skinType, setSkinType] = useState(initialPreferences.skinType);
  const [sustainabilityPrefs, setSustainabilityPrefs] = useState(
    new Set(initialPreferences.sustainabilityPreferences)
  );
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
    }
  }, [state.error, toast]);

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
    state.recommendedProductIds?.map((id) =>
      allProducts.find((p) => p.id === id)
    ).filter((p): p is Product => p !== undefined) || [];

  return (
    <div>
      <Card>
        <form action={formAction}>
          <CardHeader>
            <CardTitle className="font-headline">Your Profile</CardTitle>
            <CardDescription>
              Adjust your preferences to get the most accurate recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <Label htmlFor="skinType">Your Skin Type</Label>
              <Select name="skinType" value={skinType} onValueChange={setSkinType}>
                <SelectTrigger id="skinType">
                  <SelectValue placeholder="Select your skin type" />
                </SelectTrigger>
                <SelectContent>
                  {skinTypes.map((type) => (
                    <SelectItem key={type} value={type} className="capitalize">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4">
              <Label>Sustainability Values</Label>
              <div className="grid grid-cols-2 gap-4">
                {sustainabilityOptions.map((pref) => (
                  <div key={pref} className="flex items-center space-x-2">
                    <Checkbox
                      id={pref}
                      name="sustainabilityPreferences"
                      value={pref}
                      checked={sustainabilityPrefs.has(pref)}
                      onCheckedChange={(checked) => handleCheckboxChange(pref, !!checked)}
                    />
                    <Label
                      htmlFor={pref}
                      className="text-sm font-medium capitalize leading-none"
                    >
                      {pref.replace(/-/g, ' ')}
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

      {state.recommendedProductIds && (
        <div className="mt-12">
            <div className="text-center mb-8">
                <h2 className="font-headline text-3xl font-bold text-primary">
                    Your Personalized Results
                </h2>
                <p className="text-muted-foreground">Based on your profile, we think you'll love these.</p>
            </div>
            {recommendedProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {recommendedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <p className='text-center text-muted-foreground'>No recommendations found for your specific preferences. Try adjusting your profile!</p>
            )}
        </div>
      )}
    </div>
  );
}
