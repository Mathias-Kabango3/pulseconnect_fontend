"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const patientUpdateValidation = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  middleName: z.string().optional(),
  dob: z.string().optional(), // Handling date as string
  gender: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  role: z.enum(["PATIENT"]).optional(),
  idNumber: z.string().optional(),
  hospitalId: z.number().int().optional(),
  isApproved: z.boolean().optional(),
  verificationDocument: z.string().optional(),
  phoneNumber: z.string().optional(),
  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      postalCode: z.string().optional(),
      country: z.string().default("Zimbabwe"),
    })
    .optional(),
});

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(patientUpdateValidation),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      dob: user?.dob || "",
      gender: user?.gender || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      idNumber: user?.idNumber || "",
      address: {
        street: user?.address?.street || "",
        city: user?.address?.city || "",
        state: user?.address?.state || "",
        postalCode: user?.address?.postalCode || "",
        country: user?.address?.country || "Zimbabwe",
      },
    },
  });

  const onSubmit = (data: {
    firstName?: string;
    lastName?: string;
    middleName?: string;
    dob?: string;
    gender?: string;
    email?: string;
    password?: string;
    role?: "PATIENT";
    idNumber?: string;
    hospitalId?: number;
    isApproved?: boolean;
    verificationDocument?: string;
    phoneNumber?: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      postalCode?: string;
      country?: string;
    };
  }) => {
    console.log("Updated Data:", data);
    setIsEditing(false);
  };

  const getAvatarUrl = () => {
    if(user?.profilePicture){
      return user?.profilePicture;
    }
    return `https://api.dicebear.com/8.x/initials/svg?seed=${user?.firstName}`;
  };

  return (
    <section className="max-w-screen-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
      <hr className="border-t-2 border-gray-200 mb-8" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - User Profile Info */}
        <motion.div
          className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg"
          initial={{ x: 0 }}
          animate={{ x: isEditing ? "-50%" : 0 }}
          transition={{ duration: 0.5 }}>
          <div className="flex flex-col items-center text-center">
            <Image
              src={getAvatarUrl()}
              alt="user icon"
              className="w-24 h-24 rounded-full mb-4"
              width={96}
              height={96}
            />
            <h2 className="text-2xl font-bold text-gray-800">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Address:</span>
              <span className="text-gray-800">
                {user?.address?.city}, {user?.address?.state},{" "}
                {user?.address?.street}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Gender:</span>
              <span className="text-gray-800">{user?.gender}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="text-gray-800">{user?.phoneNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Birthday:</span>
              <span className="text-gray-800">{user?.dob}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Role:</span>
              <span className="text-gray-800">{user?.role}</span>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </div>
        </motion.div>

        {/* Right Side - Edit Form */}
        <AnimatePresence>
          {isEditing && (
            <motion.div
              className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Edit Profile
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      First Name
                    </label>
                    <input
                      type="text"
                      {...register("firstName")}
                      className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Last Name
                    </label>
                    <input
                      type="text"
                      {...register("lastName")}
                      className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Phone
                    </label>
                    <input
                      type="text"
                      {...register("phoneNumber")}
                      className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Gender
                    </label>
                    <select
                      {...register("gender")}
                      className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      {...register("dob")}
                      className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mt-6">
                  Address
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Street
                    </label>
                    <input
                      type="text"
                      {...register("address.street")}
                      className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      City
                    </label>
                    <input
                      type="text"
                      {...register("address.city")}
                      className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      State
                    </label>
                    <input
                      type="text"
                      {...register("address.state")}
                      className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Country
                    </label>
                    <input
                      type="text"
                      {...register("address.country")}
                      className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors duration-300"
                    onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Profile;
