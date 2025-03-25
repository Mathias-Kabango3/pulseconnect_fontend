import React from "react";
import Appointments from "./Appointments";
import { Suspense } from "react";
import Loading from "@/app/loading";
const PatientsAppointments = () => {
  return (
    <section className="lg:max-w-screen-2xl">
      <Suspense fallback={<Loading />}>
        <Appointments />
      </Suspense>
    </section>
  );
};

export default PatientsAppointments;
