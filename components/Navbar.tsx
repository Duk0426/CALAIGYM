import Link from "next/link";

export function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between p-4 bg-gray-900 text-white shadow-md">
      <h1 className="text-xl font-bold">CalorieAI</h1>
      <div className="space-x-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/scanner">Scanner</Link>
        <Link href="/dashboard/shop">Shop</Link>
        <Link href="/dashboard/profile">Profile</Link>
      </div>
    </nav>
  );
}
