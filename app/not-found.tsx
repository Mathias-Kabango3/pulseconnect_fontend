"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Custom404() {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back(); // Go back to previous page if history exists
    } else {
      router.push("/"); // Fallback to home if no history
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100 px-4">
      <motion.h1
        className="text-7xl font-bold text-gray-900"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}>
        404
      </motion.h1>
      <motion.p
        className="mt-4 text-lg text-gray-600"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}>
        Oops! The page you are looking for does not exist.
      </motion.p>
      <motion.button
        onClick={handleGoBack}
        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white shadow-lg transition-all hover:bg-blue-700"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}>
        Go Back
      </motion.button>
    </div>
  );
}
