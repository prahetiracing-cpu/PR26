"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// @ts-ignore
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Mail, Instagram, Youtube } from "lucide-react";

const FooterSection = () => {
  const position: [number, number] = [17.390663, 78.316905]; // Example: Hyderabad

  const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <footer className="bg-white text-gray-800  px-6 md:px-16 border-t border-gray-200 shadow-inner">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
        
        {/* Left side - Car Image */}
        <div className="flex flex-col md:w-1/2 items-center md:items-start space-y-3">
          <img
            src="/carSticker.png"
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
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position} icon={markerIcon}>
                <Popup>Event Location</Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-6 justify-center items-center">
            <a
              href="https://www.youtube.com/@prahetiracing"
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
