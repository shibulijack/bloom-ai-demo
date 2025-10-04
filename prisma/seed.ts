import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  // Clear existing data (order matters because of FK constraints)
  await prisma.cartItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  const products = [
    {
      name: 'Rose Bouquet',
      description: 'A classic bouquet of long-stem red roses symbolizing love and elegance.',
      price: 49.99,
      imageUrl: 'https://placehold.co/600x400?text=Roses'
    },
    {
      name: 'Lavender Bliss',
      description: 'Fragrant lavender stems perfect for calming spaces and relaxation.',
      price: 24.5,
      imageUrl: 'https://placehold.co/600x400?text=Lavender'
    },
    {
      name: 'Sunflower Radiance',
      description: 'Bright sunflowers bringing warmth and cheer to any room.',
      price: 29.0,
      imageUrl: 'https://placehold.co/600x400?text=Sunflowers'
    },
    {
      name: 'Orchid Elegance',
      description: 'Graceful white orchid arrangement for refined interiors.',
      price: 65.0,
      imageUrl: 'https://placehold.co/600x400?text=Orchid'
    },
    {
      name: 'Peony Charm',
      description: 'Soft pink peonies with lush petals and a delicate scent.',
      price: 54.75,
      imageUrl: 'https://placehold.co/600x400?text=Peonies'
    },
    {
      name: 'Wildflower Mix',
      description: 'A rustic assortment of seasonal wildflowers full of color.',
      price: 32.25,
      imageUrl: 'https://placehold.co/600x400?text=Wildflowers'
    },
    {
      name: 'Tulip Medley',
      description: 'Vibrant multi-color tulip collection celebrating spring.',
      price: 38.5,
      imageUrl: 'https://placehold.co/600x400?text=Tulips'
    }
  ];

  await prisma.product.createMany({ data: products });
  const count = await prisma.product.count();
  console.log(`Inserted ${count} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
