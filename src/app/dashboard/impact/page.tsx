import ImpactTracker from '@/components/dashboard/ImpactTracker';
import { userImpact, impactBadges } from '@/lib/data';

export default function ImpactPage() {
  return (
    <div>
      <h1 className="mb-6 font-headline text-4xl font-bold text-primary">
        Your Eco Impact
      </h1>
      <p className="mb-8 text-lg text-muted-foreground">
        See the difference you're making. Every sustainable choice contributes to a healthier planet.
      </p>
      <ImpactTracker userImpact={userImpact} badges={impactBadges} />
    </div>
  );
}
