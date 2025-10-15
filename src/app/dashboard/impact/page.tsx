'use client';

import { useState, useEffect } from 'react';
import ImpactTracker from '@/components/dashboard/ImpactTracker';
import { impactBadges as allImpactBadges } from '@/lib/data';
import { useAuth } from '@/firebase';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import type { UserProfile } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function ImpactPage() {
  const { user, loading: authLoading } = useAuth();
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
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
  }, [user, authLoading]);

  const userImpact = {
    plasticSaved: userData?.plasticSaved || 0,
    co2Avoided: userData?.co2Avoided || 0,
    pointsEarned: userData?.ecoPoints || 0,
    returnsMade: userData?.returnsMade || 0,
  };

  const earnedBadges = allImpactBadges.filter(badge => userData?.earnedBadges.includes(badge.name));

  return (
    <div>
      <h1 className="mb-6 font-headline text-4xl font-bold text-primary">
        Seu Impacto Ecológico
      </h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Veja a diferença que você está fazendo. Cada escolha sustentável contribui para um planeta mais saudável.
      </p>
      {loading || authLoading ? (
        <div className='space-y-4'>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Skeleton className='h-24 w-full'/>
                <Skeleton className='h-24 w-full'/>
                <Skeleton className='h-24 w-full'/>
                <Skeleton className='h-24 w-full'/>
            </div>
            <Skeleton className='h-64 w-full' />
            <Skeleton className='h-48 w-full' />
        </div>
      ) : (
        <ImpactTracker userImpact={userImpact} badges={earnedBadges} />
      )}
    </div>
  );
}
