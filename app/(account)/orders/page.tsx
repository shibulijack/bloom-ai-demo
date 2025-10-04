import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

// Placeholder OrderList component until implemented
function OrderList({ orders }: { orders: { id: string }[] }) {
  return (
    <ul>
      {orders.map(o => (
        <li key={o.id}>{o.id}</li>
      ))}
    </ul>
  );
}

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user?.id) return redirect('/login');
  const orders = await prisma.order.findMany({ where: { userId: session.user.id } });
  return <OrderList orders={orders} />;
}