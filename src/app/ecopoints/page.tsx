
'use client';

import {
  Leaf,
  Sprout,
  Shield,
  Recycle,
  Droplets,
  Award,
  Star,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { useState, useEffect } from 'react';
import { useAuth, useFirestore } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import type { UserProfile, Challenge } from '@/lib/types';
import { challenges as allChallenges, impactBadges } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';


const iconComponents: { [key: string]: React.ElementType } = {
  Sprout,
  Shield,
  Recycle,
  Droplets,
  Leaf,
  Award,
  Star,
};

const ImpactStat = ({ value, label, icon: Icon }: { value: string | number, label: string, icon: React.ElementType }) => (
    <div className="flex items-center space-x-4">
        <div className="bg-accent p-3 rounded-full">
            <Icon className="h-6 w-6 text-accent-foreground" />
        </div>
        <div>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-sm text-muted-foreground">{label}</div>
        </div>
    </div>
);


export default function EcoPointsPage() {
  const { user, loading: authLoading } = useAuth();
  const firestore = useFirestore();
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [userChallenges, setUserChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user || !firestore) {
        setLoading(false);
        return;
      }
      
      try {
        const userDocRef = doc(firestore, 'users', user.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as UserProfile;
          setUserData(data);
          
          const challengesWithProgress = allChallenges.map(challenge => {
              if (data.earnedBadges?.includes(challenge.badge)) {
                  return { ...challenge, progress: 100 };
              }
              // In a real app, you'd fetch real progress. Here we simulate it.
              return challenge;
          });
          setUserChallenges(challengesWithProgress);
        } else {
             // Create a default profile if it doesn't exist
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
          console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (!authLoading) {
      fetchUserData();
    }
  }, [user, firestore, authLoading]);

  if (authLoading || loading) {
    return (
        <div className="container mx-auto max-w-7xl px-4 py-12">
            <header className="mb-12 flex flex-col items-center justify-between gap-6 sm:flex-row">
                 <div className="flex-1 space-y-2">
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-6 w-full" />
                </div>
                 <Skeleton className="h-20 w-48 rounded-full" />
            </header>
            <Skeleton className="h-10 w-full mb-8" />
             <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                </CardContent>
            </Card>
        </div>
    )
  }
  
  if (!user) {
      return <div className='container mx-auto text-center py-12'>Faça login para ver seus EcoPoints.</div>
  }

  const earnedBadges = impactBadges.filter(b => (userData?.earnedBadges || []).includes(b.name));

  return (
    <div className="bg-background min-h-screen text-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        {/* Cabeçalho */}
        <header className="mb-12 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex-1">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
              Seu Painel EcoPoints
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Acompanhe seu progresso, ganhe recompensas e veja o impacto positivo que você está criando.
            </p>
          </div>
          <div className="flex items-center gap-4 rounded-full bg-card p-4 shadow-md">
            <Leaf className="h-10 w-10 text-green-500" />
            <div className="text-right">
              <span className="block text-3xl font-bold text-primary">{userData?.ecoPoints ?? 0}</span>
              <span className="text-sm text-muted-foreground">EcoPoints</span>
            </div>
          </div>
        </header>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-8">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="challenges">Desafios</TabsTrigger>
            <TabsTrigger value="badges">Meus Emblemas</TabsTrigger>
          </TabsList>

          {/* Aba de Visão Geral */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 gap-8">
              {/* Estatísticas de Impacto */}
              <Card>
                <CardHeader>
                  <CardTitle>Seu Impacto Positivo</CardTitle>
                  <CardDescription>Pequenas ações, grande diferença.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                    <ImpactStat value={`${((userData?.plasticSaved ?? 0) / 1000).toFixed(2)}kg`} label="Plástico Economizado" icon={Shield} />
                    <ImpactStat value={`${(userData?.co2Avoided ?? 0).toFixed(2)}kg`} label="CO₂ Evitado" icon={Sprout} />
                    <ImpactStat value={userData?.returnsMade ?? 0} label="Devoluções Feitas" icon={Recycle} />
                    <ImpactStat value={userData?.ecoPoints ?? 0} label="Total de Pontos" icon={Leaf} />
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 {/* Desafios em Andamento */}
                <Card>
                    <CardHeader>
                    <CardTitle>Desafios em Andamento</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                    {userChallenges.slice(0, 2).map((challenge) => (
                        <div key={challenge.id}>
                            <div className="mb-2 flex items-baseline justify-between">
                                <h4 className="font-semibold">{challenge.title}</h4>
                                <span className="text-sm font-bold text-primary">+{challenge.points}pts</span>
                            </div>
                            <Progress value={challenge.progress} className="h-3" />
                            <p className="mt-2 text-xs text-muted-foreground">{challenge.description}</p>
                        </div>
                    ))}
                    </CardContent>
                </Card>

                 {/* Últimos Emblemas */}
                 <Card>
                    <CardHeader>
                    <CardTitle>Últimos Emblemas Conquistados</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap items-center justify-center gap-6">
                        {earnedBadges.slice(0, 4).map((badge) => {
                            const Icon = iconComponents[badge.icon];
                            return (
                                <div key={badge.name} className="flex flex-col items-center gap-2 text-center">
                                    <div className="rounded-full border-4 border-accent p-4 bg-card">
                                        {Icon && <Icon className="h-10 w-10 text-accent-foreground" />}
                                    </div>
                                    <p className="text-sm font-semibold">{badge.name}</p>
                                </div>
                            );
                        })}
                         {earnedBadges.length === 0 && <p className='text-muted-foreground'>Você ainda não ganhou nenhum emblema.</p>}
                    </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Aba de Desafios */}
          <TabsContent value="challenges">
            <Card>
              <CardHeader>
                <CardTitle>Todos os Desafios</CardTitle>
                <CardDescription>Complete para ganhar pontos e emblemas exclusivos.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userChallenges.map((challenge) => (
                  <Card key={challenge.id} className="flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-lg">{challenge.title}</CardTitle>
                      <CardDescription className="text-primary font-bold">+{challenge.points}pts</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground mb-4">{challenge.description}</p>
                      <Progress value={challenge.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-2">{challenge.progress}% completo</p>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba de Emblemas */}
          <TabsContent value="badges">
            <Card>
              <CardHeader>
                <CardTitle>Galeria de Emblemas</CardTitle>
                <CardDescription>Sua coleção de conquistas ecológicas.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {impactBadges.map((badge) => {
                  const Icon = iconComponents[badge.icon];
                  const isEarned = earnedBadges.some(eb => eb.name === badge.name);
                  return (
                    <div key={badge.name} className={`flex flex-col items-center text-center p-4 rounded-lg transition-all ${isEarned ? 'bg-card' : 'bg-muted opacity-50'}`}>
                      <div className={`rounded-full p-3 mb-2 ${isEarned ? 'bg-accent' : 'bg-gray-400'}`}>
                        {Icon && <Icon className={`h-12 w-12 ${isEarned ? 'text-accent-foreground' : 'text-white'}`} />}
                      </div>
                      <h4 className="font-bold">{badge.name}</h4>
                      <p className="text-xs text-muted-foreground">{badge.description}</p>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
