import type { Product, Challenge, UserImpact, ImpactBadge } from './types';
import { Leaf, Recycle, Sprout, Droplets, Award, Star, Shield } from 'lucide-react';
import placeholderData from './placeholder-images.json';

export const productCategories: Product['category'][] = [
  'Cuidado Facial',
  'Corpo e Pele',
  'Cuidado Capilar',
];

export const products: Product[] = [
  {
    id: 'prod_001',
    name: 'Sérum Orvalho do Oceano',
    category: 'Cuidado Facial',
    price: 48.0,
    imageId: 'serum-1',
    description:
      'Um sérum facial hidratante repleto de extratos marinhos para rejuvenescer e preencher sua pele, deixando um acabamento fresco e radiante.',
    ingredients: [
      {
        name: 'Extrato de Algas',
        description:
          'Rico em antioxidantes, o extrato de algas ajuda a proteger sua pele de agressores externos e a acalmar a inflamação.',
        environmentalImpact:
          'Colhido de forma sustentável em fazendas oceânicas protegidas, promovendo a biodiversidade marinha e garantindo o mínimo de perturbação nos ecossistemas.',
      },
      {
        name: 'Ácido Hialurônico',
        description: 'Um poderoso umectante que atrai umidade para a pele, proporcionando hidratação de longa duração.',
        environmentalImpact: 'Nosso ácido hialurônico é derivado de processos de biofermentação veganos, evitando fontes de origem animal e reduzindo o uso de água.',
      },
    ],
    sustainabilityAttributes: ['vegano', 'livre-de-crueldade', 'embalagem-sem-plástico'],
    suitableSkinTypes: ['seca', 'normal', 'mista'],
  },
  {
    id: 'prod_002',
    name: 'Shampoo Força das Algas',
    category: 'Cuidado Capilar',
    price: 28.0,
    imageId: 'shampoo-1',
    description:
      'Fortaleça seu cabelo da raiz às pontas com este shampoo rico em nutrientes. Algas e minerais marinhos limpam suavemente enquanto aumentam o volume e o brilho.',
    ingredients: [
       {
        name: 'Espirulina',
        description:
          'Uma alga azul-esverdeada rica em proteínas e ferro, que ajuda a fortalecer o cabelo e a promover o crescimento.',
        environmentalImpact:
          'Cultivada em piscinas de água doce controladas que reciclam a água, nossa espirulina tem uma baixa pegada de carbono.',
      },
       {
        name: 'Sal Marinho',
        description: 'Adiciona textura e volume ao cabelo enquanto esfolia suavemente o couro cabeludo.',
        environmentalImpact: 'Colhido de salinas naturais usando métodos tradicionais e eficientes em termos de energia que preservam o ambiente circundante.',
      },
    ],
    sustainabilityAttributes: ['vegano', 'livre-de-crueldade', 'materiais-reciclados'],
    suitableSkinTypes: ['oleosa', 'normal'],
  },
  {
    id: 'prod_003',
    name: 'Máscara de Lama Marinha',
    category: 'Cuidado Facial',
    price: 35.0,
    imageId: 'face-mask-1',
    description:
      'Uma máscara de lama desintoxicante infundida com argila marinha rica em minerais para extrair impurezas e refinar os poros.',
    ingredients: [
      {
        name: 'Argila Marinha',
        description: 'Uma argila rica em minerais que desintoxica a pele, absorvendo o excesso de óleo e impurezas.',
        environmentalImpact: 'Proveniente de depósitos costeiros naturais com métodos de extração responsáveis para garantir a estabilidade da linha costeira.',
      },
      {
        name: 'Extrato de Fucus',
        description: 'Um tipo de alga que ajuda a melhorar a elasticidade da pele e a reduzir a inflamação.',
        environmentalImpact: 'Colhido à mão durante a maré baixa para evitar danos ao fundo do mar e permitir a regeneração natural.',
      },
    ],
    sustainabilityAttributes: ['vegano', 'livre-de-crueldade', 'compostável'],
    suitableSkinTypes: ['oleosa', 'mista', 'com-acne'],
  },
   {
    id: 'prod_004',
    name: 'Limpador Coral Reef',
    category: 'Cuidado Facial',
    price: 25.0,
    imageId: 'cleanser-1',
    description: 'Um limpador de espuma suave que remove maquiagem e impurezas sem agredir a barreira de hidratação natural da pele.',
    ingredients: [
      { name: 'Algas Vermelhas', description: 'Conhecida por suas propriedades clareadoras e hidratantes.', environmentalImpact: 'Cultivada em terra para proteger os frágeis ecossistemas marinhos.' },
      { name: 'Cocamidopropil Betaína', description: 'Um surfactante suave derivado de cocos.', environmentalImpact: 'Proveniente de plantações de coco sustentáveis certificadas.' }
    ],
    sustainabilityAttributes: ['vegano', 'livre-de-crueldade', 'seguro-para-corais'],
    suitableSkinTypes: ['todos', 'sensível'],
  },
  {
    id: 'prod_005',
    name: 'Condicionador Mar Profundo',
    category: 'Cuidado Capilar',
    price: 30.0,
    imageId: 'conditioner-1',
    description: 'Hidrate e desembarace intensamente seus cabelos com este condicionador cremoso, deixando-os macios и fáceis de pentear.',
    ingredients: [
      { name: 'Musgo Irlandês', description: 'Uma alga que proporciona deslizamento e umidade aos cabelos.', environmentalImpact: 'Colhido na natureza com técnicas que garantem o recrescimento.' },
      { name: 'Manteiga de Karité', description: 'Fornece hidratação profunda para os fios de cabelo.', environmentalImpact: 'Proveniente de uma cooperativa de mulheres em Gana que pratica o comércio justo.' }
    ],
    sustainabilityAttributes: ['vegano', 'livre-de-crueldade', 'comércio-justo'],
    suitableSkinTypes: ['seco', 'danificado'],
  },
  {
    id: 'prod_006',
    name: 'Esfoliante Corporal de Água Salgada',
    category: 'Corpo e Pele',
    price: 22.0,
    imageId: 'body-wash-1',
    description: 'Esfolie e amacie sua pele com este esfoliante corporal revigorante feito com sal marinho natural e óleos nutritivos.',
    ingredients: [
      { name: 'Sal Marinho', description: 'Esfoliante natural para remover as células mortas da pele.', environmentalImpact: 'Colhido de águas oceânicas limpas e evaporado naturalmente.' },
      { name: 'Óleo de Jojoba', description: 'Imita o sebo natural da pele para uma excelente hidratação.', environmentalImpact: 'Cultivado em regiões áridas, exigindo pouca água.' }
    ],
    sustainabilityAttributes: ['vegano', 'livre-de-crueldade', 'consciente-com-a-água'],
    suitableSkinTypes: ['todos'],
  },
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

export const impactBadges: ImpactBadge[] = [
    { name: 'Iniciante Eco', description: 'Fez sua primeira compra sustentável.', icon: Sprout },
    { name: 'Guerreiro do Plástico', description: 'Economizou 1kg de plástico.', icon: Shield },
    { name: 'Herói da Reciclagem', description: 'Devolveu 10 embalagens.', icon: Recycle },
    { name: 'Guardião da Água', description: 'Escolheu 5 produtos conscientes sobre o uso da água.', icon: Droplets },
    { name: 'Folha Verde', description: 'Alcançou 1000 eco pontos.', icon: Leaf },
    { name: 'Campeão Ecológico', description: 'Completou 5 desafios.', icon: Award },
    { name: 'Protetor do Planeta', description: 'Top 1% de usuários eco-conscientes.', icon: Star },
];

export const userPreferences = {
    skinType: 'mista',
    sustainabilityPreferences: ['embalagem-sem-plástico', 'vegano'],
    purchaseHistory: ['prod_001', 'prod_002'],
};

export const placeholderImages = placeholderData.placeholderImages;
