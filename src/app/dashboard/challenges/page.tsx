import EcoChallenges from "@/components/dashboard/EcoChallenges";
import { challenges } from "@/lib/data";

export default function ChallengesPage() {
    return (
        <div>
            <h1 className="mb-6 font-headline text-4xl font-bold text-primary">
                Eco Challenges
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
                Join our community in making a bigger impact. Complete challenges to earn points and exclusive badges.
            </p>
            <EcoChallenges challenges={challenges} />
        </div>
    );
}
