import Link from 'next/link';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const revalidate = 0; // Always fresh

export default async function CartPage() {
  const session = await auth();
  if (!session) return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold mb-4">Cart</h1>
      <p>Please log in to view your cart.</p>
    </div>
  );

  if (!session.user?.id) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold mb-4">Cart</h1>
        <p>User session invalid. Please sign in again.</p>
      </div>
    );
  }

  const cartItems = await prisma.cartItem.findMany({
    where: { userId: session.user.id },
    include: { product: true },
  });
  type CartItemWithProduct = typeof cartItems[number];
  const subtotal = cartItems.reduce((sum: number, item: CartItemWithProduct) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="mt-6 text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            {cartItems.map((item: CartItemWithProduct) => (
              <div key={item.id} className="flex items-start justify-between border-b pb-4">
                <div>
                  <p className="font-medium text-gray-900">{item.product.name}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    ${item.product.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="border rounded-lg p-6 h-max bg-white shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Summary</h2>
            <div className="flex justify-between text-sm mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-medium border-t pt-2">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button
              disabled={cartItems.length === 0}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded py-2 text-sm font-medium"
            >
              Proceed to Checkout
            </button>
            <p className="mt-4 text-xs text-gray-500">Checkout flow coming soon.</p>
          </div>
        </div>
      )}
      <div className="mt-8 text-sm">
        <Link href="/products" className="text-blue-600 hover:underline">Continue shopping →</Link>
      </div>
    </div>
  );
}