import React from "react";
import filteredDoctors from "../data/topDoctors";
import Image from "next/image";

const TopDoctors = () => {
  return (
    <section id="doctorS">
      <h2 className="text-center font-semibold my-6 text-2xl">
        Meet out Great Doctors
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mx-4 lg:grid-cols-5">
        {filteredDoctors.map((doctor, index) => (
          <div key={index} className="p-4 shadow-md rounded-lg">
            <div className="grid cursor-pointer">
              <div className="bg-gray-100 rounded-md mb-4">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  objectFit="contain"
                  className=" object-fit rounded-full"
                />
              </div>
              <div className="">
                <div className="flex items-center gap-2 font-light">
                  <div
                    className={`${
                      doctor.available ? "bg-green-400" : "bg-red-400"
                    } h-1 w-1 rounded-full`}></div>
                  <p
                    className={`${
                      doctor.available ? "text-green-500" : "text-red-500"
                    }`}>
                    {doctor.available ? "Available" : "Not Available"}
                  </p>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  {doctor.name}
                </h3>
                <p className="text-sm text-gray-600">{doctor.specialty}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopDoctors;
