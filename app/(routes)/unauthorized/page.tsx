"use client"; // Required for Framer Motion animations

import { motion } from "framer-motion";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }} // Initial animation state
        animate={{ opacity: 1, y: 0 }} // Animate to this state
        transition={{ duration: 0.5 }} // Animation duration
        className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full mx-4">
        <motion.h1
          initial={{ scale: 0.9 }} // Initial animation state
          animate={{ scale: 1 }} // Animate to this state
          transition={{ delay: 0.2, duration: 0.5 }} // Animation delay and duration
          className="text-4xl font-bold text-gray-800 mb-4">
          Unauthorized
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} // Initial animation state
          animate={{ opacity: 1 }} // Animate to this state
          transition={{ delay: 0.4, duration: 0.5 }} // Animation delay and duration
          className="text-gray-600 mb-6">
          You do not have permission to access this page.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }} // Initial animation state
          animate={{ opacity: 1 }} // Animate to this state
          transition={{ delay: 0.6, duration: 0.5 }} // Animation delay and duration
        >
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
            Go Back Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
