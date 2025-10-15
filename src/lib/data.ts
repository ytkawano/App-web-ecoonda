
import type { Challenge, UserImpact, ImpactBadge, Reward, PointActivity, Order, WishlistItem } from './types';
import placeholderJson from './placeholder-images.json';

export const placeholderImages = placeholderJson.placeholderImages;

export const productCategories = [
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

export const rewards: Reward[] = [
    { id: 'rew_001', title: 'R$ 10 de Desconto', description: 'Use em qualquer compra acima de R$ 50', pointsRequired: 500,},
    { id: 'rew_002', title: 'R$ 25 de Desconto', description: 'Use em qualquer compra acima de R$ 100', pointsRequired: 1000, },
    { id: 'rew_003', title: 'Frete Grátis', description: 'Para qualquer lugar do Brasil', pointsRequired: 750, },
    { id: 'rew_004', title: 'Produto Grátis (Viagem)', description: 'Escolha um item em tamanho de viagem', pointsRequired: 1500, },
    { id: 'rew_005', title: '50% de Desconto em um Item', description: 'Metade do preço no seu produto favorito', pointsRequired: 2500, },
];

export const pointHistory: PointActivity[] = [
    { id: 'act_001', description: 'Compra de "Shampoo Força das Algas"', points: 45, date: '2024-07-15' },
    { id: 'act_002', description: 'Devolucão de 3 embalagens', points: 75, date: '2024-07-10' },
    { id: 'act_003', description: 'Compra de "Sérum Orvalho do Mar"', points: 60, date: '2024-07-02' },
    { id: 'act_004', description: 'Completou o desafio "Virtuoso Vegano"', points: 75, date: '2024-06-28' },
    { id: 'act_005', description: 'Bônus de Aniversário', points: 100, date: '2024-06-22' },
];

export const orders: Order[] = [
    {
        id: 'ord_001',
        userId: 'user-1',
        createdAt: '2024-07-15',
        status: 'Entregue',
        total: 125.50,
        items: [
            { id: 'prod_001', name: 'Shampoo Força das Algas', quantity: 1, price: 28.00 },
            { id: 'prod_002', name: 'Condicionador Mar Profundo', quantity: 1, price: 30.00 },
        ]
    },
    {
        id: 'ord_002',
        userId: 'user-1',
        createdAt: '2024-06-22',
        status: 'Entregue',
        total: 89.90,
        items: [
            { id: 'prod_003', name: 'Sérum Orvalho do Mar', quantity: 1, price: 48.00 },
        ]
    }
].map(o => ({ ...o, createdAt: new Date(o.createdAt) }));


export const wishlist: WishlistItem[] = [
    { id: 'wish_001', productId: 'prod_004', name: 'Máscara de Argila Purificante', imageUrl: '/mascara de argila.jpeg' },
    { id: 'wish_002', productId: 'prod_005', name: 'Esfoliante Corporal Renovador', imageUrl: '/esfoliante corporal.jpeg' },
    { id: 'wish_003', productId: 'prod_006', name: 'Limpador Facial Coral Suave', imageUrl: '/limpador coral.jpeg' },
];
