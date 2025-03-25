"use client";
import img from "@/assets/images/logo2.png";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { Menu, X } from "lucide-react"; // Import icons for the hamburger menu

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const pathname = usePathname();
  const { logout, user } = useAuth();

  const menuLinks = [
    { href: "/patients", label: "Home" },
    { href: "/patients/doctors", label: "Doctors" },
    { href: "/patients/appointments", label: "Appointments" },
    { href: "/patients/profile", label: "Profile" },
  ];

  const getAvatarUrl = () => {
    if (user?.profilePicture) {
      return user.profilePicture;
    }
    return `https://api.dicebear.com/8.x/initials/svg?seed=${user?.firstName}`;
  };

  return (
    <nav className="border-gray-200 dark:bg-gray-900 sticky top-0 z-50 font-[Poppins] mb-2 bg-[#192655]">
      <div className="max-w-screen-2xl flex items-center justify-between mx-auto p-4 static top-0">
        {/* Logo */}
        <Link href="/patients" className="flex items-center space-x-2">
          <Image
            src={img}
            alt="logo"
            className="w-12 h-12 rounded-full bg-[#192655]"
          />
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 text-transparent bg-clip-text">
            PulseConnect
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-6">
          {menuLinks.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={clsx(
                "text-white hover:text-blue-300 transition duration-300 text-lg",
                { "font-bold underline": pathname === item.href }
              )}>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="lg:hidden text-white focus:outline-none cursor-pointer"
          aria-label="Toggle Menu">
          {showMobileMenu ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Profile Section */}
        <div
          className="relative hidden lg:block"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}>
          {/* Profile Icon */}
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src={getAvatarUrl()}
              alt="user icon"
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full"
              width={40}
              height={40}
            />
            <span className="text-white text-lg font-semibold">
              {user?.firstName} {user?.lastName}
            </span>
          </div>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 w-48 bg-white rounded-lg shadow-lg p-2">
              {menuLinks.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md">
                  {item.label}
                </Link>
              ))}
              <button
                onClick={logout}
                className="mt-2 w-full text-center py-2 px-4 text-white bg-red-400 hover:text-red-700 hover:bg-slate-200 rounded-md transition-colors duration-200">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {showMobileMenu && (
        <div className="lg:hidden bg-[#192655] py-4 px-6 space-y-2">
          {menuLinks.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block text-white text-lg hover:text-blue-300"
              onClick={() => setShowMobileMenu(false)} // Close menu on click
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={logout}
            className="mt-2 w-full text-center py-2 px-4 text-white bg-red-400 hover:text-red-700 hover:bg-slate-200 rounded-md transition-colors duration-200">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
