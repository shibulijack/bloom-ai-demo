import SiteHeader from '@/components/layout/site-header';

export default function SettingsPage() {
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="mt-2 text-gray-600">Manage your account preferences and settings.</p>
        <div className="mt-8">
          <p className="text-sm text-gray-500">Settings panel coming soon.</p>
        </div>
      </main>
    </div>
  );
}