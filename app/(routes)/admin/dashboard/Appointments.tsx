import React from "react";
import AppointmentTable from "./AppointmentTable";
import AdminNavbar from "./AdminNavbar";

const Appointments = () => {
  return (
    <>
      <AdminNavbar />
      <div className="mx-auto">
        <div className="flex justify-center items-center mx-2">
          <h1 className="text-slate-800 text-2xl">Appointments</h1>
          <div className="flex gap-8">
            <div className="relative items-center hidden lg:flex"></div>
          </div>
        </div>
        {/* Appointments Table */}
        <div className="rounded-2xl mt-8 bg-slate-100 ">
          <AppointmentTable />
        </div>
      </div>
    </>
  );
};

export default Appointments;
