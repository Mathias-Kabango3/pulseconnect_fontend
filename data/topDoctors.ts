import image1 from "@/assets/images/image1.png";
import image2 from "@/assets/images/image2.png";
import image3 from "@/assets/images/image3.png";
import image4 from "@/assets/images/image4.png";
import image5 from "@/assets/images/image5.png";
import image6 from "@/assets/images/image6.png";
import image7 from "@/assets/images/image7.png";
import image8 from "@/assets/images/image8.png";
import image9 from "@/assets/images/image9.png";

const doctors = [
  {
    id: 1,
    name: "Dr. Tinashe Moyo",
    specialty: "Orthopedics",
    location: "Harare",
    image: image1,
    available: true,
  },
  {
    id: 2,
    name: "Dr. Ruvimbo Marufu",
    specialty: "Pediatrician",
    location: "Bulawayo",
    image: image2,
    available: true,
  },
  {
    id: 3,
    name: "Dr. Tatenda Ndlovu",
    specialty: "Pathologist",
    location: "Gweru",
    image: image3,
    available: true,
  },
  {
    id: 4,
    name: "Dr. Farai Sibanda",
    specialty: "Nephrologist",
    location: "Mutare",
    image: image4,
    available: true,
  },
  {
    id: 5,
    name: "Dr. Chiedza Makoni",
    specialty: "Gynecologist",
    location: "Masvingo",
    image: image5,
    available: true,
  },
  {
    id: 6,
    name: "Dr. Tanaka Chiweshe",
    specialty: "Dentist",
    location: "Kadoma",
    image: image6,
    available: true,
  },
  {
    id: 7,
    name: "Dr. Nyasha Zhou",
    specialty: "Neurologist",
    location: "Chitungwiza",
    image: image7,
    available: true,
  },
  {
    id: 8,
    name: "Dr. Kudzai Mashava",
    specialty: "Cardiologist",
    location: "Bindura",
    image: image8,
    available: true,
  },
  {
    id: 9,
    name: "Dr. Tariro Mutasa",
    specialty: "Oncologist",
    location: "Marondera",
    image: image9,
    available: true,
  },
  {
    id: 10,
    name: "Dr. Simba Chirinda",
    specialty: "Pulmonologist",
    location: "Victoria Falls",
    image: image1,
    available: true,
  },
];

const filteredDoctors = doctors.filter((doctor) => doctor.available);

export default filteredDoctors;

