'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface AddToCartResult {
  ok: boolean;
  error?: string;
}

export async function addToCart(productId: string, qty: number): Promise<AddToCartResult> {
  try {
  const session = await auth();
    if (!session || !session.user?.id) {
      return { ok: false, error: 'UNAUTHENTICATED' };
    }

    // Basic validation
    if (!productId) return { ok: false, error: 'INVALID_PRODUCT' };
    const quantity = Number(qty);
    if (!Number.isFinite(quantity) || quantity <= 0 || quantity > 50) {
      return { ok: false, error: 'INVALID_QUANTITY' };
    }

    // Ensure product exists (avoid creating cart rows for deleted products)
    const exists = await prisma.product.findUnique({ where: { id: productId }, select: { id: true } });
    if (!exists) return { ok: false, error: 'PRODUCT_NOT_FOUND' };

    await prisma.cartItem.upsert({
      where: { userId_productId: { userId: session.user.id, productId } },
      update: { quantity: { increment: quantity } },
      create: { userId: session.user.id, productId, quantity }
    });

    revalidatePath('/cart');
    return { ok: true };
  } catch (e) {
    console.error('addToCart error', e);
    return { ok: false, error: 'INTERNAL_ERROR' };
  }
}