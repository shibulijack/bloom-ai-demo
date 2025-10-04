"use client";

import { useState, useTransition } from 'react';

import { addToCart } from '@/app/_actions/add-to-cart';

interface AddToCartFormProps {
  productId: string;
}

export default function AddToCartForm({ productId }: AddToCartFormProps) {
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    startTransition(async () => {
      const res = await addToCart(productId, quantity);
      if (!res.ok) {
        if (res.error === 'UNAUTHENTICATED') {
          // Optional: redirect to sign-in
          setError('Please sign in to add items to your cart.');
        } else if (res.error === 'PRODUCT_NOT_FOUND') {
          setError('Product no longer exists.');
        } else if (res.error === 'INVALID_QUANTITY') {
          setError('Quantity must be between 1 and 50.');
        } else {
          setError('Something went wrong.');
        }
        return;
      }
      setSuccess(true);
      setQuantity(1);
      setTimeout(() => setSuccess(false), 2500);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        min="1"
        className="border rounded p-2 w-16"
      />
      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded px-4 py-2 text-sm font-medium"
      >
        {isPending ? 'Adding...' : 'Add to Cart'}
      </button>
      {error && <span className="text-xs text-red-600 ml-2">{error}</span>}
      {success && !error && <span className="text-xs text-green-600 ml-2">Added!</span>}
    </form>
  );
}