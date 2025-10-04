import { auth } from '@/lib/auth';

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    return <p>Please log in to access your settings.</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Account Settings</h1>
      <p>Manage your account settings here.</p>
      {/* Additional settings form or components can be added here */}
    </div>
  );
}