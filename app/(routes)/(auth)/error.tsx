"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("An unexpected error occurred:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-6">
      <h1 className="text-3xl font-bold text-red-600">
        Oops! Something went wrong.
      </h1>
      <p className="text-lg mt-2 text-gray-700">
        We encountered an unexpected error.
      </p>

      <pre className="mt-4 bg-gray-200 p-3 rounded-md text-sm text-gray-800 max-w-md overflow-auto">
        {error.message}
      </pre>

      <div className="mt-6 flex gap-4">
        {/* Retry button to reload the same page */}
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Try Again
        </button>

        {/* Go Home button */}
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
          Go Home
        </button>
      </div>
    </div>
  );
}
