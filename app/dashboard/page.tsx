import { Navbar } from "@/components/Navbar";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-semibold">Welcome to CalorieAI!</h1>
        <p className="text-gray-600 mt-2">
          Track your meals, shop gym gear, and manage your health.
        </p>
      </div>
    </main>
  );
}
