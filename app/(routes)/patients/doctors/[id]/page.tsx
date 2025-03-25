"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Doctor } from "@/types/doctor";
import { getDoctor, getSlots, bookAppointment } from "@/services/actions";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

interface Slots {
  startTime: string;
  endTime: string;
}

const DoctorBooking = () => {
  const { user } = useAuth();
  const params = useParams();
  const doctorId = params.id as string;

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [formData, setFormData] = useState({
    date: "",
    slot: "",
  });
  const [slots, setSlots] = useState<Slots[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch doctor details
  useEffect(() => {
    const fetchDoctor = async () => {
      if (!doctorId) {
        console.error("Doctor ID is invalid");
        return;
      }
      try {
        const data = await getDoctor(doctorId);
        setDoctor(data);
      } catch (error) {
        console.error("Failed to fetch doctor details", error);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  // Fetch available slots when date changes
  useEffect(() => {
    const fetchSlots = async (selectedDate: string) => {
      if (!doctorId || !selectedDate) return;

      try {
        setLoadingSlots(true);
        const data = await getSlots(selectedDate, doctorId);
        setSlots(data);
      } catch (error) {
        console.error("Failed to fetch slots:", error);
        setSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };

    if (formData.date) {
      fetchSlots(formData.date);
    }
  }, [doctorId, formData.date]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.slot) {
      alert("Please select a time slot.");
      return;
    }

    if (submitting) return;
    setSubmitting(true);

    try {
      const { date, slot } = formData;
      const res = await bookAppointment(
        date,
        slot,
        doctorId,
        user?.id as string
      );

      if (!res.message) throw new Error("Failed to book appointment");

      alert("Appointment booked successfully!");
      setFormData({ date: "", slot: "" });
      setSlots([]);
    } catch (error) {
      console.error(error);
      alert("Error booking appointment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}>
        <div className="p-8">
          {/* Doctor's Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Book an Appointment with Dr. {doctor?.user.firstName}
            </h1>
            <p className="text-gray-600 mt-2">
              Specialty: {doctor?.speciality}
            </p>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Appointment Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Appointment Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Available Slots */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available Slots
              </label>
              <select
                name="slot"
                value={formData.slot}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                disabled={loadingSlots || !slots.length}>
                <option value="">Select a time slot</option>
                {loadingSlots ? (
                  <option disabled>Loading slots...</option>
                ) : (
                  slots.map((slot) => (
                    <option key={slot.startTime} value={slot.startTime}>
                      {new Date(slot.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition ${
                submitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700 hover:shadow-lg"
              }`}
              disabled={submitting}>
              {submitting ? "Booking..." : "Book Appointment"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default DoctorBooking;
