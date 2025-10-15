'use client';

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// TODO: Substituir por dados reais do Firestore
const ecoPointsData = {
  balance: 750,
  recentActivities: [
    { description: "Compra do pedido #001", points: 50, date: "2024-10-10" },
    { description: "Reciclagem de embalagem", points: 20, date: "2024-10-08" },
    { description: "Bônus de aniversário", points: 100, date: "2024-09-22" },
  ],
};

export default function EcoPoints() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Meus EcoPontos</CardTitle>
        <CardDescription>
          Acompanhe e use seus pontos para obter benefícios exclusivos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
            <p className="text-5xl font-bold text-primary">{ecoPointsData.balance}</p>
            <p className="text-muted-foreground">Pontos disponíveis</p>
        </div>

        <div className="space-y-4">
            <h3 className="font-semibold">Atividades Recentes</h3>
            <div className="space-y-3">
            {ecoPointsData.recentActivities.map((activity, index) => {
                const activityDate = new Date(activity.date);
                const formattedDate = activityDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });

                return (
                    <div key={index} className="flex justify-between items-center">
                        <div>
                            <p>{activity.description}</p>
                            <p className="text-sm text-muted-foreground">{formattedDate}</p>
                        </div>
                        <Badge variant="secondary">+{activity.points} pts</Badge>
                    </div>
                );
            })}
            </div>
            <Link href="/rewards" passHref>
              <Button className="mt-6 w-full sm:w-auto">Ver todas as recompensas</Button>
            </Link>
        </div>
      </CardContent>
    </Card>
  );
}
