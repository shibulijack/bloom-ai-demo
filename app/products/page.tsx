import { ProductCard } from '@/components/products/product-card';
import { prisma } from '@/lib/prisma';

export const revalidate = 60; // revalidate product list every minute

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { name: 'asc' },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Products</h1>
      <p className="mt-2 text-gray-600">Explore our curated floral selections.</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p: typeof products[number]) => (
          <ProductCard
            key={p.id}
            id={p.id}
            name={p.name}
            price={p.price}
            imageUrl={(p as any).imageUrl}
          />
        ))}
        {products.length === 0 && (
          <p className="col-span-full text-sm text-gray-500">No products available.</p>
        )}
      </div>
    </div>
  );
}