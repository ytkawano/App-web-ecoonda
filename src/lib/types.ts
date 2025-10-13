export type Ingredient = {
  name: string;
  description: string;
  environmentalImpact: string;
};

export type Product = {
  id: string;
  name: string;
  category: 'Cuidado Capilar' | 'Corpo e Pele' | 'Cuidado Facial';
  price: number;
  description: string;
  imageId: string;
  ingredients: Ingredient[];
  sustainabilityAttributes: string[];
  suitableSkinTypes: string[];
};

export type Challenge = {
  id: string;
  title: string;
  description: string;
  points: number;
  badge: string;
  progress: number;
};

export type UserImpact = {
  plasticSaved: number; // in grams
  co2Avoided: number; // in kg
  pointsEarned: number;
  returnsMade: number;
};

export type ImpactBadge = {
  name: string;
  description: string;
  icon: React.ElementType;
};
