'use client';

import ImpactTracker from '@/components/dashboard/ImpactTracker';
import { userImpact, impactBadges } from '@/lib/data';

export default function ImpactPage() {
  // TODO: Replace with real data from Firestore
  return (
    <div>
      <h1 className="mb-6 font-headline text-4xl font-bold text-primary">
        Seu Impacto Ecológico
      </h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Veja a diferença que você está fazendo. Cada escolha sustentável contribui para um planeta mais saudável.
      </p>
      <ImpactTracker userImpact={userImpact} badges={impactBadges} />
    </div>
  );
}
