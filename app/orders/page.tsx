import SiteHeader from '@/components/layout/site-header';

export default function OrdersPage() {
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Your Orders</h1>
        <p className="mt-2 text-gray-600">View your order history and track current orders.</p>
        <div className="mt-8">
          <p className="text-sm text-gray-500">No orders found.</p>
        </div>
      </main>
    </div>
  );
}