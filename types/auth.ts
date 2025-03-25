import { z } from "zod";
import {
  registerSchema,
  loginSchema,
  doctorSchema,
} from "@/schemas/authSchema";

export type RegisterFormValues = z.infer<typeof registerSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  gender: string;
  profilePicture: string;
  phoneNumber?: string;
  dob: string;
  address: {
    address: string;
    city: string;
    state: string;
    country: string;
    street: string;
    postalCode: string;
  };
  idNumber?: string;
}
interface Hospital {
  name: string;
}
export type CreateDoctor = z.infer<typeof doctorSchema>;
export interface Appointment {
  id: string;
  patient: { user: User };
  doctor: { user: User; speciality: string };
  hospital: Hospital;
  date: string;
  appointmentTime: string;
  status: "PENDING" | "COMPLETED" | "CANCELLED" | "CONFIRMED";
}
export interface Doctor extends Appointment {
  speciality: string;
}
