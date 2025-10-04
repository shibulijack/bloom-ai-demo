import Link from 'next/link';
import { auth, signIn, signOut } from '@/lib/auth';

const SiteHeader = async () => {
  const session = await auth();

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">Bloom AI</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link href="/" className="hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-gray-300">Products</Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-gray-300">Cart</Link>
            </li>
            {session?.user && (
              <>
                <li>
                  <Link href="/orders" className="hover:text-gray-300">Orders</Link>
                </li>
                <li>
                  <Link href="/settings" className="hover:text-gray-300">Settings</Link>
                </li>
              </>
            )}
            <li>
              {session?.user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-300">
                    Hello, {session.user.name?.split(' ')[0] || session.user.email}
                  </span>
                  <form
                    action={async () => {
                      'use server';
                      await signOut();
                    }}
                  >
                    <button
                      type="submit"
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm font-medium"
                    >
                      Sign Out
                    </button>
                  </form>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm font-medium"
                >
                  Sign In
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;