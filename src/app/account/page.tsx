
'use client';

import Link from 'next/link';
import {
  User,
  ChevronRight,
  Leaf,
  Heart,
  Award,
  Shield,
  Recycle,
  Sprout,
  Droplets,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import OrderHistory from '@/components/dashboard/OrderHistory';
import { useAuth, useFirestore } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { impactBadges, wishlist as mockWishlist } from '@/lib/data';
import { UserProfile } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

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
    const { user, loading: authLoading } = useAuth();
    const firestore = useFirestore();
    const [userData, setUserData] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    // TODO: Replace with real wishlist data
    const wishlist = mockWishlist;

    useEffect(() => {
        const fetchUserData = async () => {
            if (!authLoading) {
                if (user && firestore) {
                    const userDocRef = doc(firestore, 'users', user.uid);
                    try {
                        const docSnap = await getDoc(userDocRef);
                        if (docSnap.exists()) {
                            setUserData(docSnap.data() as UserProfile);
                        } else {
                            // Create a default profile if it doesn't exist, useful for old users
                            const defaultProfile: UserProfile = {
                                uid: user.uid,
                                email: user.email!,
                                displayName: user.displayName || 'Usuário',
                                photoURL: user.photoURL || '',
                                address: { street: '', number: '', city: '', state: '' },
                                ecoPoints: 0,
                                plasticSaved: 0,
                                co2Avoided: 0,
                                returnsMade: 0,
                                earnedBadges: [],
                                purchaseHistory: [],
                            };
                            setUserData(defaultProfile);
                        }
                    } catch (error) {
                        console.error("Error fetching user data:", error);
                    } finally {
                        setLoading(false);
                    }
                } else {
                    setLoading(false);
                }
            }
        };
        
        fetchUserData();

    }, [user, authLoading, firestore]);

    if (authLoading || loading) {
        return (
             <div className="container mx-auto max-w-7xl px-4 py-12">
                 <header className="mb-12 text-center">
                    <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />
                    <Skeleton className="h-10 w-1/2 mx-auto" />
                    <Skeleton className="h-6 w-3/4 mx-auto mt-2" />
                </header>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {Array.from({length: 4}).map((_, i) => (
                        <Card key={i}>
                            <CardHeader><Skeleton className="h-8 w-1/2" /></CardHeader>
                            <CardContent><Skeleton className="h-24 w-full" /></CardContent>
                            <CardFooter><Skeleton className="h-10 w-32" /></CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    if (!user) {
        return <div className="flex h-screen items-center justify-center">Por favor, faça login para ver sua conta.</div>;
    }

    const currentData = userData || {
        displayName: user.displayName,
        email: user.email,
        address: { street: '', number: '', city: '', state: '' },
        ecoPoints: 0,
        plasticSaved: 0,
        co2Avoided: 0,
        returnsMade: 0,
        earnedBadges: [],
    };

    const addressString = [currentData.address?.street, currentData.address?.number, currentData.address?.city, currentData.address?.state].filter(Boolean).join(', ') || 'Não informado';
    const earnedBadges = impactBadges.filter(b => (currentData.earnedBadges || []).includes(b.name));


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
              Bem-vindo(a), {currentData.displayName || 'Usuário'}!
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
                description={`Você tem ${currentData.ecoPoints} pontos para usar.`}
                link="/ecopoints"
                linkText='Ver todos emblemas'
            >
                <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                            <Shield className="h-8 w-8 text-accent" />
                            <span className="font-bold text-lg">{(currentData.plasticSaved / 1000).toFixed(2)} kg</span>
                            <span className="text-xs text-muted-foreground">Plástico Evitado</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <Recycle className="h-8 w-8 text-accent" />
                            <span className="font-bold text-lg">{currentData.returnsMade}</span>
                            <span className="text-xs text-muted-foreground">Devoluções</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <Sprout className="h-8 w-8 text-accent" />
                            <span className="font-bold text-lg">{currentData.co2Avoided} kg</span>
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
                           {earnedBadges.length === 0 && <p className="text-xs text-muted-foreground">Nenhum emblema ainda.</p>}
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
                    <p className="font-semibold">{currentData.displayName || 'Usuário'}</p>
                    <p className="text-sm text-muted-foreground">{currentData.email}</p>
                    <p className="text-sm text-muted-foreground">{addressString}</p>
                </div>
            </AccountSection>
        </div>

      </div>
    </div>
  );
}
