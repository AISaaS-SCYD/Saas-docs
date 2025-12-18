import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-6xl font-bold mb-6">
          Welcome to SaaS Documentation
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Comprehensive knowledge base and documentation for our SaaS platform
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/docs"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/docs/api"
            className="rounded-lg border border-gray-300 dark:border-gray-700 px-6 py-3 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            API Reference
          </Link>
        </div>
      </div>
    </main>
  );
}
