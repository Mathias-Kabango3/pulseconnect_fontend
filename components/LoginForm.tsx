"use client";
import { useState } from "react";
import { loginAction } from "@/services/actions";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
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
          aria-hidden="true"
          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 mx-auto"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
        </svg>
      ) : (
        "Login"
      )}
    </motion.button>
  );
};

export const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [success, setSuccess] = useState<string | null>();
  const [userType, setUserType] = useState<"PATIENT" | "DOCTOR" | "ADMIN">(
    "PATIENT"
  );
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (formdata: FormData) => {
    formdata.append("role", userType);

    const response = await loginAction(formdata);
    if (response.error) {
      setErrorMessage(response.error);
    } else {
      setSuccess(response.message);
      const Role = response.user.role;
      const user = response.user;
      const token = response.accessToken;
      login(user, token);
      document.cookie = `role=${Role}; path=/`;

      if (Role === "ADMIN") {
        router.push("/admin");
      } else if (Role === "PATIENT") {
        router.push("/patients");
      } else if (Role === "DOCTOR") {
        router.push("/doctors");
      }
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Login
      </h2>
      <form action={handleSubmit} className="space-y-6">
        {/* Error and Success Messages */}
        {errorMessage && (
          <motion.div
            className="p-3 bg-red-50 text-red-600 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}>
            {errorMessage}
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

        {/* User Type Toggle */}
        <div className="flex justify-center space-x-4 mb-6">
          {(["PATIENT", "DOCTOR", "ADMIN"] as const).map((type) => (
            <button
              key={type}
              type="button"
              className={`px-4 py-2 rounded-lg transition-colors ${
                userType === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setUserType(type)}>
              {type.charAt(0) + type.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        {/* Submit Button */}
        <SubmitButton />

        {/* Don't have account link */}
        <div className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 hover:text-blue-800 hover:underline">
            Register here
          </Link>
        </div>
      </form>
    </motion.div>
  );
};
