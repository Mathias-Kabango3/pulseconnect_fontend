import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Gender is required",
  }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const doctorSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  middleName: z.string().optional(),
  dob: z.string().optional(),
  gender: z.string().min(1, 'Gender is required'),
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['DOCTOR', 'ADMIN']).default('DOCTOR'),
  idNumber: z.string().optional(),
  hospitalId: z.number().int(),
  isApproved: z.boolean().default(true),
  verificationDocument: z.string().optional(),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  speciality: z.string().min(1, 'Speciality is required'),
  availableFrom: z.string().optional(),
  availableTo: z.string().optional(),
  licenseNumber: z.string().min(1, 'License number is required'),
  address: z.object({
    street: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().default('Zimbabwe'),
  }).optional(),
});