"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin
gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.set([textRef.current, imageRef.current], { opacity: 0 });
    gsap.set(textRef.current, { y: 60 });
    gsap.set(imageRef.current, { y: 60 });
    gsap.set(headingRef.current, { opacity: 0, y: 50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(headingRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(
        textRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .to(
        imageRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.8"
      );
  }, []);

  return (
    <section
      id="about"
      className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-hidden flex flex-col items-center justify-center text-center"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/6 right-0 w-full h-0.5 bg-gradient-to-l from-red-500/20 to-transparent transform -rotate-12"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-0.5 bg-gradient-to-r from-red-500/15 to-transparent transform rotate-12"></div>
        <div className="absolute top-2/3 left-1/4 w-64 h-0.5 bg-gradient-to-r from-transparent via-gray-400/10 to-transparent transform rotate-6"></div>
      </div>

      <div className="relative z-10 max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="text-5xl md:text-6xl font-black tracking-wider text-gray-900 mb-4"
          >
            <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              ABOUT US
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-gray-500 mx-auto"></div>
        </div>

        {/* Centered Content */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 max-w-6xl">
          {/* Text */}
          <div ref={textRef} className="max-w-xl text-center space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-wide">
              Speed Meets
              <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                {" "}
                Innovation
              </span>
            </h3>

            <p className="text-xl text-gray-700 leading-relaxed font-medium">
              Praheti Racing — Engineering Speed & Innovation Since 2012
            </p>

            <p className="text-lg text-gray-600 leading-relaxed mt-4">
              Praheti Racing is an independent and student-driven motorsport organization
              from Chaitanya Bharathi Institute of Technology (CBIT), Hyderabad. With a
              legacy spanning over a decade, we are a team of 50 passionate and
              performance-driven students working under a structured 3-tier technical and
              management system.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed mt-4">
              Representing diverse engineering disciplines, we collaborate with a single
              mission: pushing boundaries in global student motorsport. Since our
              inception in 2012, we have contributed to advancing the Indian automotive
              sector by designing, developing, and innovating high-performance
              formula-style race machines that reflect precision engineering and
              sustainable design practices.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed mt-4">
              Our participation in the prestigious Formula SAE competitions challenges us
              to conceive, design, fabricate, and race cutting-edge formula student cars.
              The team is rigorously evaluated across dynamic track events, vehicle
              performance, engineering design, cost & manufacturing strategies, and driver
              skill — shaping members into world-class engineers and leaders with strong
              technical and entrepreneurial capabilities.
            </p>

            <div className="flex items-center gap-6 mt-6">
              <a
                href="https://www.instagram.com/prahetiracing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold hover:underline"
              >
                Follow us on Instagram
              </a>
              <a
                href="mailto:prahetiracing@cbit.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold hover:underline"
              >
                Contact us by Mail
              </a>
              <a
                href="https://www.youtube.com/@prahetiracing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold hover:underline"
              >
                Watch on YouTube
              </a>
            </div>

          </div>

          {/* Image */}
          <div ref={imageRef} className="relative group flex md:flex-col justify-between">
            <div className="w-80 h-60 sm:w-[26rem] md:mb-10 sm:h-[18rem] bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 rounded-2xl shadow-2xl overflow-hidden relative">
              <img
                src="/car.jpg"
                alt="Racing Car"
                className="w-full h-full object-cover opacity-90"
              />
              {/* Overlay lines */}
              <div className="absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500/40 to-transparent transform -rotate-12"></div>
              <div className="absolute bottom-1/3 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-12"></div>
              
            </div>
            <div className="md:flex hidden w-80 h-60 sm:w-[26rem] sm:h-[18rem] bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 rounded-2xl shadow-2xl overflow-hidden relative">
              <img
                src="/car.jpg"
                alt="Racing Car"
                className="w-full h-full object-cover opacity-90"
              />
              {/* Overlay lines */}
              <div className="absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500/40 to-transparent transform -rotate-12"></div>
              <div className="absolute bottom-1/3 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-12"></div>
            </div>
          </div>
        </div>

        {/* Formula Student Section */}
        <div className="w-full py-20 mt-20">
          <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 text-center">
            <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              What is Formula Student?
            </span>
          </h3>
          <div className="mt-4 w-32 h-1 bg-gradient-to-r from-red-500 to-gray-500 rounded-full mx-auto"></div>
          <p className="mt-8 text-lg leading-relaxed text-gray-700 max-w-5xl mx-auto text-center">
            Formula Student is a prestigious international engineering
            competition where teams of students design, build, and race
            formula-style cars. Beyond speed, teams are evaluated on design,
            innovation, business presentation, and cost effectiveness—fostering
            practical engineering, teamwork, and creativity for real-world
            industry exposure.
          </p>
        </div>
      </div>
    </section>
  );
}
