'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Salvando...');

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      const userPhoto = user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`;
      setPhotoURL(userPhoto);
      setImagePreview(userPhoto);
      
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    let newPhotoURL = photoURL;

    try {
      // 1. Upload new image if there is one
      if (imageFile) {
        setLoadingMessage('Enviando imagem...');
        const storageRef = ref(storage, `profile-pictures/${user.uid}/${imageFile.name}`);
        const uploadResult = await uploadBytes(storageRef, imageFile);
        newPhotoURL = await getDownloadURL(uploadResult.ref);
      }

      // 2. Update Firebase Auth profile
      setLoadingMessage('Atualizando perfil...');
      await updateProfile(user, { 
          displayName, 
          photoURL: newPhotoURL 
      });

      // 3. Update address in Firestore
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
      setLoadingMessage('Salvando...');
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
                 {imagePreview && <img
                    src={imagePreview}
                    alt="Pré-visualização da foto de perfil"
                    className="h-32 w-32 rounded-full border-4 border-primary object-cover"
                />}
                <div className="w-full space-y-2">
                    <Label htmlFor="photoFile">Foto de Perfil</Label>
                    <Input
                        id="photoFile"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
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
              {loading ? loadingMessage : 'Salvar Alterações'}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
