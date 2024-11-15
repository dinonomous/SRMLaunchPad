import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">🚧</h1>
      <h2 className="text-4xl font-semibold text-gray-700 mt-4">Page Under Construction</h2>
      <p className="text-lg text-gray-500 mt-2">
        Oops! The page you're looking for is not available yet.
      </p>
      <Link href="/" passHref>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
          Back to Home
        </button>
      </Link>
    </div>
  );
}
