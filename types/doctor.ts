interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
}

interface Hospital {
  name: string;
}
export interface Doctor {
  id: string;
  user: User;
  hospital: Hospital;
  speciality: string;
  hospitalId: string;
  licenseNumber: string;
  phoneNumber: string;
  available: boolean;
}
