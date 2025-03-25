"use client";
import React, { useState, useEffect } from "react";
import { fetchAppointments } from "@/services/actions";
import { Appointments } from "@/types/patient";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

const MyAppointments = () => {
  const { user } = useAuth();
  const [myAppointments, setMyAppointments] = useState<Appointments[]>([]);
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchappointments = async () => {
      try {
        setLoading(true);
        const data = await fetchAppointments(user?.id as string);
        if (data?.error) {
          setError(data.error);
        } else {
          setMyAppointments(data);
        }
      } catch (err) {
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchappointments();
  }, [user?.id]);

  return (
    <motion.section
      className="max-w-screen-2xl mx-auto p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Appointments</h1>
      <hr className="border-t-2 border-gray-200 mb-8" />

      {/* Loading Spinner */}
      {loading && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="w-12 h-12 mx-auto text-blue-500 animate-spin">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12"
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
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-red-500 text-center mb-6">
          {error}
        </motion.p>
      )}

      {/* Appointments List */}
      <div className="grid grid-cols-1 gap-6">
        {myAppointments.map((appointment) => (
          <motion.div
            key={appointment.id}
            className="flex flex-col md:flex-row items-center gap-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}>
            {/* Doctor's Image */}
            <div className="w-32 h-32 rounded-lg overflow-hidden shadow-md">
              <Image
                src={appointment.doctor.user.profilePicture}
                alt="Doctor's Profile"
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Appointment Details */}
            <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-gray-800">
                  Dr. {appointment.doctor.user.firstName}{" "}
                  {appointment.doctor.user.lastName} (
                  {appointment.doctor.speciality})
                </h2>
                <p className="text-gray-600">
                  {appointment.doctor.hospital.name} Hospital
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(appointment.startTime).toLocaleDateString("en-US", {
                    weekday: "short",
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Time:</span>{" "}
                  {new Date(appointment.startTime).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
                <p
                  className={`text-sm font-semibold px-2 py-1 rounded-md ${
                    appointment.status === "CONFIRMED"
                      ? "bg-green-100 text-green-700"
                      : appointment.status === "COMPLETED"
                      ? "bg-blue-100 text-blue-700"
                      : appointment.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                  {appointment.status}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors duration-300">
                  Cancel Appointment
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-[#1939ad] text-white rounded-lg hover:bg-[#152c8a] transition-colors duration-300">
                  Pay Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default MyAppointments;
