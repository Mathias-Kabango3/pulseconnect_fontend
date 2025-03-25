"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { clsx } from "clsx";
import Image from "next/image";
import img from "@/assets/images/logo2.png";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuLinks = [
    { href: "/", label: "Home" },
    { href: "/doctors", label: "Doctors" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className=" border-gray-200 dark:bg-gray-900 sticky top-0 z-50 font-[Poppins] mb-2 bg-[#192655] text-slate-50">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4 ">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-1">
          <Image
            src={img}
            alt="logo"
            className="w-12 h-12 rounded-full bg-[#192655]"
          />
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 text-transparent bg-clip-text">
            {" "}
            PulseConnect
          </h1>
        </Link>

        {/* Menu Button (for Mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 cursor-pointer"
          aria-expanded={menuOpen}>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Navbar Links for Desktop */}
        <div className="hidden md:flex space-x-4 font-medium text-md md:text-lg md:space-x-8">
          {menuLinks.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={clsx(
                "text-slate-50 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-gray-100",
                { "text-blue-600 dark:text-blue-300": pathname === item.href }
              )}>
              {item.label.toUpperCase()}
            </Link>
          ))}
        </div>

        {/* Login & Register Buttons (Desktop) */}
        <div className="hidden lg:flex space-x-4">
          <Link
            href="/login"
            className="lg:px-12 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-3xl px-4">
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 lg:px-12  py-3 text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white rounded-3xl">
            Register
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50">
          <div className="absolute top-0 left-0 w-2/4 h-full bg-white dark:bg-gray-800 shadow-lg p-6">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-400">
              <X size={20} className="text-gray-600 dark:text-gray-400" />
            </button>
            <ul className="mt-8 space-y-4">
              {menuLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    href={`${item.href}`}
                    className="block py-2 px-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                    onClick={() => setMenuOpen(false)}>
                    {item.label.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Login Button */}
            <div className="mt-6">
              <Link
                href="/register"
                className="block text-center py-2 px-4 text-blue-500 border-2 hover:text-white rounded-md hover:bg-blue-700 border-blue-500 ">
                Register
              </Link>
              <Link
                href="/login"
                className="block text-center py-2 px-4 mt-4 text-white bg-[#5F6FFF] hover:bg-blue-700 rounded-md">
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
