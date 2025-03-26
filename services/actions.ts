"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
const apiUrl = process.env.NEXT_APP_API_URL;

// Server Action for login
export const loginAction = async (formData: FormData) => {
  try {
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const response = await fetch(`${apiUrl}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message || "Sorry something went wrong" };
    }
    const responseData = await response.json();
    return responseData;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Sorry something went wrong");
    }
    throw new Error(
      typeof err === "string" ? err : "An unknown error occurred"
    );
  }
};

export const registerAction = async (formData: FormData) => {
  try {
    // Extract required fields from formData
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const gender = formData.get('gender') as string;
    const image = formData.get('image') as File | null;

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !gender) {
      return { error: "All required fields must be provided" };
    }

    // Create a new FormData object with only the fields we want to send
    const cleanFormData = new FormData();
    cleanFormData.append('firstName', firstName);
    cleanFormData.append('lastName', lastName);
    cleanFormData.append('email', email);
    cleanFormData.append('password', password);
    cleanFormData.append('gender', gender);

    // Only append image if it exists and has content
    if (image && image.size > 0 && image.name !== 'undefined') {
      cleanFormData.append('image', image);
    }

    const response = await fetch(`${apiUrl}/patient/register`, {
      method: "POST",
      body: cleanFormData,
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        error: error.message || "Registration failed. Please try again.",
      };
    }

    const data = await response.json();
    return {
      message: "Registration successful!",
      user: data.user,
      accessToken: data.accessToken,
    };

  } catch (err: unknown) {
    console.error("Registration error:", err);
    return { 
      error: err instanceof Error 
        ? err.message 
        : "An unexpected error occurred during registration" 
    };
  }
};

export const getAllAppointments = async () => {
  const adminCookie = await cookies();
  const adminToken = adminCookie.get("token")?.value;
  if (!adminToken) {
    throw new Error("Unauthorized");
  }
  const response = await fetch(`${apiUrl}/admin`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch patients");
  }

  return response.json();
};

// get all doctors across all hospitals

export const getDoctors = async () => {
  const userToken = await cookies();
  const token = userToken.get("token")?.value;
  const response = await fetch(`${apiUrl}/doctor`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorMessage = await response.json();
    throw new Error(errorMessage.message || "Failed to fetch doctors");
  }
  return await response.json();
};

export const getDoctor = async (id: string) => {
  const userToken = await cookies();
  const token = userToken.get("token")?.value;
  const response = await fetch(`${apiUrl}/doctor/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch doctors");
  }
  return response.json();
};

export const getSlots = async (date: string, docId: string) => {
  const userToken = await cookies();
  const token = userToken.get("token")?.value;
  const response = await fetch(
    `${apiUrl}/appointment/slots/?doctorId=${docId}&date=${date}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    const errorMessage = await response.json();
    throw new Error(errorMessage.message || "Failed to fetch slots");
  }
  return response.json();
};

export const bookAppointment = async (
  date: string,
  slot: string,
  doctorId: string,
  userId: string
) => {
  try {
    const userToken = await cookies();
    const data = {
      doctorId,
      userId,
      date,
      startTime: slot,
    };
    const token = userToken.get("token")?.value;
    const response = await fetch(`${apiUrl}/appointment/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message || "Sorry something went wrong" };
    }
    const res = await response.json();
    return res;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to book Appointment.");
  }
};

export const fetchAppointments = async (userId: string) => {
  try {
    const userToken = await cookies();
    const token = userToken.get("token")?.value;
    const response = await fetch(
      `${apiUrl}/appointment/my-appointments/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message || "Sorry something went wrong" };
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch appointments");
  }
};

export const registerDoctor = async (formData: FormData) => {
  try {
    const userToken = await cookies();
    const token = userToken.get("token")?.value;
    const response = await fetch(`${apiUrl}/doctor/register`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      return { error: error.message || "Sorry something went wrong" };
    }
    revalidatePath("/admin/doctors");
    return await response.json();
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Sorry something went wrong");
    }
    throw new Error(
      typeof err === "string" ? err : "An unknown error occurred"
    );
  }
};

export const hospitalDoctors = async () => {
  try {
    const userToken = await cookies();
    const token = userToken.get("token")?.value;
    const response = await fetch(`${apiUrl}/doctor/hospital`, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message || "Sorry something went wrong" };
    }
    const responseData = await response.json();
    return responseData.doctors;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Sorry something went wrong");
    }
    throw new Error(
      typeof err === "string" ? err : "An unknown error occurred"
    );
  }
};

export const doctorsAppointments = async (doctorId: string) => {
  try {
    const userToken = await cookies();
    const token = userToken.get("token")?.value;
    const response = await fetch(`${apiUrl}/doctor/appointments/${doctorId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message || "Sorry something went wrong" };
    }
    const responseData = await response.json();
    return responseData.appointments;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Sorry something went wrong");
    }
    throw new Error(
      typeof err === "string" ? err : "An unknown error occurred"
    );
  }
};

export const updateDoctor = async (formData: FormData, doctorId: string) => {
  try {
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phoneNumber: formData.get("phoneNumber"),
    };
    const userToken = await cookies();
    const token = userToken.get("token")?.value;
    const response = await fetch(`${apiUrl}/doctor/${doctorId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message || "Sorry something went wrong" };
    }
    revalidatePath("/admin/doctors");
    return await response.json();
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Sorry something went wrong");
    }
    throw new Error(
      typeof err === "string" ? err : "An unknown error occurred"
    );
  }
};

export const deleteDoctor = async (doctorId: string) => {
  try {
    const userToken = await cookies();
    const token = userToken.get("token")?.value;
    const response = await fetch(`${apiUrl}/doctor/${doctorId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message || "Sorry something went wrong" };
    }
    revalidatePath("/admin/doctors");
    return await response.json();
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Sorry something went wrong");
    }
    throw new Error(
      typeof err === "string" ? err : "An unknown error occurred"
    );
  }
};

export const getDoctorsAppointments = async (doctorId: string) => {
  try {
    const userToken = await cookies();
    const token = userToken.get("token")?.value;
    const response = await fetch(`${apiUrl}/doctor/appointments/${doctorId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message || "Failed to fetch Appointments" };
    }
    return await response.json();
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Sorry something went wrong");
    }
    throw new Error(
      typeof err === "string" ? err : "An unknown error occurred"
    );
  }
};

export const getHospitalPatients = async () => {
  try {
    const userToken = await cookies();
    const token = userToken.get("token")?.value;
    const response = await fetch(`${apiUrl}/admin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message || "Failed to fetch Patients" };
    }
    return await response.json();
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Sorry something went wrong");
    }
    throw new Error(
      typeof err === "string" ? err : "An unknown error occurred"
    );
  }
};
