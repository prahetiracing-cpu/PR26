"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Mail, Instagram, Youtube } from "lucide-react";

// Dynamically import MapContainer to disable SSR
const MapComponent = dynamic(() => import("./MapContainer"), { ssr: false });

const FooterSection = () => {
  return (
    <footer className="bg-white text-gray-800 px-6 md:px-16 border-t border-gray-200 shadow-inner">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
        
        {/* Left side - Car Image */}
        <div className="flex flex-col md:w-1/2 items-center md:items-start space-y-3">
          <Image
            src="/carSticker.png"
            width={500}
            height={100}
            alt="Car Sticker"
            className="w-56 md:w-100 md:h-90 object-contain transition-transform hover:scale-105 duration-300"
          />
          <p className="text-sm text-gray-500 md:text-left text-center">
            © 2025 Praheti Racing. All rights reserved.
          </p>
        </div>

        {/* Right side - Map and Icons */}
        <div className="flex flex-col md:w-1/2 md:mt-20 justify-center items-center space-y-5">
          <div className="w-84 md:w-100 md:h-70 h-50 rounded-xl overflow-hidden border border-gray-300 shadow-md">
            <MapComponent />
          </div>

          {/* Social Icons */}
          <div className="flex space-x-6 justify-center items-center">
            <a
              href="https://www.instagram.com/prahetiracing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-pink-500 transition-colors duration-200"
            >
              <Instagram size={26} />
            </a>
            <a
              href="mailto:prahetiracing@cbit.ac.in"
              className="text-gray-700 hover:text-blue-500 transition-colors duration-200"
            >
              <Mail size={26} />
            </a>
            <a
              href="https://www.youtube.com/@prahetiracing"
              className="text-gray-700 hover:text-blue-500 transition-colors duration-200"
            >
              <Youtube size={26} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
