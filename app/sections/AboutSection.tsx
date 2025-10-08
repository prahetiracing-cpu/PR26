"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        // Set initial positions
        gsap.set([textRef.current, imageRef.current], { opacity: 0 });
        gsap.set(textRef.current, { x: -100 });
        gsap.set(imageRef.current, { x: 100 });
        gsap.set(headingRef.current, { opacity: 0, y: 50 });

        // Create timeline for animations
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#about",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate elements
        tl.to(headingRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        })
            .to(textRef.current, {
                x: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out"
            }, "-=0.4")
            .to(imageRef.current, {
                x: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out"
            }, "-=0.8");

    }, []);

    return (
        <section id="about" className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-hidden">
            {/* Background Racing Elements */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Racing stripes */}
                <div className="absolute top-1/6 right-0 w-full h-0.5 bg-gradient-to-l from-red-500/20 to-transparent transform -rotate-12"></div>
                <div className="absolute bottom-1/3 left-0 w-full h-0.5 bg-gradient-to-r from-red-500/15 to-transparent transform rotate-12"></div>
                <div className="absolute top-2/3 left-1/4 w-64 h-0.5 bg-gradient-to-r from-transparent via-gray-400/10 to-transparent transform rotate-6"></div>

                {/* Racing circles */}
                <div className="absolute top-32 left-32 w-6 h-6 border-2 border-red-500/15 rounded-full"></div>
                <div className="absolute bottom-40 right-24 w-4 h-4 border-2 border-gray-400/20 rounded-full"></div>
                <div className="absolute top-1/2 right-1/6 w-3 h-3 border-2 border-red-500/25 rounded-full"></div>

                {/* Racing lines */}
                <div className="absolute top-1/4 right-1/3 w-40 h-0.5 bg-gradient-to-l from-red-500/10 to-transparent transform -rotate-45"></div>
                <div className="absolute bottom-1/4 left-1/3 w-32 h-0.5 bg-gradient-to-r from-red-500/15 to-transparent transform rotate-45"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Section Heading */}
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

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Side - Text Content */}
                    <div ref={textRef} className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-wide">
                                Speed Meets
                                <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent"> Innovation</span>
                            </h3>

                            <p className="text-lg text-gray-600 leading-relaxed">
                                Praheti Racing is an independent
                                student organisation in Chaitanya
                                Bharathi Institute of Technology,
                                comprising of 50 students with a
                                normal 3-tier team system structure
                                spread across engineering disciplines
                                and united by a common ambition of
                                being at the forefront of the global
                                student motorsport.
                                Since its inception in 2012, the
                                organisation has been a pioneer in
                                development and deployment of
                                innovative technologies in the Indian
                                Automotive Sector.
                            </p>

                            <p className="text-lg text-gray-600 leading-relaxed">
                                The Formula SAE competitions
                                challenge
                                teams
                                of
                                university
                                undergraduate students to conceive,
                                design, fabricate, develop and compete
                                across the globe with formula-style
                                prototype race cars. The teams are
                                tested in various events which include
                                dynamic and static properties of their
                                car, testing the quality of their
                                manufacturing process, driver’s ability,
                                and pitching their car to venture
                                capabilities  via business presentation.
                            </p>


                        </div>

                        {/* Racing Stats */}


                    </div>

                    {/* Right Side - Image */}
                    <div ref={imageRef} className="relative">
                        {/* Image Container */}
                        <div className="relative group">
                            {/* Main Image Placeholder - Replace with actual racing image */}
                            <div className="aspect-[4/3] bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 rounded-2xl shadow-2xl overflow-hidden relative">
                                {/* Racing car silhouette or placeholder */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-full h-full bg-gradient-to-br from-red-600/20 to-gray-800/40 flex items-center justify-center">
                                        <div className="text-white text-center">
                                            <div className="text-6xl mb-4">🏎️</div>
                                            <p className="text-lg font-semibold">Racing Excellence</p>
                                            <p className="text-sm opacity-80">Replace with actual racing team photo</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Racing stripes overlay */}
                                <div className="absolute inset-0">
                                    <div className="absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500/40 to-transparent transform -rotate-12"></div>
                                    <div className="absolute bottom-1/3 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-12"></div>
                                </div>
                            </div>

                            {/* Floating Racing Elements */}
                            <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                                <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                            </div>

                            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center shadow-lg">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                            </div>

                            {/* Racing speed lines */}
                            <div className="absolute top-1/2 -left-8 w-16 h-0.5 bg-gradient-to-r from-red-500/60 to-transparent transform -rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute top-1/2 -right-8 w-16 h-0.5 bg-gradient-to-l from-red-500/60 to-transparent transform rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        {/* Background decoration */}
                        <div className="absolute -z-10 top-4 left-4 w-full h-full bg-gradient-to-br from-red-500/10 to-gray-600/10 rounded-2xl"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
