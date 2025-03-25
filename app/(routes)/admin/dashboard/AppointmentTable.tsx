"use client";

import { useEffect, useState } from "react";
import { getAllAppointments } from "@/services/actions";
import Cookies from "js-cookie";
import { Appointments } from "@/types/appointments";
import { SkeletonCard } from "@/app/loading";

const AppointmentTable: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointments[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "PENDING" | "COMPLETED" | "CANCELLED" | "CONFIRMED" | "ALL"
  >("ALL");

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const data: Appointments[] = await getAllAppointments();
        if (!data) throw new Error("Failed to fetch appointments");
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const updateStatus = async (
    id: string,
    newStatus: "PENDING" | "COMPLETED" | "CANCELLED" | "CONFIRMED"
  ) => {
    try {
      const adminToken = Cookies.get("token");
      const response = await fetch(
        `https://pulseconnect-backend.onrender.com/api/v1/appointment/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({ newStatus }),
        }
      );

      if (!response.ok) throw new Error("Failed to update status");

      setAppointments((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Helper function to calculate counts
  const getAppointmentCounts = () => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    const todaysAppointments = appointments.filter(
      (app) => new Date(app.startTime).toISOString().split("T")[0] === today
    ).length;

    const cancelledAppointments = appointments.filter(
      (app) => app.status === "CANCELLED"
    ).length;

    const pendingAppointments = appointments.filter(
      (app) => app.status === "PENDING"
    ).length;

    const completedAppointments = appointments.filter(
      (app) => app.status === "COMPLETED"
    ).length;

    const confirmedAppointments = appointments.filter(
      (app) => app.status === "CONFIRMED"
    ).length;

    return {
      todaysAppointments,
      cancelledAppointments,
      pendingAppointments,
      completedAppointments,
      confirmedAppointments,
    };
  };

  const filteredAppointments = appointments.filter((app) => {
    const matchesSearchQuery =
      app.patient.user.firstName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      app.doctor.user.firstName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      new Date(app.startTime)
        .toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesStatusFilter =
      statusFilter === "ALL" || app.status === statusFilter;

    return matchesSearchQuery && matchesStatusFilter;
  });

  const {
    todaysAppointments,
    cancelledAppointments,
    pendingAppointments,
    completedAppointments,
  } = getAppointmentCounts();

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Hospital Appointments
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-semibold text-gray-600">
            Todays Appointments
          </h3>
          <p className="text-2xl font-bold text-blue-600">
            {todaysAppointments}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-semibold text-gray-600">
            Cancelled Appointments
          </h3>
          <p className="text-2xl font-bold text-red-600">
            {cancelledAppointments}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-semibold text-gray-600">
            Pending Appointments
          </h3>
          <p className="text-2xl font-bold text-yellow-600">
            {pendingAppointments}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-semibold text-gray-600">
            Completed Appointments
          </h3>
          <p className="text-2xl font-bold text-green-600">
            {completedAppointments}
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-4 flex gap-4 justify-between">
        <input
          type="text"
          placeholder="Search by patient name, doctor name, or time"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded-lg w-full max-w-md"
        />
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value as
                | "PENDING"
                | "COMPLETED"
                | "CANCELLED"
                | "CONFIRMED"
                | "ALL"
            )
          }
          className="border p-2 rounded-lg bg-gray-100 text-sm focus:ring-2 focus:ring-blue-400">
          <option value="ALL">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="CONFIRMED">Confirmed</option>
        </select>
      </div>

      {/* Appointments Table */}
      {loading ? (
        <SkeletonCard />
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Patient</th>
                <th className="py-3 px-4 text-left">Doctor</th>
                <th className="py-3 px-4 text-left">Hospital</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Time</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((app, index) => (
                <tr
                  key={app.id}
                  className={`border-b hover:bg-gray-100 ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}>
                  <td className="py-3 px-4">
                    {app.patient.user.firstName} {app.patient.user.lastName}
                  </td>
                  <td className="py-3 px-4">
                    {app.doctor.user.firstName} {app.doctor.user.lastName}
                  </td>
                  <td className="py-3 px-4">{app.hospital.name}</td>
                  <td className="py-3 px-4">
                    {new Date(app.startTime).toLocaleDateString("en-US", {
                      weekday: "short",
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(app.startTime).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                  <td
                    className={`py-3 px-4 font-semibold text-sm uppercase tracking-wide rounded-md ${
                      app.status === "PENDING"
                        ? "text-yellow-600 bg-yellow-100 px-2 py-1"
                        : app.status === "COMPLETED"
                        ? "text-green-600 bg-green-100 px-2 py-1"
                        : app.status === "CONFIRMED"
                        ? "text-blue-600 bg-blue-100 px-2 py-1"
                        : "text-red-600 bg-red-100 px-2 py-1"
                    }`}>
                    {app.status}
                  </td>
                  <td className="py-3 px-4">
                    <select
                      className="border p-2 rounded-lg bg-gray-100 text-sm focus:ring-2 focus:ring-blue-400"
                      value={app.status}
                      onChange={(e) => {
                        const newStatus = e.target.value as
                          | "PENDING"
                          | "COMPLETED"
                          | "CANCELLED"
                          | "CONFIRMED";
                        updateStatus(app.id, newStatus);
                      }}>
                      <option value="PENDING">Pending</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="CANCELLED">Cancelled</option>
                      <option value="CONFIRMED">Confirmed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AppointmentTable;
