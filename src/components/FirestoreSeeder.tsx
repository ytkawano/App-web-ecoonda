'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { db } from '@/lib/firebase';
import { products } from '@/lib/products';
import { collection, writeBatch } from 'firebase/firestore';
import { useState } from 'react';

export default function FirestoreSeeder() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSeed = async () => {
    setLoading(true);
    toast({
      title: 'Iniciando o processo de seed...',
      description: 'Adicionando produtos ao seu banco de dados. Isso pode levar um momento.',
    });

    try {
      const productsCollection = collection(db, 'products');
      const batch = writeBatch(db);

      products.forEach(product => {
        const docRef = product.id ? collection(db, 'products', product.id) : collection(db, 'products').doc();
        batch.set(docRef, product);
      });

      await batch.commit();

      toast({
        title: 'Produtos Adicionados!',
        description: `${products.length} produtos foram adicionados com sucesso ao Firestore.`,
      });
    } catch (error) {
      console.error('Error seeding Firestore:', error);
      toast({
        variant: 'destructive',
        title: 'Erro no Seed',
        description: 'Não foi possível adicionar os produtos. Verifique o console para mais detalhes.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Only show this component in development environment
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-[100]">
        <div className="bg-card border shadow-lg rounded-lg p-4 max-w-sm">
            <h4 className="font-bold text-lg mb-2">DB Seeder (Dev Only)</h4>
            <p className="text-sm text-muted-foreground mb-4">Clique para popular a coleção 'products' no seu Firestore com dados de exemplo.</p>
            <Button onClick={handleSeed} disabled={loading} className="w-full">
                {loading ? 'Adicionando...' : 'Adicionar Produtos ao Firestore'}
            </Button>
        </div>
    </div>
  );
}
