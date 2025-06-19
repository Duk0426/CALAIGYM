import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedWrapper } from "@/components/AnimatedWrapper";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 text-gray-900">
      <Navbar />
      <AnimatedWrapper>
        <section className="max-w-3xl mx-auto p-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to CalorieAI 🧠🍽️</h1>
          <p className="mb-6 text-lg">
            Scan your food, track your calories, and shop gym supplements—all in
            one app.
          </p>
          <Link
            href="/dashboard"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </section>
      </AnimatedWrapper>
      <Footer />
    </main>
  );
}
