"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Search, Bell, MessageCirclePlus } from "lucide-react";
import Image from "next/image";

const AdminNavbar = () => {
  const { user } = useAuth();

  const getAvatarUrl = () => {
    if (user?.profilePicture) {
      return user.profilePicture;
    }
    return `https://api.dicebear.com/8.x/initials/svg?seed=${user?.firstName}`;
  };

  return (
    <div className="flex justify-between items-center py-4 px-6 bg-white mb-8">
      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <Search
          size={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Notification Bell & User Profile */}
      <div className="flex items-center space-x-6">
        {/* Notification Bell */}
        <div className="relative cursor-pointer">
          <Bell size={24} className="text-gray-500 hover:text-blue-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            3
          </span>
        </div>
        <div className="relative cursor-pointer mr-8">
          <MessageCirclePlus className="hover:text-blue-400" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            11
          </span>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-3 mr-8">
          <Image
            src={getAvatarUrl()}
            alt="User icon"
            className="w-10 h-10 rounded-full bg-blue-400 object-contain"
            width={48}
            height={48}
          />
          <div className="text-sm">
            <p className="font-light text-gray-900 text-lg">
              {user?.firstName}
            </p>
            <p className="text-blue-500 text-xs">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
