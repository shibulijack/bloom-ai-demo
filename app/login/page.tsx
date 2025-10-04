import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { signIn } from '@/lib/auth';
import SiteHeader from '@/components/layout/site-header';

export default async function LoginPage() {
  const session = await auth();
  if (session?.user?.id) {
    redirect('/');
  }
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-md px-4 py-16">
        <h1 className="text-3xl font-bold tracking-tight">Sign In</h1>
        <p className="mt-2 text-gray-600 text-sm">Use Google to continue.</p>
        <form
          action={async () => {
            'use server';
            await signIn('google');
          }}
          className="mt-8"
        >
          <button
            type="submit"
            className="w-full rounded bg-blue-600 hover:bg-blue-700 text-white py-2.5 text-sm font-medium shadow"
          >
            Continue with Google
          </button>
        </form>
      </main>
    </div>
  );
}
