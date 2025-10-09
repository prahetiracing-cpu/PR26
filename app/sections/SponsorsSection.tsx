"use client";
import { useMemo } from "react";

export default function SponsorsSection() {
  const row1 = useMemo(() => [
    "https://via.placeholder.com/200x100/ef4444/ffffff?text=SpeedX",
    "https://via.placeholder.com/200x100/3b82f6/ffffff?text=VoltWorks",
    "https://via.placeholder.com/200x100/10b981/ffffff?text=Apex+Dynamics",
    "https://via.placeholder.com/200x100/f59e0b/ffffff?text=Redline+Labs",
    "https://via.placeholder.com/200x100/8b5cf6/ffffff?text=TorqueOne",
    "https://via.placeholder.com/200x100/ef4444/ffffff?text=CarbonCore",
    "https://via.placeholder.com/200x100/3b82f6/ffffff?text=IgniteAI",
    "https://via.placeholder.com/200x100/10b981/ffffff?text=NitroTech",
    "https://via.placeholder.com/200x100/f59e0b/ffffff?text=VectorShift",
    "https://via.placeholder.com/200x100/8b5cf6/ffffff?text=Roadster+Inc"
  ], []);
  const row2 = useMemo(() => [
    "https://via.placeholder.com/200x100/ef4444/ffffff?text=HyperFuse",
    "https://via.placeholder.com/200x100/3b82f6/ffffff?text=TrackMate",
    "https://via.placeholder.com/200x100/10b981/ffffff?text=GripPro",
    "https://via.placeholder.com/200x100/f59e0b/ffffff?text=Fusion+Motors",
    "https://via.placeholder.com/200x100/8b5cf6/ffffff?text=Helix+Systems",
    "https://via.placeholder.com/200x100/ef4444/ffffff?text=Quantum+Wheels",
    "https://via.placeholder.com/200x100/3b82f6/ffffff?text=DynoEdge",
    "https://via.placeholder.com/200x100/10b981/ffffff?text=Boostify",
    "https://via.placeholder.com/200x100/f59e0b/ffffff?text=Circuitry",
    "https://via.placeholder.com/200x100/8b5cf6/ffffff?text=PitStop+Co"
  ], []);
  const row3 = useMemo(() => [
    "https://via.placeholder.com/200x100/ef4444/ffffff?text=StormDrive",
    "https://via.placeholder.com/200x100/3b82f6/ffffff?text=PulseMotion",
    "https://via.placeholder.com/200x100/10b981/ffffff?text=AeroFlex",
    "https://via.placeholder.com/200x100/f59e0b/ffffff?text=MagnaFuel",
    "https://via.placeholder.com/200x100/8b5cf6/ffffff?text=RaceCraft",
    "https://via.placeholder.com/200x100/ef4444/ffffff?text=CoreFusion",
    "https://via.placeholder.com/200x100/3b82f6/ffffff?text=ThrustWorks",
    "https://via.placeholder.com/200x100/10b981/ffffff?text=NeonTech",
    "https://via.placeholder.com/200x100/f59e0b/ffffff?text=GearGrid",
    "https://via.placeholder.com/200x100/8b5cf6/ffffff?text=Slipstream"
  ], []);

  const marquee = (items: string[], direction: "left" | "right", key: string) => (
    <div key={key} className="relative overflow-hidden select-none py-3">
      <div
        className={`flex gap-8 whitespace-nowrap will-change-transform animate-[marquee_12s_linear_infinite] ${
          direction === "left" ? "[animation-direction:reverse]" : ""
        }`}
      >
        {[...items, ...items].map((imageUrl, idx) => (
          <div key={`${key}-${idx}`} className="flex-shrink-0">
            <img
              src={imageUrl}
              alt={`Sponsor ${idx + 1}`}
              className="h-16 md:h-20 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="sponsors" className="relative w-full py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl md:text-5xl font-black tracking-wider mb-10">
          <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">Sponsors</span>
        </h2>

        {/* Marquee rows */}
        {marquee(row1, "right", "row1")}
        {marquee(row2, "left", "row2")}
        {marquee(row3, "right", "row3")}
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

