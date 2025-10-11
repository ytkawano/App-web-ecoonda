'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Challenge } from '@/lib/types';
import { Award, CheckCircle, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EcoChallengesProps {
  challenges: Challenge[];
}

export default function EcoChallenges({ challenges }: EcoChallengesProps) {
  return (
    <div className="space-y-6">
      {challenges.map((challenge) => {
        const isCompleted = challenge.progress >= 100;
        return (
          <Card key={challenge.id} className="flex flex-col sm:flex-row">
            <div className="flex flex-1 flex-col p-6">
              <CardHeader className="p-0">
                <CardTitle className="flex items-center gap-2">
                  {isCompleted ? (
                    <CheckCircle className="h-6 w-6 text-accent" />
                  ) : (
                    <Target className="h-6 w-6 text-primary" />
                  )}
                  <span className="font-headline">{challenge.title}</span>
                </CardTitle>
                <CardDescription className="pt-2">{challenge.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 p-0 pt-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Progress</span>
                  <span>{challenge.progress}%</span>
                </div>
                <Progress value={challenge.progress} className="mt-1" />
              </CardContent>
              <CardFooter className="mt-4 flex items-center justify-between p-0">
                <div className="flex items-center font-semibold text-accent">
                  <Award className="mr-2 h-5 w-5" />
                  <span>
                    {challenge.points} Points + {challenge.badge} Badge
                  </span>
                </div>
                {isCompleted && (
                  <Button variant="outline" disabled>
                    Completed
                  </Button>
                )}
              </CardFooter>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
