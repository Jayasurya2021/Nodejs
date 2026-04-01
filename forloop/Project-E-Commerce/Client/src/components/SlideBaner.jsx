import React, { useEffect, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
  "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
  "https://images.unsplash.com/photo-1503602642458-232111445657",
];

const SlideBaner = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); // 3 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[50vh] overflow-hidden">
      
      {/* Background Images */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={img}
            alt="banner"
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Welcome to Our Store
          </h1>
          <p className="mt-4 text-lg">
            Discover the best products at unbeatable prices
          </p>

          <button className="mt-6 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
            Shop Now
          </button>
        </div>
      </div>

    </div>
  );
};

export default SlideBaner;