
import { Timestamp } from "firebase/firestore";

export type Product = {
    id: string;
    name: string;
    category: 'Cuidado Facial' | 'Corpo e Pele' | 'Cuidado Capilar';
    price: number;
    imageId: string;
    description: string;
    ingredients: {
        name: string;
        description: string;
        environmentalImpact: string;
    }[];
    sustainabilityAttributes: ('vegano' | 'livre-de-crueldade' | 'embalagem-sem-plástico' | 'materiais-reciclados' | 'comércio-justo' | 'consciente-com-a-água' | 'seguro-para-corais')[];
    suitableSkinTypes: ('oleosa' | 'seca' | 'normal' | 'mista' | 'sensível' | 'com-acne' | 'todos' | 'danificado')[];
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
    plasticSaved: number;
    co2Avoided: number;
    pointsEarned: number;
    returnsMade: number;
};

export type ImpactBadge = {
    name: string;
    description: string;
    icon: React.ReactNode;
};

export type Reward = {
    id: string;
    title: string;
    description: string;
    pointsRequired: number;
};

export type PointActivity = {
    id: string;
    description: string;
    points: number;
    date: string;
};

export type Order = {
    id: string;
    userId: string;
    createdAt: Date | Timestamp;
    status: 'Entregue' | 'Em Processamento' | 'Enviado';
    total: number;
    items: OrderItem[];
};

export type OrderItem = { 
    id: string;
    name: string;
    quantity: number;
    price: number;
};

export type WishlistItem = {
    id: string;
    productId: string;
    name: string;
    imageUrl: string;
};
