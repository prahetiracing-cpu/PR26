"use client";
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HomeSection() {
  const prethiRef = useRef<HTMLDivElement>(null);
  const racingRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const backgroundElementsRef = useRef<HTMLDivElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);
  const racingTrackRef = useRef<HTMLDivElement>(null);
  const speedometerRef = useRef<HTMLDivElement>(null);
  const soundWaveRef = useRef<HTMLDivElement>(null);

  const [hoverParticles, setHoverParticles] = useState<Array<{id: number, x: number, y: number, vx: number, vy: number, life: number}>>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('/catStart.wav');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3; // Set volume to 30%
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Audio hover handlers
  const handlePrethiHover = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  };

  const handlePrethiLeave = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset to beginning
    }
  };

  // Hover particle explosion
  const createHoverExplosion = (x: number, y: number) => {
    const explosionParticles = Array.from({ length: 15 }, () => ({
      id: Math.random(),
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      life: 30
    }));
    
    setHoverParticles(prev => [...prev, ...explosionParticles]);
  };

  // Animate hover particles
  useEffect(() => {
    const animateHoverParticles = () => {
      setHoverParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life - 1
        })).filter(particle => particle.life > 0)
      );
    };

    const interval = setInterval(animateHoverParticles, 16);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Set initial positions with 3D transforms
    gsap.set([prethiRef.current, racingRef.current], { opacity: 0 });
    gsap.set(prethiRef.current, { x: 200, rotationY: 45, z: -100 });
    gsap.set(racingRef.current, { x: -200, rotationY: -45, z: -100 });
    gsap.set(buttonRef.current, { opacity: 0, y: 50, scale: 0.8 });

    // Create timeline for animations
    const tl = gsap.timeline({ delay: 0.5 });

    // Animate text elements with 3D transforms
    tl.to(prethiRef.current, {
      x: 0,
      rotationY: 0,
      z: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out"
    })
    .to(racingRef.current, {
      x: 0,
      rotationY: 0,
      z: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out"
    }, "-=0.8")
    .to(buttonRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.4");

    // Background motion elements with morphing
    if (backgroundElementsRef.current) {
      gsap.to(Array.from(backgroundElementsRef.current.children), {
        rotation: 360,
        scaleX: 2,
        scaleY: 0.5,
        duration: 20,
        repeat: -1,
        ease: "none",
        stagger: 0.5,
        yoyo: true
      });
    }

    // Sound wave animation
    if (soundWaveRef.current) {
      gsap.to(Array.from(soundWaveRef.current.children), {
        scaleY: 2,
        duration: 0.5,
        repeat: -1,
        ease: "power2.inOut",
        stagger: 0.1,
        yoyo: true
      });
    }

    // Parallax scrolling effect
    gsap.to(backgroundElementsRef.current, {
      y: -100,
      scrollTrigger: {
        trigger: "#home",
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center px-8 bg-white overflow-hidden">
      {/* Hover Particle Explosions */}
      <div ref={particleContainerRef} className="absolute inset-0 pointer-events-none">
        {hoverParticles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-80"
            style={{
              left: particle.x,
              top: particle.y,
              transform: `scale(${particle.life / 30})`,
              opacity: particle.life / 30
            }}
          />
        ))}
      </div>



      {/* Sound Wave Visualization */}
      <div 
        ref={soundWaveRef}
        className="absolute bottom-8 left-8 z-30 flex items-end space-x-1"
      >
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="w-1 bg-gradient-to-t from-red-500 to-yellow-400 rounded-full"
            style={{ height: `${Math.random() * 40 + 10}px` }}
          />
        ))}
      </div>

      {/* Background Racing Elements with Morphing */}
      <div ref={backgroundElementsRef} className="absolute inset-0 pointer-events-none">
        {/* Racing stripes that morph */}
        <div className="absolute top-1/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/20 to-transparent transform -rotate-12 morphing-stripe"></div>
        <div className="absolute top-2/3 right-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/15 to-transparent transform rotate-12 morphing-stripe"></div>
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-400/10 to-transparent transform rotate-3 morphing-stripe"></div>
        
        {/* Racing circles that morph to stripes */}
        <div className="absolute top-20 right-20 w-4 h-4 border-2 border-red-500/20 rounded-full morphing-circle"></div>
        <div className="absolute bottom-32 left-16 w-6 h-6 border-2 border-gray-400/15 rounded-full morphing-circle"></div>
        <div className="absolute top-1/3 left-1/4 w-3 h-3 border-2 border-red-500/25 rounded-full morphing-circle"></div>
        <div className="absolute bottom-1/4 right-1/3 w-5 h-5 border-2 border-gray-400/20 rounded-full morphing-circle"></div>
        
        {/* Racing lines */}
        <div className="absolute top-1/6 left-1/6 w-32 h-0.5 bg-gradient-to-r from-red-500/10 to-transparent transform rotate-45"></div>
        <div className="absolute bottom-1/6 right-1/6 w-24 h-0.5 bg-gradient-to-l from-red-500/15 to-transparent transform -rotate-45"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Main Title with Holographic Effects */}
        <div className="flex flex-col items-center space-y-4 mb-12">
          <div 
            ref={prethiRef}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-wider relative holographic-text"
            onMouseEnter={(e) => {
              createHoverExplosion(e.clientX, e.clientY);
              handlePrethiHover();
            }}
            onMouseLeave={handlePrethiLeave}
          >
            <span className="bg-gradient-to-r from-red-600 via-yellow-500 to-red-500 bg-clip-text text-transparent glitch-text">
              PRETHI
            </span>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-60"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-yellow-500/20 blur-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <div 
            ref={racingRef}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-wider relative"
            onMouseEnter={(e) => createHoverExplosion(e.clientX, e.clientY)}
          >
            <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent">
              RACING
            </span>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-60"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-400/10 to-gray-500/10 blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Subtitle */}
        <div className="mb-12 opacity-0 animate-[fadeInUp_1s_ease-out_1.5s_forwards]">
          <p className="text-xl md:text-2xl text-gray-600 font-light tracking-wide">
            Speed • Accuracy Engineered
          </p>
          <div className="mt-4 w-24 h-0.5 bg-gradient-to-r from-red-500 to-yellow-500 mx-auto"></div>
        </div>

        {/* Recruitment Button with Liquid Effects */}
        <div className="opacity-0 animate-[fadeInUp_1s_ease-out_2s_forwards]">
          <button 
            ref={buttonRef}
            className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-lg uppercase tracking-wider rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 liquid-button"
            onMouseEnter={(e) => createHoverExplosion(e.clientX, e.clientY)}
          >
            <span className="relative z-10">Recruitment Open</span>
            
            {/* Liquid effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 liquid-overlay"></div>
            
            {/* Button glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            
            {/* Racing lines on hover */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>


      {/* Custom CSS for futuristic effects */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }

        @keyframes morph {
          0% { border-radius: 50%; transform: scale(1); }
          50% { border-radius: 0%; transform: scale(1.2); }
          100% { border-radius: 50%; transform: scale(1); }
        }

        @keyframes liquid {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(180deg); }
          100% { transform: scale(1) rotate(360deg); }
        }

        .glitch-text {
          animation: glitch 0.3s infinite;
        }

        .holographic-text {
          text-shadow: 
            0 0 5px rgba(239, 68, 68, 0.5),
            0 0 10px rgba(239, 68, 68, 0.3),
            0 0 15px rgba(239, 68, 68, 0.2);
        }

        .clear-text {
          text-shadow: none;
        }

        .morphing-circle {
          animation: morph 4s ease-in-out infinite;
        }

        .morphing-stripe {
          animation: morph 6s ease-in-out infinite;
        }

        .liquid-button {
          overflow: hidden;
        }

        .liquid-overlay {
          animation: liquid 2s ease-in-out infinite;
        }

        .holographic-text:hover {
          animation: glitch 0.1s infinite;
        }
      `}</style>
    </section>
  );
}