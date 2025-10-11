"use client";
import { useMemo } from "react";
import Image from "next/image";

export default function SponsorsSection() {
  const row1 = useMemo(() => [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Nas4Pcssz7-BuWTcGYG2U8wbNPXt5fVihA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsSW5xwqVyySDnCA78DIGzvRQTUHO3DBz-gA&s",
    "https://cdn-media.buildersmart.in/media/mobile/bmobilebrands/shree-tmt1.jpg",
    "https://www.abledesigneering.in/wp-content/uploads/2018/05/Deccan-Auto.jpg",
    "https://d3t0tbmlie281e.cloudfront.net/igi/umd/WEdYNpDtpraW3NnY.full",
  ], []);
  const row2 = useMemo(() => [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkWpMFC5I1VEiFmhmDAcl-rzkKZdcsMNIkFQ&s",
    "https://vectorseek.com/wp-content/uploads/2023/10/C.R.I.-Pumps-Logo-Vector.svg-.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNnu5AjpboFcEqmtktenvRoiIA3O_g1Ygh3A&s",

    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMhRduOpDDCd6sPXGWdUzXKmBOyNyJ9eEOJQ&s",

  ], []);
  const row3 = useMemo(() => [
    "https://heyday-ventures.com/wp-content/uploads/2021/05/pennar-industries-saif-partners-pennar-industries-png-379_424.png",
    "https://www.samkrgpistonsandrings.com/images/samlogo.png",
    "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/042013/untitled-1_62.png?itok=oFFyCpDR",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDXmyFxfxP75CFYnf59ybzU3g8u_4LJm1XCg&s",
    "https://3dconnexion.com/in/wp-content/uploads/sites/61/2020/03/3dconnexion_logo.png",
  ], []);

  const marquee = (items: string[], direction: "left" | "right", key: string) => (
    <div key={key} className="relative overflow-hidden select-none py-3">
      <div
        className={`flex gap-8 whitespace-nowrap will-change-transform animate-[marquee_8s_linear_infinite] ${
          direction === "left" ? "[animation-direction:reverse]" : ""
        }`}
      >
        {/* First set of items */}
        {items.map((imageUrl, idx) => (
          <div key={`${key}-first-${idx}`} className="flex-shrink-0">
            <Image
            width={500}
              height={100}
              src={imageUrl}
              alt={`Sponsor ${idx + 1}`}
              className="h-16 md:h-20 w-auto object-contain transition-all duration-300 hover:scale-110"
            />
          </div>
        ))}
        {/* Second set of items for seamless loop */}
        {items.map((imageUrl, idx) => (
          <div key={`${key}-second-${idx}`} className="flex-shrink-0">
            <Image
            width={500}
              height={100}
              src={imageUrl}
              alt={`Sponsor ${idx + 1}`}
              className="h-16 md:h-20 w-auto object-contain transition-all duration-300 hover:scale-110"
            />
          </div>
        ))}
        {/* Third set of items for extra smoothness */}
        {items.map((imageUrl, idx) => (
          <div key={`${key}-third-${idx}`} className="flex-shrink-0">
            <Image
            width={500}
              height={100}
              src={imageUrl}
              alt={`Sponsor ${idx + 1}`}
              className="h-16 md:h-20 w-auto object-contain transition-all duration-300 hover:scale-110"
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
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}

