"use client";
import React, { useState, useEffect } from "react";
import { fetchAppointments } from "@/services/actions";
import { Appointments } from "@/types/patient";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { cancleAppointment } from "@/services/actions";

const MyAppointments = () => {
  const { user } = useAuth();
  const [myAppointments, setMyAppointments] = useState<Appointments[] | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointmentsData = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        setError(null);
        const data = await fetchAppointments(user.id);

        if (data?.error) {
          throw new Error(data.error);
        }

        setMyAppointments(data || []);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load appointments"
        );
        setMyAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentsData();
  }, [user?.id]);

  const changeAppointmentStatus = async (appId: string) => {
    const response = await cancleAppointment(appId as string);
    if (response?.error) {
      setError(response.error);
    } else {
      setMyAppointments((prevAppointments) =>
        prevAppointments ? prevAppointments.filter((ap) => ap.id !== appId) : []
      );
    }
  };

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
      {error && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            Try Again
          </button>
        </motion.div>
      )}

      {/* Empty State */}
      {!loading && !error && myAppointments?.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-600 mb-2">
            No appointments scheduled
          </h3>
          <p className="text-gray-500 mb-4">
            You don&apos;t have any upcoming appointments
          </p>
          <button
            onClick={() => (window.location.href = "/doctors")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            Book an Appointment
          </button>
        </motion.div>
      )}

      {/* Appointments List */}
      {!loading && !error && myAppointments && myAppointments.length > 0 && (
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
                  alt={`Dr. ${appointment.doctor.user.firstName} ${appointment.doctor.user.lastName}`}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/default-doctor.png";
                  }}
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
                    {new Date(appointment.startTime).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "short",
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Time:</span>{" "}
                    {new Date(appointment.startTime).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }
                    )}
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
                    onClick={() => changeAppointmentStatus(appointment.id)}
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
      )}
    </motion.section>
  );
};

export default MyAppointments;