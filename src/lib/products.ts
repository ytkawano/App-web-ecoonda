
import type { Product } from './types';

export const products: Product[] = [
    {
      id: 'prod_001',
      name: 'Shampoo Força das Algas',
      category: 'Cuidado Capilar',
      price: 28.00,
      imageId: 'shampoo-1',
      description: 'Um shampoo revitalizante com extrato de algas marinhas para fortalecer os fios e dar brilho.',
      ingredients: [
        { name: 'Extrato de Algas', description: 'Rico em minerais, fortalece e nutre.', environmentalImpact: 'Colheita sustentável em fazendas marinhas.' },
        { name: 'Óleo de Coco', description: 'Hidratação profunda e brilho.', environmentalImpact: 'Orgânico e de comércio justo.' },
      ],
      sustainabilityAttributes: ['vegano', 'livre-de-crueldade', 'embalagem-sem-plástico', 'seguro-para-corais'],
      suitableSkinTypes: ['todos'],
    },
    {
      id: 'prod_002',
      name: 'Condicionador Mar Profundo',
      category: 'Cuidado Capilar',
      price: 30.00,
      imageId: 'conditioner-1',
      description: 'Condicionador ultra-hidratante que desembaraça e suaviza, deixando o cabelo sedoso e leve.',
      ingredients: [
        { name: 'Manteiga de Karité', description: 'Hidratação intensa e nutrição.', environmentalImpact: 'Proveniente de cooperativas de mulheres em Gana.' },
        { name: 'Proteína de Arroz', description: 'Dá volume e fortalece.', environmentalImpact: 'Subproduto da agricultura de arroz, reduzindo o desperdício.' },
      ],
      sustainabilityAttributes: ['vegano', 'livre-de-crueldade', 'materiais-reciclados'],
      suitableSkinTypes: ['todos'],
    },
    {
      id: 'prod_003',
      name: 'Sérum Orvalho do Mar',
      category: 'Cuidado Facial',
      price: 48.00,
      imageId: 'serum-1',
      description: 'Sérum facial leve com ácido hialurônico de origem marinha para uma hidratação intensa.',
      ingredients: [
        { name: 'Ácido Hialurônico Botânico', description: 'Hidrata e preenche a pele.', environmentalImpact: 'Produzido por fermentação bacteriana, baixo impacto.' },
        { name: 'Extrato de Pepino', description: 'Acalma e refresca a pele.', environmentalImpact: 'Cultivado localmente e organicamente.' },
      ],
      sustainabilityAttributes: ['vegano', 'livre-de-crueldade', 'consciente-com-a-água', 'seguro-para-corais'],
      suitableSkinTypes: ['todos', 'seca', 'sensível'],
    },
    {
      id: 'prod_004',
      name: 'Máscara de Argila Purificante',
      category: 'Cuidado Facial',
      price: 35.00,
      imageId: 'face-mask-1',
      description: 'Máscara facial com argila verde e extratos marinhos para desintoxicar e revitalizar a pele.',
      ingredients: [
        { name: 'Argila Verde', description: 'Absorve impurezas e oleosidade.', environmentalImpact: 'Extraída de forma responsável, sem degradação do solo.' },
        { name: 'Spirulina', description: 'Rica em antioxidantes e nutrientes.', environmentalImpact: 'Cultivada em tanques fechados, sem impacto nos ecossistemas marinhos.' },
      ],
      sustainabilityAttributes: ['vegano', 'livre-de-crueldade', 'comércio-justo'],
      suitableSkinTypes: ['oleosa', 'mista', 'com-acne'],
    },
    {
      id: 'prod_005',
      name: 'Esfoliante Corporal Renovador',
      category: 'Corpo e Pele',
      price: 42.00,
      imageId: 'body-wash-1',
      description: 'Esfoliante suave com sal marinho e óleos nutritivos para uma pele macia e renovada.',
      ingredients: [
        { name: 'Sal Marinho Fino', description: 'Esfolia suavemente a pele.', environmentalImpact: 'Coletado de salinas solares, processo de baixo consumo energético.' },
        { name: 'Óleo de Amêndoas', description: 'Nutre e hidrata a pele.', environmentalImpact: 'Cultivo com baixo consumo de água.' },
      ],
      sustainabilityAttributes: ['vegano', 'livre-de-crueldade', 'seguro-para-corais'],
      suitableSkinTypes: ['todos'],
    },
    {
      id: 'prod_006',
      name: 'Limpador Facial Coral Suave',
      category: 'Cuidado Facial',
      price: 25.00,
      imageId: 'cleanser-1',
      description: 'Limpador facial em gel que remove impurezas sem agredir a barreira natural da pele.',
      ingredients: [
        { name: 'Extrato de Camomila', description: 'Propriedades calmantes e anti-inflamatórias.', environmentalImpact: 'Cultivo orgânico e sem pesticidas.' },
        { name: 'Glicerina Vegetal', description: 'Atrai umidade para a pele.', environmentalImpact: 'Derivada de plantas de origem sustentável.' },
      ],
      sustainabilityAttributes: ['vegano', 'livre-de-crueldade', 'seguro-para-corais', 'consciente-com-a-água'],
      suitableSkinTypes: ['todos', 'sensível', 'normal'],
    },
  ];
