"use client";
import React from "react";
import Image from "next/image";
import doctor from "@/assets/images/image_33.png";
import Link from "next/link";
import { Search, CalendarDays, Flame } from "lucide-react";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <>
      <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-start p-10 bg-[#EBEBEB] scroll-smooth ">
        {/* Background Image with Motion Effect */}
        <motion.div
          className="lg:absolute inset-0 hidden md:block"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}>
          <Image
            src={doctor}
            alt="Doctor"
            layout="fill"
            objectFit="contain"
            objectPosition="right"
            priority
            className="lg:pr-24"
          />
        </motion.div>

        {/* Overlay Content */}
        <motion.div
          className="relative z-10 max-w-lg lg:pl-24"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}>
          <h1 className="text-3xl font-bold text-black">
            Connect with your doctor and schedule a check-up
          </h1>
          <p className="mt-8 text-[#787878] font-medium text-sm">
            With Medicare services, you will receive the best medical treatment
            at home. Our skilled professionals ensure top-notch care tailored to
            your needs.
          </p>

          {/* Animated Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 rounded-none bg-[#192655] p-4 text-white font-medium cursor-pointer transition-all duration-300">
            <Link href={"/login"}>Book Appointment</Link>
          </motion.button>
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.div
        className="bg-[#192655] mx-0 hidden md:flex md:justify-between p-8 mt-2 md:items-center md:gap-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}>
        {[
          {
            icon: <Search size={25} />,
            title: "Search Doctor",
            desc: "Search for doctors",
          },
          {
            icon: <CalendarDays size={25} />,
            title: "Appointment",
            desc: "Scheduled visits",
          },
          {
            icon: <Flame size={25} />,
            title: "Stay Connected",
            desc: "Stay in touch with your doctor",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="flex gap-4 items-center"
            whileHover={{ scale: 1.05 }}>
            <div className="text-white">{item.icon}</div>
            <div>
              <h2 className="text-white text-md">{item.title}</h2>
              <p className="font-medium text-gray-500 text-sm">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default Banner;
