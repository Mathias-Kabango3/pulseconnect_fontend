"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import { registerAction } from "@/services/actions";
import { motion } from "framer-motion";
import Link from "next/link";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <motion.button
      type="submit"
      className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none transition-colors duration-300"
      disabled={pending}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}>
      {pending ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 flex items-center mx-auto text-white animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M12 2v4" />
          <path d="m16.2 7.8 2.9-2.9" />
          <path d="M18 12h4" />
          <path d="m16.2 16.2 2.9 2.9" />
          <path d="M12 18v4" />
          <path d="m4.9 19.1 2.9-2.9" />
          <path d="M2 12h4" />
          <path d="m4.9 4.9 2.9 2.9" />
        </svg>
      ) : (
        "Register"
      )}
    </motion.button>
  );
};

const RegisterForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (formData: FormData) => {
    const response = await registerAction(formData);
    if (response?.error) {
      setError(response.error);
    } else {
      setSuccess("Registration Successful!");
      setError(null);
      router.push("/login");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Register
      </h2>
      <form
        action={onSubmit}
        encType="multipart/form-data"
        className="space-y-6">
        {/* Error and Success Messages */}
        {error && (
          <motion.div
            className="p-3 bg-red-50 text-red-600 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}>
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            className="p-3 bg-green-50 text-green-600 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}>
            {success}
          </motion.div>
        )}

        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="John"
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Doe"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="example@mail.com"
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            name="gender"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="••••••"
            required
          />
        </div>

        {/* Profile Picture */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Picture
          </label>
          <div className="relative">
            <input
              type="file"
              name="image"
              className="opacity-0 absolute w-full h-full cursor-pointer"
              accept="image/*"
              onChange={handleFileChange}
            />
            <div className="w-full px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-between bg-white">
              <span className="text-gray-500">
                {fileName || "Choose a file..."}
              </span>
              <span className="text-blue-600">Browse</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <SubmitButton />

        {/* Already have account link */}
        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:text-blue-800 hover:underline">
            Login here
          </Link>
        </div>
      </form>
    </motion.div>
  );
};

export default RegisterForm;
