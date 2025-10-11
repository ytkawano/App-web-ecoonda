import type { Product, Challenge, UserImpact, ImpactBadge } from './types';
import { Leaf, Recycle, Sprout, Droplets, Award, Star, Shield } from 'lucide-react';
import placeholderData from './placeholder-images.json';

export const productCategories: Product['category'][] = [
  'Facial Care',
  'Body & Skin',
  'Hair Care',
];

export const products: Product[] = [
  {
    id: 'prod_001',
    name: 'Ocean Dew Serum',
    category: 'Facial Care',
    price: 48.0,
    imageId: 'serum-1',
    description:
      'A hydrating facial serum packed with marine extracts to rejuvenate and plump your skin, leaving a dewy, fresh finish.',
    ingredients: [
      {
        name: 'Kelp Extract',
        description:
          'Rich in antioxidants, kelp helps to protect your skin from external aggressors and soothe inflammation.',
        environmentalImpact:
          'Sustainably harvested from protected ocean farms, promoting marine biodiversity and ensuring minimal disruption to ecosystems.',
      },
      {
        name: 'Hyaluronic Acid',
        description: 'A powerful humectant that draws moisture into the skin, providing long-lasting hydration.',
        environmentalImpact: 'Our hyaluronic acid is derived from vegan, bio-fermentation processes, avoiding animal-derived sources and reducing water usage.',
      },
    ],
    sustainabilityAttributes: ['vegan', 'cruelty-free', 'plastic-free-packaging'],
    suitableSkinTypes: ['dry', 'normal', 'combination'],
  },
  {
    id: 'prod_002',
    name: 'Seaweed Strength Shampoo',
    category: 'Hair Care',
    price: 28.0,
    imageId: 'shampoo-1',
    description:
      'Fortify your hair from root to tip with this nutrient-rich shampoo. Seaweed and marine minerals cleanse gently while boosting volume and shine.',
    ingredients: [
       {
        name: 'Spirulina',
        description:
          'A blue-green algae packed with protein and iron, which helps to strengthen hair and promote growth.',
        environmentalImpact:
          'Cultivated in controlled, freshwater pools that recycle water, our spirulina has a low carbon footprint.',
      },
       {
        name: 'Sea Salt',
        description: 'Adds texture and volume to hair while gently exfoliating the scalp.',
        environmentalImpact: 'Harvested from natural salt pans using traditional, energy-efficient methods that preserve the surrounding environment.',
      },
    ],
    sustainabilityAttributes: ['vegan', 'cruelty-free', 'recycled-materials'],
    suitableSkinTypes: ['oily', 'normal'],
  },
  {
    id: 'prod_003',
    name: 'Marine Mud-Mask',
    category: 'Facial Care',
    price: 35.0,
    imageId: 'face-mask-1',
    description:
      'A detoxifying mud mask infused with mineral-rich marine clay to draw out impurities and refine pores.',
    ingredients: [
      {
        name: 'Marine Clay',
        description: 'A mineral-rich clay that detoxifies the skin by absorbing excess oil and impurities.',
        environmentalImpact: 'Sourced from naturally occurring coastal deposits with responsible extraction methods to ensure the stability of the shoreline.',
      },
      {
        name: 'Bladderwrack Extract',
        description: 'A type of seaweed that helps to improve skin elasticity and reduce inflammation.',
        environmentalImpact: 'Harvested by hand during low tide to avoid damaging the seabed and allow for natural regeneration.',
      },
    ],
    sustainabilityAttributes: ['vegan', 'cruelty-free', 'compostable'],
    suitableSkinTypes: ['oily', 'combination', 'acne-prone'],
  },
   {
    id: 'prod_004',
    name: 'Coral Reef Cleanser',
    category: 'Facial Care',
    price: 25.0,
    imageId: 'cleanser-1',
    description: 'A gentle foaming cleanser that removes makeup and impurities without stripping the skin\'s natural moisture barrier.',
    ingredients: [
      { name: 'Red Algae', description: 'Known for its brightening and moisturizing properties.', environmentalImpact: 'Farmed on land to protect fragile marine ecosystems.' },
      { name: 'Cocamidopropyl Betaine', description: 'A mild surfactant derived from coconuts.', environmentalImpact: 'Sourced from certified sustainable coconut plantations.' }
    ],
    sustainabilityAttributes: ['vegan', 'cruelty-free', 'reef-safe'],
    suitableSkinTypes: ['all', 'sensitive'],
  },
  {
    id: 'prod_005',
    name: 'Deep Sea Conditioner',
    category: 'Hair Care',
    price: 30.0,
    imageId: 'conditioner-1',
    description: 'Intensely hydrate and detangle your hair with this creamy conditioner, leaving it soft and manageable.',
    ingredients: [
      { name: 'Irish Moss', description: 'A seaweed that provides slip and moisture to hair.', environmentalImpact: 'Wild-harvested with techniques that ensure regrowth.' },
      { name: 'Shea Butter', description: 'Provides deep moisturization for hair strands.', environmentalImpact: 'Sourced from a women\'s cooperative in Ghana that practices fair trade.' }
    ],
    sustainabilityAttributes: ['vegan', 'cruelty-free', 'fair-trade'],
    suitableSkinTypes: ['dry', 'damaged'],
  },
  {
    id: 'prod_006',
    name: 'Saltwater Body Scrub',
    category: 'Body & Skin',
    price: 22.0,
    imageId: 'body-wash-1',
    description: 'Exfoliate and soften your skin with this invigorating body scrub made with natural sea salt and nourishing oils.',
    ingredients: [
      { name: 'Sea Salt', description: 'Natural exfoliant to slough away dead skin cells.', environmentalImpact: 'Harvested from clean ocean waters and naturally evaporated.' },
      { name: 'Jojoba Oil', description: 'Mimics the skin\'s natural sebum for excellent moisturization.', environmentalImpact: 'Grown in arid regions, requiring minimal water.' }
    ],
    sustainabilityAttributes: ['vegan', 'cruelty-free', 'water-conscious'],
    suitableSkinTypes: ['all'],
  },
];

export const challenges: Challenge[] = [
  {
    id: 'chal_001',
    title: 'Plastic-Free Week',
    description:
      'Complete a week of purchases using only products with plastic-free packaging.',
    points: 100,
    badge: 'Plastic Warrior',
    progress: 60,
  },
  {
    id: 'chal_002',
    title: 'Return Champion',
    description: 'Return 5 empty containers using our EcoReturn system this month.',
    points: 150,
    badge: 'Recycle Hero',
    progress: 20,
  },
  {
    id: 'chal_003',
    title: 'Vegan Virtuoso',
    description:
      'Try three different products from our vegan-certified facial care line.',
    points: 75,
    badge: 'Plant-Powered',
    progress: 100,
  },
];

export const userImpact: UserImpact = {
  plasticSaved: 1250,
  co2Avoided: 3.5,
  pointsEarned: 2450,
  returnsMade: 12,
};

export const impactBadges: ImpactBadge[] = [
    { name: 'Eco Starter', description: 'Made your first sustainable purchase.', icon: Sprout },
    { name: 'Plastic Warrior', description: 'Saved 1kg of plastic.', icon: Shield },
    { name: 'Recycle Hero', description: 'Returned 10 containers.', icon: Recycle },
    { name: 'Water Guardian', description: 'Chose 5 water-conscious products.', icon: Droplets },
    { name: 'Green Leaf', description: 'Reached 1000 eco points.', icon: Leaf },
    { name: 'Eco Champion', description: 'Completed 5 challenges.', icon: Award },
    { name: 'Planet Protector', description: 'Top 1% of eco-conscious users.', icon: Star },
];

export const userPreferences = {
    skinType: 'combination',
    sustainabilityPreferences: ['plastic-free-packaging', 'vegan'],
    purchaseHistory: ['prod_001', 'prod_002'],
};

export const placeholderImages = placeholderData.placeholderImages;
