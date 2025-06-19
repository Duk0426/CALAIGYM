import { Navbar } from "@/components/Navbar";
import { isAdmin } from "@/lib/auth";

export default async function AdminUsersPage() {
  try {
    const admin = await isAdmin();
    if (!admin) return <div className="p-6">You are not authorized.</div>;

    return (
      <main className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="p-6">
          <h2 className="text-2xl font-bold">Admin - User List</h2>
          <p className="mt-2 text-gray-600">(User management UI coming soon)</p>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error checking admin status:", error);
    return <div className="p-6 text-red-600">Something went wrong.</div>;
  }
}
