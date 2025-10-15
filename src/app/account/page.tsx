'use client';

import Link from 'next/link';
import { userImpact, orders, wishlist, impactBadges } from '@/lib/data';
import {
  User,
  ChevronRight,
  Leaf,
  Gift,
  Package,
  Heart,
  Award,
  Shield,
  Recycle,
  Sprout,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import React from 'react';


const iconComponents: { [key: string]: React.ElementType } = {
    Sprout,
    Shield,
    Recycle,
    Award,
    Leaf,
  };

const AccountSection = ({ icon: Icon, title, description, link, children }: { icon: React.ElementType, title: string, description: string, link: string, children: React.ReactNode }) => (
    <Card className="overflow-hidden flex flex-col">
      <CardHeader className="flex-row items-center gap-4 bg-muted/30 p-4 border-b">
        <div className="p-3 bg-accent rounded-full">
            <Icon className="h-6 w-6 text-accent-foreground" />
        </div>
        <div>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <CardDescription className="text-sm">{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        {children}
      </CardContent>
      <div className="px-6 pb-4 mt-auto">
        <Button variant="outline" asChild>
          <Link href={link}>Ver detalhes <ChevronRight className="h-4 w-4 ml-2" /></Link>
        </Button>
      </div>
    </Card>
  );

export default function AccountPage() {
    const userPoints = userImpact.pointsEarned;
    const recentOrder = orders[0];
    const earnedBadges = impactBadges.slice(0, 4);


  return (
    <div className="bg-background min-h-screen text-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-12">

        {/* Cabeçalho */}
        <header className="mb-12 text-center">
            <div className="inline-block bg-card p-4 rounded-full mb-4">
                <img 
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d" 
                    alt="Foto do Perfil" 
                    className="w-24 h-24 rounded-full border-4 border-primary"
                />
            </div>
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
              Bem-vinda, Ana Costa!
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Este é o seu painel pessoal. Acompanhe seu impacto e suas atividades.
            </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Seção de EcoPoints */}
            <AccountSection 
                icon={Leaf} 
                title="EcoPoints" 
                description={`Você tem ${userPoints} pontos para usar.`}
                link="/ecopoints"
            >
                <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                            <Shield className="h-8 w-8 text-accent" />
                            <span className="font-bold text-lg">{userImpact.plasticSaved / 1000} kg</span>
                            <span className="text-xs text-muted-foreground">Plástico Evitado</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <Recycle className="h-8 w-8 text-accent" />
                            <span className="font-bold text-lg">{userImpact.returnsMade}</span>
                            <span className="text-xs text-muted-foreground">Devoluções</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <Sprout className="h-8 w-8 text-accent" />
                            <span className="font-bold text-lg">{userImpact.co2Avoided} kg</span>
                            <span className="text-xs text-muted-foreground">CO₂ Evitado</span>
                        </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-3 text-center">Últimos emblemas conquistados:</p>
                      <div className="flex justify-center gap-6 text-center">
                          {earnedBadges.slice(0, 3).map(badge => {
                              const Icon = iconComponents[badge.icon];
                              return (
                                  <div key={badge.name} className="flex flex-col items-center gap-1 w-20">
                                      {Icon && <Icon className="h-10 w-10 text-yellow-500" />}
                                      <span className="text-xs font-semibold">{badge.name}</span>
                                  </div>
                              )
                          })}
                      </div>
                    </div>
                </div>
            </AccountSection>

            {/* Seção de Pedidos */}
            <AccountSection 
                icon={Package} 
                title="Pedidos Recentes" 
                description="Acompanhe o status dos seus últimos pedidos."
                link="/orders"
            >
                {recentOrder ? (
                    <div className="flow-root">
                        <dl className="-my-4 divide-y divide-gray-200 text-sm">
                            <div className="flex items-center justify-between py-4">
                                <dt className="text-muted-foreground">Pedido</dt>
                                <dd className="font-medium">#{recentOrder.id.split('_')[1]}</dd>
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <dt className="text-muted-foreground">Data</dt>
                                <dd className="font-medium">{new Date(recentOrder.date).toLocaleDateString('pt-BR')}</dd>
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <dt className="text-muted-foreground">Status</dt>
                                <dd><span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">{recentOrder.status}</span></dd>
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <dt className="text-muted-foreground">Total</dt>
                                <dd className="font-medium">R$ {recentOrder.total.toFixed(2).replace('.', ',')}</dd>
                            </div>
                        </dl>
                    </div>
                ) : (
                    <p>Você ainda não fez nenhum pedido.</p>
                )}
            </AccountSection>

             {/* Seção de Lista de Desejos */}
             <AccountSection 
                icon={Heart} 
                title="Lista de Desejos" 
                description="Seus produtos favoritos que você salvou."
                link="/wishlist"
            >
                {wishlist.length > 0 ? (
                    <div className="flex items-center justify-center -space-x-4 rtl:space-x-reverse">
                        {wishlist.slice(0, 5).map(item => (
                            <img key={item.id} className="w-16 h-16 rounded-full border-2 border-white dark:border-gray-800 object-cover" src={item.imageUrl} alt={item.name}/>
                        ))}
                        {wishlist.length > 5 && 
                            <a className="flex items-center justify-center w-16 h-16 text-xs font-medium text-white bg-gray-700 rounded-full border-2 border-white hover:bg-gray-600 dark:border-gray-800" href="#">+{wishlist.length - 5}</a>
                        }
                    </div>
                ) : (
                    <p className="text-center text-muted-foreground">Sua lista de desejos está vazia.</p>
                )}
            </AccountSection>

            {/* Seção de Perfil */}
            <AccountSection 
                icon={User} 
                title="Meu Perfil" 
                description="Gerencie seus dados e informações de contato."
                link="/profile"
            >
                <div className="space-y-3">
                    <p className="font-semibold">Ana Costa</p>
                    <p className="text-sm text-muted-foreground">ana.costa@example.com</p>
                    <p className="text-sm text-muted-foreground">Rua das Flores, 123, São Paulo, SP</p>
                </div>
            </AccountSection>
        </div>

      </div>
    </div>
  );
}
