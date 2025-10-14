'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Trash2 } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
          Seu Carrinho
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {totalItems > 0
            ? `Você tem ${totalItems} ${totalItems === 1 ? 'item' : 'itens'} no seu carrinho.`
            : 'Seu carrinho está vazio.'}
        </p>
      </div>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-start gap-6">
                  <div className="relative h-24 w-24 overflow-hidden rounded-md">
                    <Image
                      src={`https://picsum.photos/seed/${item.imageId.split('-')[1]}/200/200`}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <Link href={`/products/${item.id}`}>
                      <h3 className="font-headline text-lg font-semibold hover:underline">{item.name}</h3>
                    </Link>
                    <p className="text-muted-foreground">R${item.price.toFixed(2).replace('.', ',')}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                        className="h-9 w-16"
                      />
                      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remover</span>
                      </Button>
                    </div>
                  </div>
                  <p className="font-semibold">
                    R${(item.price * item.quantity).toFixed(2).replace('.', ',')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>R${totalPrice.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete</span>
                  <span>Grátis</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>R${totalPrice.toFixed(2).replace('.', ',')}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full" asChild>
                  <Link href="/checkout">Finalizar Compra</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted bg-card p-12 text-center">
          <ShoppingCart className="h-16 w-16 text-muted-foreground" />
          <h3 className="mt-6 font-headline text-2xl font-semibold">
            Seu carrinho está vazio
          </h3>
          <p className="mt-2 text-muted-foreground">
            Parece que você ainda não adicionou nenhum produto.
          </p>
          <Button asChild className="mt-6">
            <Link href="/shop">Começar a comprar</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
