import Link from 'next/link';
import { ReactNode } from 'react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl?: string | null;
  children?: ReactNode; // slot for actions like add-to-cart later
}

export function ProductCard({ id, name, price, imageUrl, children }: ProductCardProps) {
  return (
    <div className="group rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden flex flex-col">
  {/* Route groups like (storefront) are implementation details; user-facing paths should be clean */}
  <Link href={`/products/${id}`} className="block overflow-hidden aspect-[4/3] bg-gray-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl || 'https://placehold.co/600x400?text=Flower'}
          alt={name}
          className="h-full w-full object-cover group-hover:scale-105 transition"
          loading="lazy"
        />
      </Link>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-medium text-gray-900 line-clamp-1">
          <Link href={`/products/${id}`}>{name}</Link>
        </h3>
        <p className="mt-1 text-sm text-gray-600">${price.toFixed(2)}</p>
        {children && <div className="mt-3">{children}</div>}
      </div>
    </div>
  );
}