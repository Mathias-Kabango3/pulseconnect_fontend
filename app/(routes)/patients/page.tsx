"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MainComponent from "./MainComponent";
import { getDoctors } from "@/services/actions";
import { Doctor } from "@/types/doctor";
import { fetchAppointments } from "@/services/actions";
import { useAuth } from "@/context/AuthContext";
import { Appointments } from "@/types/patient";
import Link from "next/link";

const dummyHospitals = [
  { id: 1, name: "General Hospital", location: "Harare" },
  { id: 2, name: "City Medical Center", location: "Bulawayo" },
];

const PatientHomepage = () => {
  const [selectedSection, setSelectedSection] = useState("appointments");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [myAppointments, setMyAppointments] = useState<Appointments[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const { user } = useAuth();
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

  useEffect(() => {
    const fetchedAppointments = async () => {
      try {
        setLoading(true);
        const data = await fetchAppointments(user?.id as string);

        if (data?.error) {
          setError(data.error);
        } else {
          // Sort appointments by status
          const sortedAppointments = (data || []).sort(
            (
              a: { status: string | number },
              b: { status: string | number }
            ) => {
              const statusOrder: Record<string, number> = {
                CONFIRMED: 1, // Highest priority
                PENDING: 2,
                COMPLETED: 3,
                CANCELLED: 4, // Lowest priority
              };
              return statusOrder[a.status] - statusOrder[b.status];
            }
          );

          setMyAppointments(sortedAppointments); // Store sorted appointments
        }
      } catch (err) {
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
        setError(null);
      }
    };

    fetchedAppointments();
  }, [user?.id]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header Section */}
      <header className=" text-blue-600 text-center py-6 shadow-md">
        <h1 className="text-3xl font-bold">Hospital Appointment Booking</h1>
        <p className="mt-2 text-lg">
          Schedule and manage your medical appointments effortlessly.
        </p>
      </header>

      {/* Main Content */}
      <section className="max-w-screen-2xl mx-auto p-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <aside className="md:w-1/4 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Navigation</h2>
          <ul className="space-y-3">
            {["appointments", "doctors", "hospitals"].map((section) => (
              <motion.li
                key={section}
                className={`cursor-pointer p-2 rounded-lg ${
                  selectedSection === section
                    ? "bg-blue-500 text-white font-bold"
                    : "hover:bg-blue-100"
                }`}
                onClick={() => setSelectedSection(section)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                {section === "appointments" && "Recent Appointments"}
                {section === "doctors" && "Top Doctors"}
                {section === "hospitals" && "Top Hospitals"}
              </motion.li>
            ))}
          </ul>
        </aside>

        {/* Main Content Area */}
        <motion.main
          className="flex-1 bg-white shadow-md rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          {selectedSection === "appointments" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}>
              <h2 className="text-xl font-semibold mb-4">
                Recent Appointments
              </h2>
              {error && <p>{error}</p>}
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
              <ul className="space-y-2">
                {myAppointments.map((appt) => (
                  <li
                    key={appt.id}
                    className={`text-sm font-semibold px-2 py-4  border rounded-lg shadow-sm bg-gray-50 border-sm ${
                      appt.status === "CONFIRMED"
                        ? "text-green-700"
                        : appt.status === "COMPLETED"
                        ? "text-blue-700"
                        : appt.status === "PENDING"
                        ? "text-yellow-700"
                        : "text-red-700"
                    }`}>
                    {new Date(appt.startTime).toLocaleDateString("en-US", {
                      weekday: "short",
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                    -{" "}
                    {new Date(appt.startTime).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}{" "}
                    - {appt.doctor.user.firstName}-{appt.doctor.user.lastName} (
                    {appt.status})
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {selectedSection === "doctors" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}>
              <h2 className="text-xl font-semibold mb-4">Top Doctors</h2>
              <ul className="space-y-2">
                {doctors.map((doc) => (
                  <li
                    key={doc.id}
                    className="border p-4 rounded-lg shadow-sm bg-gray-50">
                    {doc.user.firstName}- {doc.user.lastName} - {doc.speciality}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {selectedSection === "hospitals" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}>
              <h2 className="text-xl font-semibold mb-4">Top Hospitals</h2>
              <ul className="space-y-2">
                {dummyHospitals.map((hospital) => (
                  <li
                    key={hospital.id}
                    className="border p-4 rounded-lg shadow-sm bg-gray-50">
                    {hospital.name} - {hospital.location}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </motion.main>
      </section>
      <p className="text-center flex items-center justify-center">
        <Link
          href={"/patients/doctors"}
          className="bg-blue-950 py-4 rounded-full text-center text-white px-6 hover:text-blue-600 hover:bg-slate-50">
          Book Now
        </Link>
      </p>
      <MainComponent />

      {/* Footer */}
      <footer className="text-center bg-blue-600 text-white py-4 mt-8">
        <p>
          &copy; {new Date().getFullYear()} PulseConnect. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default PatientHomepage;
