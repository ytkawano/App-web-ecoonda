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

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  if (cart.length === 0) {
    // Redirect to home if cart is empty, maybe show a toast
    if (typeof window !== 'undefined') {
        router.push('/');
    }
    return null; // Render nothing while redirecting
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    console.log('Processing payment...');

    // Clear cart and show success message
    clearCart();
    toast({
      title: 'Pagamento Aprovado!',
      description: 'Seu pedido foi realizado com sucesso. Obrigado por sua compra!',
    });

    // Redirect to home page
    router.push('/');
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="text-center mb-12">
         <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
          Finalizar Compra
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Payment Details Form */}
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
                <Button type="submit" size="lg" className="w-full">
                  <Lock className="mr-2 h-4 w-4" />
                  Pagar R${totalPrice.toFixed(2).replace('.', ',')}
                </Button>
                <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
                    <Lock className="h-3 w-3"/> Pagamento seguro e criptografado.
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>

        {/* Order Summary */}
        <div className='order-first lg:order-last'>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="max-h-64 overflow-y-auto pr-2 space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-4">
                     <div className="relative h-16 w-16 overflow-hidden rounded-md">
                        <Image
                          src={`https://picsum.photos/seed/${item.imageId.split('-')[1]}/100/100`}
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
                ))}
              </div>
              <Separator />
              <div className="space-y-2">
                 <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>R${totalPrice.toFixed(2).replace('.', ',')}</span>
                </div>
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
