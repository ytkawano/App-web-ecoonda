import EcoChallenges from "@/components/dashboard/EcoChallenges";
import { challenges } from "@/lib/data";

export default function ChallengesPage() {
    return (
        <div>
            <h1 className="mb-6 font-headline text-4xl font-bold text-primary">
                Desafios Ecológicos
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
                Junte-se à nossa comunidade para causar um impacto maior. Complete desafios para ganhar pontos e emblemas exclusivos.
            </p>
            <EcoChallenges challenges={challenges} />
        </div>
    );
}
