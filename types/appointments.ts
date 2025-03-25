interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  isActive: boolean;
}

interface Doctor {
  id: string;
  speciality: string;
  user: User;
}

interface Patient {
  id: string;
  user: User;
}

interface Hospital {
  id: string;
  name: string;
}
export interface Appointments {
  id: string;
  startTime: string;
  status: string;
  patient: Patient;
  doctor: Doctor;
  hospital: Hospital;
}
