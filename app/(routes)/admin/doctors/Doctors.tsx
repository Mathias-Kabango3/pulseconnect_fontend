"use client";
import { useFormStatus } from "react-dom";
import { useState, useEffect } from "react";
import { Doctor } from "@/types/doctor";
import { toast } from "sonner";
import {
  registerDoctor,
  hospitalDoctors,
  updateDoctor,
  deleteDoctor,
} from "@/services/actions";
import Image from "next/image";

export default function HospitalDoctors() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [doctors, setDoctors] = useState<Doctor[] | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await hospitalDoctors();
        if (response.error) {
          toast.error(<p className="text-red-300">{response.error}</p>);
          return;
        }
        setDoctors(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDoctors();
  }, [refresh]);

  const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded">
        {pending ? "Submitting..." : "Submit"}
      </button>
    );
  };

  const onFormSubmit = async (formData: FormData) => {
    const response = await registerDoctor(formData);
    if (response?.error) {
      toast.error(<p className="text-red-300">{response.error}</p>);
      return;
    } else {
      toast.success(
        <p className="text-green-300">Doctor registered successfully</p>
      );
      setRefresh(!refresh);
    }
  };

  const handleDoctorClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsDoctorModalOpen(true);
  };

  const UpdateDoctor = async (formData: FormData): Promise<void> => {
    const doctorId = selectedDoctor?.id;
    const response = await updateDoctor(formData, doctorId as string);
    if (response?.error) {
      toast.error(<p className="text-red-300">{response.error}</p>);
      return;
    } else {
      toast.success(
        <p className="text-green-300">Doctor updated successfully</p>
      );
      setRefresh(!refresh);
    }
  };

  const handleDeleteDoctor = async (doctorId: string) => {
    const response = await deleteDoctor(doctorId);
    if (response?.error) {
      toast.error(<p className="text-red-300">{response.error}</p>);
      return;
    } else {
      toast.success(
        <p className="text-green-300">Doctor deleted successfully</p>
      );
      setRefresh(!refresh);
    }
  };

  // Filter doctors based on search query
  const filteredDoctors = doctors?.filter((doctor) => {
    const fullName =
      `${doctor.user.firstName} ${doctor.user.lastName}`.toLowerCase();
    const licenseNumber = doctor.licenseNumber?.toLowerCase() || "";
    const speciality = doctor.speciality.toLowerCase();
    const query = searchQuery.toLowerCase();

    return (
      fullName.includes(query) ||
      licenseNumber.includes(query) ||
      speciality.includes(query)
    );
  });

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-between ">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded font-extralight">
          Add Doctor
        </button>
        <input
          type="text"
          placeholder={`Search`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded-lg w-48 md:w-54 lg:w-64 mr-8 border-white outline-blue-600 "
        />
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {filteredDoctors?.length === 0 ? (
          <div className="col-span-full text-center text-gray-600">
            No doctors found.
          </div>
        ) : (
          filteredDoctors?.map((doctor) => (
            <div
              key={doctor.id}
              onClick={() => handleDoctorClick(doctor)}
              className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer">
              <Image
                src={doctor.user.profilePicture}
                alt={`${doctor.user.firstName} ${doctor.user.lastName}`}
                className="w-full h-48 object-contain"
                width={90}
                height={90}
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">
                  {doctor.user.firstName} {doctor.user.lastName}
                </h3>
                <p className="text-sm text-gray-600">{doctor.speciality}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Form for Adding Doctor */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Add Doctor</h2>
            <form action={onFormSubmit} encType="multipart/form-data">
              <input
                name="firstName"
                placeholder="First Name"
                className="border p-2 w-full mb-2"
              />

              <input
                name="lastName"
                placeholder="Last Name"
                className="border p-2 w-full mb-2"
              />

              <input
                name="email"
                placeholder="Email"
                className="border p-2 w-full mb-2"
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                className="border p-2 w-full mb-2"
              />

              <input
                name="speciality"
                placeholder="Speciality"
                className="border p-2 w-full mb-2"
              />

              <input
                name="phoneNumber"
                placeholder="Phone Number"
                className="border p-2 w-full mb-2"
              />
              <input
                name="availableFrom"
                placeholder="starting hour"
                className="border p-2 w-full mb-2"
              />
              <input
                name="availableTo"
                placeholder="end day"
                className="border p-2 w-full mb-2"
              />
              <select
                name="gender"
                id="gender"
                className="border p-2 w-full mb-2">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <input
                name="licenseNumber"
                placeholder="License Number"
                className="border p-2 w-full mb-2"
              />
              <input
                type="file"
                name="image"
                placeholder="Profile Photo"
                className="border p-2 w-full mb-2"
              />
              <SubmitButton />
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Displaying Doctor Information */}
      {isDoctorModalOpen && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Doctor Information</h2>
            <Image
              src={selectedDoctor.user.profilePicture || "/default-doctor.png"}
              alt={`${selectedDoctor.user.firstName} ${selectedDoctor.user.lastName}`}
              className="w-full h-48 object-contain mb-4"
              width={90}
              height={90}
            />
            <form action={UpdateDoctor} encType="multipart/form-data">
              <input
                name="firstName"
                value={selectedDoctor.user.firstName}
                onChange={(e) =>
                  setSelectedDoctor({
                    ...selectedDoctor,
                    user: {
                      ...selectedDoctor.user,
                      firstName: e.target.value,
                    },
                  })
                }
                className="border p-2 w-full mb-2"
              />
              <input
                name="lastName"
                value={selectedDoctor.user.lastName}
                onChange={(e) =>
                  setSelectedDoctor({
                    ...selectedDoctor,
                    user: {
                      ...selectedDoctor.user,
                      lastName: e.target.value,
                    },
                  })
                }
                className="border p-2 w-full mb-2"
              />
              <input
                name="email"
                value={selectedDoctor.user.email}
                onChange={(e) =>
                  setSelectedDoctor({
                    ...selectedDoctor,
                    user: {
                      ...selectedDoctor.user,
                      email: e.target.value,
                    },
                  })
                }
                className="border p-2 w-full mb-2"
              />
              <input
                name="speciality"
                value={selectedDoctor.speciality}
                onChange={(e) =>
                  setSelectedDoctor({
                    ...selectedDoctor,
                    speciality: e.target.value,
                  })
                }
                className="border p-2 w-full mb-2"
              />
              <input
                name="phoneNumber"
                value={selectedDoctor.user.phoneNumber || ""}
                onChange={(e) =>
                  setSelectedDoctor({
                    ...selectedDoctor,
                    user: {
                      ...selectedDoctor.user,
                      phoneNumber: e.target.value,
                    },
                  })
                }
                className="border p-2 w-full mb-2"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => handleDeleteDoctor(selectedDoctor.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded mr-2">
                  Delete
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded">
                  Update
                </button>
              </div>
            </form>
            <button
              type="button"
              onClick={() => setIsDoctorModalOpen(false)}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
