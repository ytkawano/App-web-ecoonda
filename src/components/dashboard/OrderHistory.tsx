'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { useAuth, useFirestore } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Order, OrderItem } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';

export default function OrderHistory() {
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
        <Card>
            <CardHeader>
                <CardTitle>Histórico de Pedidos</CardTitle>
                <CardDescription>Seus pedidos recentes.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                </div>
            </CardContent>
      </Card>
    )
  }

  return (
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
              <div key={order.id} className="rounded-lg border p-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="font-semibold">Pedido #{order.id.substring(0, 7)}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt as Date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <Badge variant={order.status === 'Enviado' ? 'default' : 'secondary'}>{order.status}</Badge>
                </div>

                <Accordion type="single" collapsible>
                  <AccordionItem value={`item-${order.id}`}>
                    <AccordionTrigger>Ver detalhes do pedido</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        {order.items.map((item: OrderItem, index: number) => (
                          <div key={index} className="flex justify-between">
                            <p>{item.name} (x{item.quantity})</p>
                            <p>R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                          </div>
                        ))}
                        <div className="flex justify-between font-bold text-lg border-t pt-4 mt-4">
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
  );
}
