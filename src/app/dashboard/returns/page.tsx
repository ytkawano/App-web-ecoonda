import EcoReturn from "@/components/dashboard/EcoReturn";

export default function ReturnsPage() {
    return (
        <div>
            <h1 className="mb-6 font-headline text-4xl font-bold text-primary">
                EcoReturn System
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
                Join our circular economy. Return your empty ECOONDA packaging to earn points and help us reduce waste.
            </p>
            <EcoReturn />
        </div>
    );
}
