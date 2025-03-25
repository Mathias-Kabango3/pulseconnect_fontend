interface User {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
}
interface Address {
  name: string;
  street: string;
  city: string;
  country: string;
}

interface Doctor {
  speciality: string;
  user: User;
  hospital: Hospital;
}

interface Hospital {
  name: string;
  address: Address;
}

export interface Appointments {
  id: string;
  startTime: string;
  status: string;
  doctor: Doctor;
}
