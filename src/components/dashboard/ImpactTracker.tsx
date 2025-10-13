'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { UserImpact, ImpactBadge } from '@/lib/types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Tooltip as ShadTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ImpactTrackerProps {
  userImpact: UserImpact;
  badges: ImpactBadge[];
}

const monthlyData = [
  { month: 'Jan', plastic: 150, co2: 0.5 },
  { month: 'Fev', plastic: 200, co2: 0.7 },
  { month: 'Mar', plastic: 180, co2: 0.6 },
  { month: 'Abr', plastic: 250, co2: 0.8 },
  { month: 'Mai', plastic: 300, co2: 1.1 },
  { month: 'Jun', plastic: 280, co2: 1.0 },
];

const pieData = [
    { name: 'Plástico Economizado (g)', value: 1250 },
    { name: 'Devoluções Feitas', value: 12 },
  ];
  
const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))'];

export default function ImpactTracker({ userImpact, badges }: ImpactTrackerProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Plástico Economizado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {userImpact.plasticSaved.toLocaleString()}g
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              CO₂ Evitado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{userImpact.co2Avoided} kg</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Eco Pontos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {userImpact.pointsEarned.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Devoluções Feitas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{userImpact.returnsMade}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Progresso Mensal</CardTitle>
          <CardDescription>Sua economia de plástico e CO₂ nos últimos 6 meses.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                  }}
                />
                <Bar yAxisId="left" dataKey="plastic" name="Plástico (g)" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="co2" name="CO₂ (kg)" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Seus Emblemas</CardTitle>
          <CardDescription>Comemore seus marcos de sustentabilidade.</CardDescription>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
            <div className="flex flex-wrap gap-6">
              {badges.map((badge, index) => (
                <ShadTooltip key={index}>
                  <TooltipTrigger>
                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent bg-accent/10">
                        <badge.icon className="h-8 w-8 text-accent" />
                      </div>
                      <span className="text-xs font-medium">{badge.name}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{badge.description}</p>
                  </TooltipContent>
                </ShadTooltip>
              ))}
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>
    </div>
  );
}
