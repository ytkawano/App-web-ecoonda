'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { useAuth, useFirestore } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import type { Order, OrderItem } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const firestore = useFirestore();

  useEffect(() => {
    async function fetchOrders() {
      if (authLoading) return;
      if (!user || !firestore) {
        setLoading(false);
        return;
      }

      try {
        const ordersQuery = query(
          collection(firestore, "orders"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(ordersQuery);
        const userOrders = querySnapshot.docs.map(doc => {
            const data = doc.data();
            // Convert Firestore Timestamp to JavaScript Date object
            const createdAtDate = (data.createdAt as Timestamp)?.toDate ? (data.createdAt as Timestamp).toDate() : new Date();
            return {
                id: doc.id,
                ...data,
                createdAt: createdAtDate,
            } as Order;
        });
        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [user, authLoading, firestore]);

  if (loading || authLoading) {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl mb-12">
                Meus Pedidos
            </h1>
            <div className="space-y-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
            </div>
        </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl mb-4">
            Meus Pedidos
        </h1>
        <p>Por favor, faça login para ver seu histórico de pedidos.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
       <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl mb-12">
          Meus Pedidos
        </h1>

        <Card>
            <CardHeader>
                <CardTitle>Histórico de Pedidos</CardTitle>
                <CardDescription>Aqui está a lista de seus pedidos recentes.</CardDescription>
            </CardHeader>
            <CardContent>
                {orders.length === 0 ? (
                <p className="text-muted-foreground">Você ainda não fez nenhum pedido.</p>
                ) : (
                <div className="space-y-6">
                    {orders.map((order: Order) => (
                    <div key={order.id} className="rounded-lg border p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                            <div className="mb-4 sm:mb-0">
                                <h3 className="font-semibold text-lg">Pedido #{order.id.substring(0, 7)}...</h3>
                                <p className="text-sm text-muted-foreground">
                                {new Date(order.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                                </p>
                            </div>
                            <div className="flex flex-col sm:items-end gap-2">
                                <Badge variant={order.status === 'Entregue' ? 'default' : 'secondary'}>{order.status}</Badge>
                                <p className="font-bold text-lg">R$ {order.total.toFixed(2).replace('.', ',')}</p>
                            </div>
                        </div>

                        <Accordion type="single" collapsible>
                        <AccordionItem value={`item-${order.id}`}>
                            <AccordionTrigger>Ver detalhes do pedido</AccordionTrigger>
                            <AccordionContent>
                            <div className="space-y-4 pt-4">
                                {order.items.map((item: OrderItem, index: number) => (
                                <div key={index} className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-muted-foreground">Qtd: {item.quantity}</p>
                                    </div>
                                    <p className="text-sm font-medium">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                                </div>
                                ))}
                                <Separator className="my-4"/>
                                <div className="flex justify-between font-bold text-lg">
                                <p>Total</p>
                                <p>R$ {order.total.toFixed(2).replace('.', ',')}</p>
                                </div>
                            </div>
                            </AccordionContent>
                        </AccordionItem>
                        </Accordion>
                    </div>
                    ))}
                </div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
