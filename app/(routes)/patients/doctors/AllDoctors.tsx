"use client";
import React, { useEffect, useState } from "react";
import { Doctor } from "@/types/doctor";
import Image from "next/image";
import Link from "next/link";
import { getDoctors } from "@/services/actions";
import { SkeletonCard } from "@/app/loading";
import { motion } from "framer-motion";

const AvailableDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const data = await getDoctors();
        if (!data || !data.doctors) {
          throw new Error("Failed to fetch Doctors");
        }
        setDoctors(data.doctors);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Error fetching doctors:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <section className="max-w-screen-2xl mx-auto p-8">
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
        Doctors to Book
      </h2>
      {loading ? (
        <SkeletonCard />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {doctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
              <div className="cursor-pointer">
                {/* Doctor's Image */}
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={doctor.user.profilePicture}
                    alt="Doctor's Profile"
                    className="object-contain w-full h-full"
                    width={300}
                    height={300}
                  />
                </div>

                {/* Doctor's Details */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        doctor.available ? "bg-green-400" : "bg-red-400"
                      }`}></div>
                    <p
                      className={`text-sm font-semibold ${
                        doctor.available ? "text-green-500" : "text-red-500"
                      }`}>
                      {doctor.available ? "Available" : "Not Available"}
                    </p>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    Dr. {doctor.user.firstName} {doctor.user.lastName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {doctor.hospital.name} Hospital
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    {doctor.speciality}
                  </p>

                  {/* Book Now Button */}
                  <div className="text-center">
                    <Link
                      href={`doctors/${doctor.id}`}
                      className="inline-block w-full bg-[#192655] py-2 px-4 text-white rounded-lg hover:bg-[#14213D] transition-colors duration-300">
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AvailableDoctors;
