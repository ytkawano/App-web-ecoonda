import type { Product, Challenge, UserImpact, ImpactBadge } from './types';
import placeholderJson from './placeholder-images.json';

export const placeholderImages = placeholderJson.placeholderImages;

export const productCategories: Product['category'][] = [
  'Cuidado Facial',
  'Corpo e Pele',
  'Cuidado Capilar',
];

export const challenges: Challenge[] = [
  {
    id: 'chal_001',
    title: 'Semana Sem Plástico',
    description:
      'Complete uma semana de compras usando apenas produtos com embalagens sem plástico.',
    points: 100,
    badge: 'Guerreiro do Plástico',
    progress: 60,
  },
  {
    id: 'chal_002',
    title: 'Campeão da Devolução',
    description: 'Devolva 5 embalagens vazias usando nosso sistema EcoReturn este mês.',
    points: 150,
    badge: 'Herói da Reciclagem',
    progress: 20,
  },
  {
    id: 'chal_003',
    title: 'Virtuoso Vegano',
    description:
      'Experimente três produtos diferentes da nossa linha de cuidados faciais com certificação vegana.',
    points: 75,
    badge: 'Poder Vegetal',
    progress: 100,
  },
];

export const userImpact: UserImpact = {
  plasticSaved: 1250,
  co2Avoided: 3.5,
  pointsEarned: 2450,
  returnsMade: 12,
};

export const impactBadges: (Omit<ImpactBadge, 'icon'> & { icon: string })[] = [
    { name: 'Iniciante Eco', description: 'Fez sua primeira compra sustentável.', icon: 'Sprout' },
    { name: 'Guerreiro do Plástico', description: 'Economizou 1kg de plástico.', icon: 'Shield' },
    { name: 'Herói da Reciclagem', description: 'Devolveu 10 embalagens.', icon: 'Recycle' },
    { name: 'Guardião da Água', description: 'Escolheu 5 produtos conscientes sobre o uso da água.', icon: 'Droplets' },
    { name: 'Folha Verde', description: 'Alcançou 1000 eco pontos.', icon: 'Leaf' },
    { name: 'Campeão Ecológico', description: 'Completou 5 desafios.', icon: 'Award' },
    { name: 'Protetor do Planeta', description: 'Top 1% de usuários eco-conscientes.', icon: 'Star' },
];
