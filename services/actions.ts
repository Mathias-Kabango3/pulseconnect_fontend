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
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
    };
  }
};

export const registerAction = async (formData: FormData) => {
  try {
    // Extract required fields from formData
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const gender = formData.get("gender") as string;
    const image = formData.get("image") as File | null;

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !gender) {
      return { error: "All required fields must be provided" };
    }

    // Create a new FormData object with only the fields we want to send
    const cleanFormData = new FormData();
    cleanFormData.append("firstName", firstName);
    cleanFormData.append("lastName", lastName);
    cleanFormData.append("email", email);
    cleanFormData.append("password", password);
    cleanFormData.append("gender", gender);

    // Only append image if it exists and has content
    if (image && image.size > 0 && image.name !== "undefined") {
      cleanFormData.append("image", image);
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
    return {
      error:
        err instanceof Error
          ? err.message
          : "An unexpected error occurred during registration",
    };
  }
};

export const getAllAppointments = async () => {
  try {
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
      const error = await response.json();
      return { error: error.message || "Sorry something went wrong" };
    }

    return response.json();
  } catch (err: unknown) {
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
    };
  }
};

// get all doctors across all hospitals

export const getDoctors = async () => {
  try {
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
      const error = await response.json();
      return { error: error.message || "Sorry something went wrong" };
    }

    return await response.json();
  } catch (err: unknown) {
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
    };
  }
};

export const getDoctor = async (id: string) => {
  try {
  } catch (err: unknown) {
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
    };
  }
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
    const error = await response.json();
    return { error: error.message || "Sorry something went wrong" };
  }
  return response.json();
};

export const getSlots = async (date: string, docId: string) => {
  try {
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
      const error = await response.json();
      return { error: error.message || "Sorry something went wrong" };
    }
    return response.json();
  } catch (err: unknown) {
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
    };
  }
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
  } catch (err: unknown) {
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
    };
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
  } catch (err: unknown) {
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
    };
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
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
    };
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
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
    };
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
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
    };
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
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
    };
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
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
    };
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
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
    };
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
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
    };
  }
};

export const cancleAppointment = async (appId: string) => {
  try {
    const userToken = await cookies();
    const token = userToken.get("token")?.value;
    const response = await fetch(`${apiUrl}/appointment/${appId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        newStatus: "Canceled",
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message || "Failed to cancel appointment." };
    }
    return await response.json();
  } catch (err: unknown) {
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
    };
  }
};
