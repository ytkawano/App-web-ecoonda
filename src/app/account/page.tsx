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
  Droplets,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import OrderHistory from '@/components/dashboard/OrderHistory';
import { useAuth } from '@/context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';


const iconComponents: { [key: string]: React.ElementType } = {
    Sprout,
    Shield,
    Recycle,
    Award,
    Leaf,
    Droplets,
    Star,
  };

const AccountSection = ({ icon: Icon, title, description, link, linkText, children }: { icon: React.ElementType, title: string, description: string, link: string, linkText: string, children: React.ReactNode }) => (
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
          <Link href={link}>{linkText} <ChevronRight className="h-4 w-4 ml-2" /></Link>
        </Button>
      </div>
    </Card>
  );

export default function AccountPage() {
    const { user, loading } = useAuth();
    const [address, setAddress] = useState('Não informado');
    const userPoints = userImpact.pointsEarned;
    const earnedBadges = impactBadges.slice(0, 4);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(userDocRef);
                if (docSnap.exists()) {
                    setAddress(docSnap.data().address || 'Não informado');
                }
            }
        };
        fetchUserData();
    }, [user]);

    if (loading) {
        return <div className="flex h-screen items-center justify-center">Carregando...</div>;
    }

    if (!user) {
        return <div className="flex h-screen items-center justify-center">Por favor, faça login para ver sua conta.</div>;
    }


  return (
    <div className="bg-background min-h-screen text-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-12">

        {/* Cabeçalho */}
        <header className="mb-12 text-center">
            <div className="inline-block bg-card p-4 rounded-full mb-4">
                <img 
                    src={user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`}
                    alt="Foto do Perfil" 
                    className="w-24 h-24 rounded-full border-4 border-primary"
                />
            </div>
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
              Bem-vindo(a), {user.displayName || 'Usuário'}!
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Este é o seu painel pessoal. Acompanhe seu impacto e suas atividades.
            </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Seção de EcoPoints */}
            <AccountSection 
                icon={Leaf} 
                title="EcoPoints & Emblemas" 
                description={`Você tem ${userPoints} pontos para usar.`}
                link="/ecopoints"
                linkText='Ver todos emblemas'
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
             <div className="col-span-1 lg:col-span-2">
                <OrderHistory />
            </div>

             {/* Seção de Lista de Desejos */}
             <AccountSection 
                icon={Heart} 
                title="Lista de Desejos" 
                description="Seus produtos favoritos que você salvou."
                link="/wishlist"
                linkText='Ver lista de desejos'
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
                linkText='Editar perfil'
            >
                <div className="space-y-3">
                    <p className="font-semibold">{user.displayName || 'Usuário'}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-sm text-muted-foreground">{address}</p>
                </div>
            </AccountSection>
        </div>

      </div>
    </div>
  );
}
