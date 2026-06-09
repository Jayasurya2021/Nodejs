import React, { useState, useEffect } from "react";

// SlideBar component implements a hero image slider using Tailwind CSS.
// It mimics the original Alpine.js behavior with React state and effects.
export default function SlideBar() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const slides = [
    {
      title: "Objavte nové obzory",
      description: "Cestovateľské zážitky, ktoré vám zmenia život",
      buttonText: "Rezervovať",
      buttonUrl: "#",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    },
    {
      title: "Prírodné krásy",
      description: "Nádherné výhľady a čistá príroda",
      buttonText: "Pozrieť ponuku",
      buttonUrl: "#",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    },
    {
      title: "Mestské dobrodružstvo",
      description: "Moderné mestá plné života a kultúry",
      buttonText: "Viac informácií",
      buttonUrl: "#",
      image:
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    },
  ];

  // Autoplay effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoplay) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [autoplay, slides.length]);

  const next = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goTo = (index) => {
    setCurrentSlide(index);
  };

  const fallbackImages = [
    "https://picsum.photos/id/1018/1920/1080",
    "https://picsum.photos/id/1015/1920/1080",
    "https://picsum.photos/id/1019/1920/1080",
  ];

  const handleImageError = (e) => {
    e.target.src = fallbackImages[currentSlide % fallbackImages.length];
  };

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      <div className="relative h-[80vh] min-h-[500px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-800 ${{
              opacity: currentSlide === index ? 1 : 0,
            }}`}
            style={{ opacity: currentSlide === index ? 1 : 0 }}
          >
            <div className="absolute inset-0 bg-gray-800">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover opacity-80"
                loading="lazy"
                onError={handleImageError}
              />
            </div>
            <div className="container mx-auto px-6 h-full flex items-center">
              <div
                className={`max-w-2xl text-white slide-content transition-all duration-600 ease-in-out transform ${
                  currentSlide === index ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                }`}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl md:text-2xl mb-8">{slide.description}</p>
                <a
                  href={slide.buttonUrl}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors fade-in"
                >
                  {slide.buttonText}
                </a>
              </div>
            </div>
          </div>
        ))}
        {/* Navigation Buttons */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center z-10 transition-all"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center z-10 transition-all"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        {/* Indicator Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                currentSlide === idx ? "bg-white w-4 md:w-6" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}