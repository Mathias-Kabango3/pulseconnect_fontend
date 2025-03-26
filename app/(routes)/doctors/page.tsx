"use client";

import { motion } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getDoctorsAppointments } from "@/services/actions";
import { Appointments } from "@/types/appointments";

const DoctorsPage = () => {
  const { user, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState<Appointments[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsLoading(true);
        const doctorId = user?.id;
        if (!doctorId) return;

        const response = await getDoctorsAppointments(doctorId);
        setAppointments(response || []);
      } catch (error) {
        console.error(error);
        setAppointments([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAppointments();
  }, [user?.id]);

  // Filter appointments based on search query and status
  const filteredAppointments =
    appointments?.filter((appointment) => {
      const matchesSearchQuery =
        appointment.patient.user.firstName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        appointment.patient.user.lastName
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter
        ? appointment.status === statusFilter
        : true;

      return matchesSearchQuery && matchesStatus;
    }) || [];

  // Helper function to determine the time of day
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  // Animation variants for Framer Motion
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <motion.div className="bg-blue-600 p-4 flex justify-between items-center shadow-md">
        <h1 className="text-white text-2xl font-bold">
          {getGreeting()}, Dr. {user?.firstName} {user?.lastName}
        </h1>
        <div className="flex items-center space-x-4">
          {user?.profilePicture && (
            <Image
              src={user.profilePicture}
              alt={`${user.firstName} ${user.lastName}`}
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          <button
            className="text-white flex items-center space-x-2 hover:bg-blue-700 p-2 rounded"
            onClick={logout}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Your Appointments
        </h2>

        {/* Search Bar and Filter Dropdown */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by patient name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg flex-1"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg">
            <option value="">All Statuses</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="COMPLETED">Completed</option>
            <option value="PENDING">Pending</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        {/* Appointments List */}
        <div className="grid gap-6">
          {isLoading ? (
            <p>Loading appointments...</p>
          ) : filteredAppointments.length === 0 ? (
            <div className="text-center py-8">
              <h3 className="text-xl font-medium text-gray-600 mb-2">
                {appointments?.length === 0
                  ? "You have no appointments scheduled"
                  : "No appointments match your filters"}
              </h3>
              <p className="text-gray-500">
                {appointments?.length === 0
                  ? "Check back later for new appointments"
                  : "Try adjusting your search criteria"}
              </p>
            </div>
          ) : (
            filteredAppointments.map((appointment) => (
              <motion.div
                key={appointment.id}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                variants={itemVariants}
                initial="hidden"
                animate="visible">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-medium text-blue-800">
                      {appointment.patient.user.firstName}{" "}
                      {appointment.patient.user.lastName}
                    </h3>
                    <p className="text-gray-600">
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
                    <p>
                      {new Date(appointment.startTime).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}
                    </p>
                  </div>
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${
                      appointment.status === "COMPLETED"
                        ? "bg-blue-100 text-blue-800"
                        : appointment.status === "CONFIRMED"
                        ? "bg-green-100 text-green-800"
                        : appointment.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                    {appointment.status}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-600 p-4 text-white text-center">
        <p>
          &copy; {new Date().getFullYear()} PulseConnect. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default DoctorsPage;