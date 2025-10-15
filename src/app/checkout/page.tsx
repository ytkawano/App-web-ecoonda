'use client';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { CreditCard, Lock } from 'lucide-react';
import Image from 'next/image';
import { useAuth, useFirestore } from '@/firebase';
import { useEffect, useState } from 'react';
import { placeholderImages } from '@/lib/data';
import { collection, doc, writeBatch, serverTimestamp, increment, arrayUnion } from 'firebase/firestore';
import { FirestorePermissionError } from '@/firebase/errors';
import { errorEmitter } from '@/firebase/error-emitter';
import type { Order } from '@/lib/types';

const imageMap = placeholderImages.reduce((acc, img) => {
  acc[img.id] = img.imageUrl;
  return acc;
}, {} as Record<string, string>);

export default function CheckoutPage() {
  const { cart, totalPrice, subtotal, coupon, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const firestore = useFirestore();
  const [isProcessing, setIsProcessing] = useState(false);


  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!authLoading && cart.length === 0) {
      router.push('/');
    }
  }, [cart, authLoading, router]);

  if (authLoading || !user) {
    return <div className="flex h-screen items-center justify-center">Carregando...</div>;
  }

  if (cart.length === 0) {
    return <div className="flex h-screen items-center justify-center">Seu carrinho está vazio. Redirecionando...</div>;
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore || !user) return;

    setIsProcessing(true);

    const batch = writeBatch(firestore);

    // 1. Criar o novo pedido
    const orderRef = doc(collection(firestore, 'orders'));
    const orderData: Omit<Order, 'id' | 'createdAt'> & { createdAt: any } = {
        userId: user.uid,
        createdAt: serverTimestamp(),
        status: 'Em Processamento',
        total: totalPrice,
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
        })),
    };
    batch.set(orderRef, orderData);

    // 2. Atualizar o perfil do usuário com EcoPoints e histórico de compras
    const userRef = doc(firestore, 'users', user.uid);
    const pointsToAward = Math.round(totalPrice);
    const productIds = cart.map(item => item.id);
    
    const userUpdateData = {
        ecoPoints: increment(pointsToAward),
        purchaseHistory: arrayUnion(...productIds)
    };
    batch.update(userRef, userUpdateData);

    batch.commit()
      .then(() => {
        clearCart();
        toast({
          title: 'Pagamento Aprovado!',
          description: `Seu pedido foi realizado e você ganhou ${pointsToAward} EcoPoints!`,
        });
        router.push('/orders');
      })
      .catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: `BATCH WRITE: orders/${orderRef.id} and users/${user.uid}`,
            operation: 'write',
            requestResourceData: {order: orderData, userUpdate: userUpdateData},
        });
        errorEmitter.emit('permission-error', permissionError);
        
        toast({
            variant: 'destructive',
            title: 'Erro no Pedido',
            description: 'Não foi possível registrar seu pedido. Tente novamente.',
        });
      }).finally(() => {
          setIsProcessing(false);
      });
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="text-center mb-12">
         <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
          Finalizar Compra
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <CreditCard />
                Detalhes do Pagamento
              </CardTitle>
            </CardHeader>
            <form onSubmit={handlePayment}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Número do Cartão</Label>
                  <Input id="cardNumber" placeholder="0000 0000 0000 0000" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardName">Nome no Cartão</Label>
                  <Input id="cardName" placeholder="Nome como aparece no cartão" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Validade</Label>
                    <Input id="expiryDate" placeholder="MM/AA" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" required />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col items-stretch gap-4">
                <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
                  <Lock className="mr-2 h-4 w-4" />
                  {isProcessing ? 'Processando...' : `Pagar R$${totalPrice.toFixed(2).replace('.', ',')}`}
                </Button>
                <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
                    <Lock className="h-3 w-3"/> Pagamento seguro e criptografado.
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>

        <div className='order-first lg:order-last'>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="max-h-64 overflow-y-auto pr-2 space-y-4">
                {cart.map(item => {
                  const imageUrl = imageMap[item.imageId] || '/placeholder.jpg';
                  return (
                    <div key={item.id} className="flex items-center gap-4">
                       <div className="relative h-16 w-16 overflow-hidden rounded-md">
                          <Image
                            src={imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qtd: {item.quantity}</p>
                      </div>
                      <p className="text-sm">R${(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                    </div>
                  );
                })}
              </div>
              <Separator />
              <div className="space-y-2">
                 <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>R${subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                 {coupon && (
                  <div className="flex justify-between items-center text-accent text-sm">
                    <span>Cupom ({coupon.code})</span>
                    <span>-R${(subtotal - totalPrice).toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span>Frete</span>
                  <span>Grátis</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>R${totalPrice.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
