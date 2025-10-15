'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setPhotoURL(user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`);
      
      const fetchUserData = async () => {
          const userDocRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
              setAddress(docSnap.data().address || '');
          }
      };
      fetchUserData();
    }
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      // Update Firebase Auth profile
      await updateProfile(user, { displayName, photoURL });

      // Update address in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, { address }, { merge: true });

      toast({
        title: 'Perfil Atualizado!',
        description: 'Suas informações foram salvas com sucesso.',
      });
      // A small delay to let the user read the toast before redirecting
      setTimeout(() => router.push('/account'), 1000); 
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: 'destructive',
        title: 'Erro ao atualizar',
        description: 'Não foi possível salvar suas informações. Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return <div className="flex h-screen items-center justify-center">Carregando...</div>;
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        Por favor, faça login para editar seu perfil.
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Editar Perfil</CardTitle>
          <CardDescription>Atualize suas informações pessoais abaixo.</CardDescription>
        </CardHeader>
        <form onSubmit={handleProfileUpdate}>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
                 <img
                    src={photoURL || `https://i.pravatar.cc/150?u=${user.uid}`}
                    alt="Foto do Perfil"
                    className="h-32 w-32 rounded-full border-4 border-primary object-cover"
                />
                <div className="w-full space-y-2">
                    <Label htmlFor="photoURL">URL da Foto de Perfil</Label>
                    <Input
                        id="photoURL"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        placeholder="https://exemplo.com/sua-foto.jpg"
                    />
                </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayName">Nome Completo</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </div>
             <div className="space-y-2">
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Rua, número, bairro, cidade, estado"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail (não pode ser alterado)</Label>
              <Input id="email" value={user.email || ''} disabled />
            </div>

             <Button type="submit" disabled={loading} className="w-full">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
