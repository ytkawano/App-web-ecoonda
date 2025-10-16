'use client';

import { useState, useEffect } from 'react';
import { useAuth, useFirestore, useStorage } from '@/firebase';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { UserProfile } from '@/lib/types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';


export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const firestore = useFirestore();
  const storage = useStorage();
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [address, setAddress] = useState({
    street: '',
    number: '',
    city: '',
    state: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Salvando...');

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (user && firestore) {
      setDisplayName(user.displayName || '');
      const userPhoto = user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`;
      setPhotoURL(userPhoto);
      setImagePreview(userPhoto);
      
      const fetchUserData = async () => {
          const userDocRef = doc(firestore, 'users', user.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
              const userData = docSnap.data() as UserProfile;
              if (userData.address && typeof userData.address === 'object') {
                setAddress({
                    street: userData.address.street || '',
                    number: userData.address.number || '',
                    city: userData.address.city || '',
                    state: userData.address.state || '',
                });
              }
          }
      };
      fetchUserData();
    }
  }, [user, firestore]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({...prev, [name]: value}));
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !firestore || !storage) return;

    setLoading(true);
    let newPhotoURL = photoURL;

    try {
      // 1. Upload image if a new one is selected
      if (imageFile) {
        setLoadingMessage('Enviando imagem...');
        const storageRef = ref(storage, `profile-pictures/${user.uid}/${imageFile.name}`);
        const uploadResult = await uploadBytes(storageRef, imageFile);
        newPhotoURL = await getDownloadURL(uploadResult.ref);
        
        // Update state to show the new image immediately
        setPhotoURL(newPhotoURL);
        setImagePreview(newPhotoURL);
      }

      // 2. Update Firebase Auth profile
      setLoadingMessage('Atualizando perfil...');
      await updateProfile(user, {
        displayName,
        photoURL: newPhotoURL,
      });

      // 3. Prepare data for Firestore
      const userProfileData: Partial<UserProfile> = {
        uid: user.uid,
        email: user.email!,
        displayName: displayName,
        photoURL: newPhotoURL,
        address: address,
      };

      // 4. Save data to Firestore
      setLoadingMessage('Salvando dados...');
      const docRef = doc(firestore, 'users', user.uid);
      await setDoc(docRef, userProfileData, { merge: true });

      toast({
        title: 'Perfil Atualizado!',
        description: 'Suas informações foram salvas com sucesso.',
      });

      setTimeout(() => router.push('/account'), 1000);

    } catch (error: any) {
        console.error('Erro ao atualizar o perfil:', error);
        
        // Emit a contextual error if it's a permission issue with Firestore
        if (error.code && error.code.includes('permission-denied')) {
             const permissionError = new FirestorePermissionError({
                path: `users/${user.uid}`,
                operation: 'update',
                requestResourceData: { displayName, photoURL: newPhotoURL, address },
            });
            errorEmitter.emit('permission-error', permissionError);
        }

        toast({
            variant: 'destructive',
            title: 'Erro ao Atualizar',
            description: error.message || 'Não foi possível salvar suas alterações. Tente novamente.',
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
             
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="street">Rua</Label>
                <Input name="street" id="street" value={address.street} onChange={handleAddressChange} placeholder="Ex: Av. Paulista" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="number">Número</Label>
                <Input name="number" id="number" value={address.number} onChange={handleAddressChange} placeholder="Ex: 1000" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input name="city" id="city" value={address.city} onChange={handleAddressChange} placeholder="Ex: São Paulo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Input name="state" id="state" value={address.state} onChange={handleAddressChange} placeholder="Ex: SP" />
              </div>
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
