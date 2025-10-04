import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import SiteHeader from '@/components/layout/site-header';

// Lazy-load client AddToCartForm (client component) to keep page mostly server rendered
const AddToCartForm = dynamic(() => import('@/components/forms/add-to-cart-form'), { ssr: false });

interface ProductPageProps { params: { id: string } }

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  const imageUrl = (product as any).imageUrl as string | null;

  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-10 grid gap-8 md:grid-cols-2">
        <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-50 border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl || 'https://placehold.co/800x600?text=Flower'}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
          <p className="mt-3 text-gray-700 whitespace-pre-line">{product.description}</p>
          <p className="mt-6 text-2xl font-semibold">${product.price.toFixed(2)}</p>
          <div className="mt-8">
            <AddToCartForm productId={product.id} />
          </div>
        </div>
      </main>
    </div>
  );
}