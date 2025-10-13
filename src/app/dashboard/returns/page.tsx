import EcoReturn from "@/components/dashboard/EcoReturn";

export default function ReturnsPage() {
    return (
        <div>
            <h1 className="mb-6 font-headline text-4xl font-bold text-primary">
                Sistema EcoReturn
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
                Participe da nossa economia circular. Devolva suas embalagens vazias da ECOONDA para ganhar pontos e nos ajudar a reduzir o desperdício.
            </p>
            <EcoReturn />
        </div>
    );
}
