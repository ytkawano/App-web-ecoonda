'use client';

import { useEffect, useState } from 'react';
import EcoChallenges from "@/components/dashboard/EcoChallenges";
import { challenges as allChallenges } from "@/lib/data";
import { useAuth, useFirestore } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import type { UserProfile, Challenge } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';


export default function ChallengesPage() {
    const { user, loading: authLoading } = useAuth();
    const firestore = useFirestore();
    const [userChallenges, setUserChallenges] = useState<Challenge[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProgress = async () => {
            if (user && firestore) {
                const userDocRef = doc(firestore, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);
                const userData = userDoc.data() as UserProfile;

                // This is a simplified example. In a real app, challenge progress
                // would be stored and retrieved per user. For now, we'll merge
                // static challenge data with some mock progress.
                const challengesWithProgress = allChallenges.map(challenge => {
                    // Mock progress for demonstration
                    if (userData?.earnedBadges?.includes(challenge.badge)) {
                        return { ...challenge, progress: 100 };
                    }
                    return challenge;
                });
                setUserChallenges(challengesWithProgress);
            }
            setLoading(false);
        };

        if(!authLoading){
            fetchUserProgress();
        }

    }, [user, authLoading, firestore]);

    return (
        <div>
            <h1 className="mb-6 font-headline text-4xl font-bold text-primary">
                Desafios Ecológicos
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
                Junte-se à nossa comunidade para causar um impacto maior. Complete desafios para ganhar pontos e emblemas exclusivos.
            </p>
            {loading || authLoading ? (
                <div className='space-y-4'>
                    <Skeleton className='h-32 w-full' />
                    <Skeleton className='h-32 w-full' />
                    <Skeleton className='h-32 w-full' />
                </div>
            ) : (
                <EcoChallenges challenges={userChallenges} />
            )}
        </div>
    );
}
