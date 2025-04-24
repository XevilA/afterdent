"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "คุณหมอ A",
    image:
      "https://www.ldcdental.com/wp-content/uploads/2025/04/%E0%B8%97%E0%B8%9E%E0%B8%8D.%E0%B9%80%E0%B8%9E%E0%B8%8A%E0%B8%A3%E0%B8%AA%E0%B8%B4%E0%B8%A3%E0%B8%B5.jpg",
  },
  {
    id: 2,
    name: "คุณหมอ B",
    image:
      "https://www.ldcdental.com/wp-content/uploads/2025/04/%E0%B8%97%E0%B8%9E-%E0%B8%84%E0%B8%A1.jpg",
  },
  {
    id: 3,
    name: "คุณหมอ C",
    image:
      "https://www.ldcdental.com/wp-content/uploads/2025/04/%E0%B8%97%E0%B8%8D.%E0%B8%A8%E0%B8%B4%E0%B8%A3%E0%B8%94%E0%B8%B2-%E0%B8%99%E0%B8%B4%E0%B8%A5%E0%B8%A7%E0%B8%A3%E0%B8%B1%E0%B8%95%E0%B8%99%E0%B9%8C.jpg",
  },
  {
    id: 4,
    name: "คุณหมอ D",
    image:
      "https://www.ldcdental.com/wp-content/uploads/2025/04/06-%E0%B8%97%E0%B8%9E%E0%B8%8D.-%E0%B8%9E%E0%B8%A3%E0%B8%8A%E0%B8%99%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B9%8C-%E0%B8%A7%E0%B8%B4%E0%B9%80%E0%B8%A8%E0%B8%A9%E0%B8%99%E0%B8%B4%E0%B8%A1%E0%B8%B4%E0%B8%95%E0%B8%8A%E0%B8%B1%E0%B8%A2Ort.jpg",
  },
  {
    id: 5,
    name: "คุณหมอ E",
    image:
      "\https://www.ldcdental.com/wp-content/uploads/2025/04/%E0%B8%97%E0%B8%8D.%E0%B8%88%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%B4%E0%B8%A1%E0%B8%B2-%E0%B8%82%E0%B8%B2%E0%B8%A7%E0%B8%88%E0%B8%B4%E0%B8%95.jpg",
  },
];

export default function Team() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleMembers = teamMembers.slice(currentIndex, currentIndex + 4);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < teamMembers.length - 4)
      setCurrentIndex(currentIndex + 1);
  };

  return (
    <section className="bg-white py-12 px-4 md:px-8">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900">
          ทันตแพทย์เฉพาะทางของเรา
        </h2>
      </div>

      <div className="relative flex items-center justify-center">
        {/* Left Button */}
        <button
          onClick={handlePrev}
          className="absolute left-0 z-10 p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Team Carousel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-10">
          {visibleMembers.map((member) => (
            <div key={member.id} className="flex flex-col items-center">
              <div className="rounded-lg overflow-hidden shadow-md w-full aspect-square">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-full rounded-md"
                />
              </div>
              <p className="mt-2 text-sm font-medium text-gray-700">
                {member.name}
              </p>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={handleNext}
          className="absolute right-0 z-10 p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* View All Button */}
      <div className="text-center mt-8">
        <button className="px-5 py-2 rounded-lg bg-blue-900 text-white font-medium hover:bg-blue-800 transition">
          ดูทั้งหมด
        </button>
      </div>
    </section>
  );
}
