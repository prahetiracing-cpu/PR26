'use client';

import React, { useState } from 'react';

// const images = Array(10).fill("/logo.png");
const images = Array.from({ length: 6 }, (_, i) => `/events/event${i + 1}.jpg`);


export default function EventsSection() {
  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex(index === 0 ? images.length - 1 : index - 1);
  };

  const nextSlide = () => {
    setIndex(index === images.length - 1 ? 0 : index + 1);
  };

  return (
    <section
      id="events"
      className="min-h-screen flex flex-col items-center px-6 py-20 font-sans bg-white"
    >
      <div className="max-w-7xl w-full mx-auto">
        <h2 className="text-3xl sm:text-5xl font-bold text-black text-center mb-10 tracking-wide">
          PAST EVENTS
          <div 
            className="w-24 mt-4 h-1 mx-auto mb-6"
            style={{ backgroundColor: '#ff0000' }}
          ></div>
        </h2>
        

        {/* Carousel Wrapper */}
        <div className="relative w-full max-w-4xl mx-auto overflow-hidden group">
          {/* Image */}
          <img
            src={images[index]}
            alt={`Event ${index + 1}`}
            className="w-full h-96 object-cover rounded-2xl shadow-lg transition-all duration-500"
          />

          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition"
          >
            ‹
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition"
          >
            ›
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full transition 
                  ${index === i ? 'bg-black' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
