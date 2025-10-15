'use client';

import { userImpact, rewards, pointHistory } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { Ticket, History, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';

export default function RewardsPage() {
  // TODO: Replace with real user points from Firestore
  const [userPoints, setUserPoints] = useState(userImpact.pointsEarned);
  const { applyCoupon } = useCart();
  const { toast } = useToast();

  const handleRedeem = (pointsRequired: number, title: string) => {
    if (userPoints >= pointsRequired) {
      setUserPoints(prevPoints => prevPoints - pointsRequired);

      const discountValue = parseInt(title.replace(/[^0-9]/g, ''), 10);
      const couponCode = `${title.split(" ")[0].toUpperCase()}${discountValue}`;

      applyCoupon({ code: couponCode, discount: discountValue });

      toast({
        title: "Recompensa Resgatada!",
        description: `O cupom ${couponCode} foi aplicado ao seu carrinho.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Pontos Insuficientes",
        description: "Você não tem pontos suficientes para resgatar esta recompensa.",
      });
    }
  };

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

        <Tabs defaultValue="rewards">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="rewards">Resgatar Recompensas</TabsTrigger>
            <TabsTrigger value="history">Histórico de Pontos</TabsTrigger>
          </TabsList>

          {/* Aba de Recompensas */}
          <TabsContent value="rewards">
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
                    <CardContent>
                      <Button 
                        disabled={!canRedeem} 
                        className="w-full"
                        onClick={() => handleRedeem(reward.pointsRequired, reward.title)}
                      >
                        {canRedeem ? 'Resgatar Agora' : 'Pontos Insuficientes'}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Aba de Histórico */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Atividades</CardTitle>
                <CardDescription>Veja como você ganhou seus pontos.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {pointHistory.map((activity) => (
                    <li key={activity.id} className="flex items-center justify-between pb-4 border-b last:border-0">
                      <div>
                        <p className="font-medium">{activity.description}</p>
                        <p className="text-sm text-muted-foreground">{new Date(activity.date).toLocaleDateString('pt-BR')}</p>
                      </div>
                      <span className="font-bold text-green-500">+{activity.points} pts</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
}
