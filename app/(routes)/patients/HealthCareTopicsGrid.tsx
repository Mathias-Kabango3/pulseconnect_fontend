import React from "react";
import Image from "next/image";
import immune from "@/assets/images/immune.jpg"
import bone from '@/assets/images/neurons.jpg'
import joint from "@/assets/images/can.jpg"
import sys from '@/assets/images/system.jpg'
const HealthTopicsGrid = () => {
  const topics = [
    {
      title: "Allergies, Blood & Immune Systems",
      image: immune,
    },
    {
      title: "Bones, joints and muscles",
      image: sys
    },
    {
      title: "Brain and nerves",
      image: bone,
    },
    {
      title: "Cancer",
      image: joint,
    },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Health topics</h2>
      <p className="text-lg mb-8">
        Advice and clinical information on a wide variety of healthcare topics
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {topics.map((topic, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <Image
              src={topic.image}
              alt={topic.title}
              width={90}
              height={90}
              className="w-full h-32 object-cover mb-4 rounded-lg"
            />
            <h3 className="text-xl font-semibold">{topic.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthTopicsGrid;
