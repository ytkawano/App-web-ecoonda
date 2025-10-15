'use client';

import { Ticket, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useState, useEffect } from 'react';
import { useAuth, useFirestore } from '@/firebase';
import { doc, getDoc, updateDoc, increment, writeBatch } from 'firebase/firestore';
import type { UserProfile, Reward } from '@/lib/types';
import { rewards } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/context/CartContext';


export default function RewardsPage() {
  const { user, loading: authLoading } = useAuth();
  const firestore = useFirestore();
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { applyCoupon } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && firestore) {
        const userDocRef = doc(firestore, 'users', user.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data() as UserProfile);
        }
      }
      setLoading(false);
    };
    if (!authLoading) {
      fetchUserData();
    }
  }, [user, authLoading, firestore]);

  const handleRedeem = async (reward: Reward) => {
    if (!user || !userData || !firestore) return;
    if (userData.ecoPoints < reward.pointsRequired) {
      toast({
        variant: "destructive",
        title: "Pontos Insuficientes",
        description: "Você não tem pontos suficientes para resgatar esta recompensa.",
      });
      return;
    }

    try {
        const userDocRef = doc(firestore, 'users', user.uid);
        
        // Use a batch write to ensure atomic operation
        const batch = writeBatch(firestore);
        
        // Decrement points
        batch.update(userDocRef, { ecoPoints: increment(-reward.pointsRequired) });

        // Add to point history (optional, can be a subcollection)
        // For simplicity, we are not implementing a full point history here

        await batch.commit();

        setUserData(prev => prev ? { ...prev, ecoPoints: prev.ecoPoints - reward.pointsRequired } : null);

        const discountValue = parseInt(reward.title.replace(/[^0-9]/g, ''), 10);
        const couponCode = `${reward.title.split(" ")[0].toUpperCase()}${discountValue}`;
        
        applyCoupon({ code: couponCode, discount: discountValue });

        toast({
            title: "Recompensa Resgatada!",
            description: `O cupom ${couponCode} foi aplicado ao seu carrinho.`,
        });

    } catch (error) {
        console.error("Error redeeming reward:", error);
        toast({
            variant: "destructive",
            title: "Erro ao Resgatar",
            description: "Não foi possível resgatar sua recompensa. Tente novamente.",
        });
    }
  };

  const userPoints = userData?.ecoPoints || 0;

  if (loading || authLoading) {
      return (
          <div className="container mx-auto max-w-7xl px-4 py-12">
            <header className="mb-12">
                <Skeleton className="h-10 w-3/4 mb-2" />
                <Skeleton className="h-6 w-full" />
            </header>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({length: 6}).map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-full mt-2" />
                        </CardHeader>
                        <CardFooter>
                            <Skeleton className="h-10 w-full" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
      )
  }

  if (!user) {
      return <div className='container mx-auto py-12 text-center'>Faça login para ver suas recompensas.</div>
  }

  return (
    <div className="bg-background min-h-screen text-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-12">

        {/* Cabeçalho */}
        <header className="mb-12 flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex-1">
                <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
                Central de Recompensas
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                Use seus EcoPoints para resgatar descontos exclusivos e produtos.
                </p>
            </div>
            <div className="flex items-center gap-4 rounded-full bg-card p-4 shadow-md">
                <Leaf className="h-10 w-10 text-green-500" />
                <div className="text-right">
                <span className="block text-3xl font-bold text-primary">{userPoints}</span>
                <span className="text-sm text-muted-foreground">EcoPoints</span>
                </div>
            </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward) => {
            const canRedeem = userPoints >= reward.pointsRequired;
            return (
              <Card key={reward.id} className={`flex flex-col justify-between transition-all ${!canRedeem ? 'bg-muted/50' : 'bg-card'}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{reward.title}</CardTitle>
                    <div className="flex items-center gap-2 font-bold text-primary">
                       <Ticket className="h-5 w-5" />
                       <span>{reward.pointsRequired}</span>
                    </div>
                  </div>
                  <CardDescription>{reward.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button
                    disabled={!canRedeem}
                    className="w-full"
                    onClick={() => handleRedeem(reward)}
                  >
                    {canRedeem ? 'Resgatar Agora' : 'Pontos Insuficientes'}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

      </div>
    </div>
  );
}
