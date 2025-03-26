"use client";
import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <div>
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-900 text-white p-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between gap-8">
          {/* Booking Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="md:w-1/3">
            <h3 className="text-lg font-semibold mb-2">
              Book Your Appointment Online
            </h3>
            <p className="text-gray-300">
              Save time and avoid long queues by booking your medical
              appointments online. Choose your preferred doctor, select a
              convenient time, and receive instant confirmation. Experience
              hassle-free healthcare scheduling from anywhere, anytime.
            </p>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="md:w-1/4">
            <h3 className="text-lg font-semibold mb-2">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-blue-400 cursor-pointer">About Us</li>
              <li className="hover:text-blue-400 cursor-pointer">
                Our Services
              </li>
              <li className="hover:text-blue-400 cursor-pointer">
                Contact Support
              </li>
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="md:w-1/4">
            <h3 className="text-lg font-semibold mb-2">Get In Touch</h3>
            <p className="text-gray-300">Need help with your appointment?</p>
            <p className="text-gray-300 mt-2">+263 89347 7454</p>
            <p className="text-gray-300">📧 support@pulseconnect.com</p>
          </motion.div>
        </div>

        {/* Divider & Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8">
          <hr className="h-0.5 bg-gray-700 border-0" />
          <p className="text-center text-gray-400 text-sm pt-4">
            &copy; {new Date().getFullYear()} Medical Clinic. All rights
            reserved.
          </p>
        </motion.div>
      </motion.footer>
    </div>
  );
};

export default Footer;
