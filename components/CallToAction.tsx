"use client";
import React from "react";
import Image from "next/image";
import image from "@/assets/images/appointment-doc-img.png";
import Link from "next/link";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <motion.section
      className="bg-[#DEE2F2] rounded-md mx-4 mt-4 relative md:justify-around lg:justify-between mb-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}>
      <div className="flex flex-col-reverse md:flex-row justify-center items-center pb-4">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}>
          <h1 className="text-2xl text-gray-800 text-center pb-4">
            Book Appointment With 100+ Trusted Doctors
          </h1>

          {/* Animated Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white rounded-lg py-4 px-3 bg-[#192655] hover:bg-blue-700 transition-all duration-300 mx-12 sm:mx-0">
            <Link href={"/register"}>Create account</Link>
          </motion.button>
        </motion.div>

        {/* Doctor Image with Animation */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}>
          <Image
            src={image}
            alt="Appointment Doctor"
            objectPosition="right"
            width={300}
            height={200}
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CallToAction;
