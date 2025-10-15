'use client';

import OrderHistory from "@/components/dashboard/OrderHistory";

export default function OrderHistoryPage() {
  
  return (
    <div className="container mx-auto px-4 py-12">
       <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl mb-12">
          Meus Pedidos
        </h1>

        <OrderHistory />
    </div>
  );
}
