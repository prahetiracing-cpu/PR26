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
  const parallaxOneRef = useRef<HTMLDivElement>(null);
  const parallaxTwoRef = useRef<HTMLDivElement>(null);
  const parallaxThreeRef = useRef<HTMLDivElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);

  const [hoverParticles, setHoverParticles] = useState<Array<{id: number, x: number, y: number, vx: number, vy: number, life: number}>>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
   
  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('/catStart.wav');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.7; // Set volume to 30%
    
    
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
    const audio = audioRef.current;

    // Start playing
    audio.play().catch(console.error);

    // Stop after 5 seconds no matter what
    setTimeout(() => {
      if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0; // resets to the beginning
      }
    }, 5000);
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
    // Set initial positions
    gsap.set([prethiRef.current, racingRef.current], { opacity: 0 });
    gsap.set(prethiRef.current, { x: 200 });
    gsap.set(racingRef.current, { x: -200 });
    gsap.set(buttonRef.current, { opacity: 0, y: 50, scale: 0.8 });

    // Create timeline for animations
    const tl = gsap.timeline({ delay: 0.5 });

    // Animate text elements
    tl.to(prethiRef.current, {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out"
    })
    .to(racingRef.current, {
      x: 0,
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

    // Speedometer needle animation is handled by CSS

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

    // Individual subtle parallax lines
    if (parallaxOneRef.current) {
      gsap.to(parallaxOneRef.current, {
        x: 50,
        opacity: 0.6,
        scrollTrigger: {
          trigger: "#home",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }
    if (parallaxTwoRef.current) {
      gsap.to(parallaxTwoRef.current, {
        x: -60,
        opacity: 0.5,
        scrollTrigger: {
          trigger: "#home",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }
    if (parallaxThreeRef.current) {
      gsap.to(parallaxThreeRef.current, {
        x: 40,
        opacity: 0.4,
        scrollTrigger: {
          trigger: "#home",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }

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




      {/* Background Racing Elements with Morphing */}
      <div ref={backgroundElementsRef} className="absolute inset-0 pointer-events-none">
        {/* Extra parallax stripes */}
        <div ref={parallaxOneRef} className="absolute top-1/3 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-400/20 to-transparent -rotate-6"></div>
        <div ref={parallaxTwoRef} className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-500/15 to-transparent rotate-6"></div>
        <div ref={parallaxThreeRef} className="absolute top-2/3 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-400/10 to-transparent -rotate-2"></div>
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
        <div className="flex flex-col items-center space-y-4 mb-12 mt-32">
          <div 
            ref={prethiRef}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-wider relative holographic-text hover:scale-[1.01] transition-transform duration-200"
            onMouseEnter={(e) => {
              createHoverExplosion(e.clientX, e.clientY);
              handlePrethiHover();
            }}
            onMouseLeave={handlePrethiLeave}
          >
            <span className="bg-[#ff0000] bg-clip-text text-transparent glitch-text">
              PRAHETI
            </span>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-60"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-yellow-500/20 blur-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -z-10 left-1/2 -translate-x-1/2 bottom-[-10px] w-[60%] h-10 rounded-full bg-red-500/20 blur-2xl animate-[pulseGlow_10s_ease-in-out_infinite]"></div>
          </div>
          
          <div 
            ref={racingRef}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-wider relative hover:scale-[1.01] transition-transform duration-200"
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
          <div className="mt-4 w-24 h-0.5 bg-[#ff0000] mx-auto"></div>
        </div>

        {/* Recruitment Button with Liquid Effects */}
       

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

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.15; transform: translateX(-50%) scaleX(1); }
          50% { opacity: 0.35; transform: translateX(-50%) scaleX(1.1); }
        }

        /* Premium Car Animation */
        .car-container {
          position: absolute;
          top: 50%;
          right: -180px;
          width: 180px;
          height: 50px;
          transform: translateY(-50%);
          animation: premiumCarMove 4s ease-in-out infinite;
        }

        .premium-car {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .car-body-premium {
          position: absolute;
          top: 0;
          left: 0;
          width: 160px;
          height: 40px;
          background: linear-gradient(135deg, #1f2937, #111827);
          border-radius: 6px 20px 20px 6px;
          box-shadow: 
            0 8px 25px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .car-hood-premium {
          position: absolute;
          top: 0;
          left: 0;
          width: 35px;
          height: 40px;
          background: linear-gradient(135deg, #374151, #1f2937);
          border-radius: 6px 0 0 6px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);
        }

        .car-windshield-premium {
          position: absolute;
          top: 3px;
          left: 30px;
          width: 25px;
          height: 20px;
          background: linear-gradient(135deg, #1e40af, #1e3a8a);
          border-radius: 0 4px 0 0;
          transform: skewY(-3deg);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.2);
        }

        .car-roof-premium {
          position: absolute;
          top: 3px;
          left: 50px;
          width: 50px;
          height: 20px;
          background: linear-gradient(135deg, #111827, #0f172a);
          border-radius: 0 4px 4px 0;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);
        }

        .car-rear-window-premium {
          position: absolute;
          top: 3px;
          left: 95px;
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #1e40af, #1e3a8a);
          border-radius: 0 4px 0 0;
          transform: skewY(3deg);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.2);
        }

        .car-trunk-premium {
          position: absolute;
          top: 0;
          left: 110px;
          width: 50px;
          height: 40px;
          background: linear-gradient(135deg, #0f172a, #020617);
          border-radius: 0 20px 20px 0;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);
        }

        .car-side-panel {
          position: absolute;
          top: 8px;
          left: 60px;
          width: 40px;
          height: 24px;
          background: linear-gradient(135deg, #374151, #1f2937);
          border-radius: 2px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);
        }

        .wheel-premium {
          position: absolute;
          width: 20px;
          height: 20px;
          bottom: -3px;
        }

        .front-wheel-premium {
          left: 30px;
        }

        .rear-wheel-premium {
          left: 125px;
        }

        .tire-premium {
          position: absolute;
          width: 100%;
          height: 100%;
          background: #0f172a;
          border-radius: 50%;
          animation: wheelSpin 0.08s linear infinite;
          border: 1px solid #374151;
        }

        .wheel-rim-premium {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 16px;
          height: 16px;
          background: linear-gradient(135deg, #6b7280, #4b5563);
          border-radius: 50%;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.2);
        }

        .brake-caliper {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 8px;
          height: 8px;
          background: #ef4444;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 4px rgba(239, 68, 68, 0.5);
        }

        .racing-number-premium {
          position: absolute;
          top: 12px;
          left: 70px;
          color: #fbbf24;
          font-weight: 900;
          font-size: 12px;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
          letter-spacing: 1px;
        }

        .side-mirror-premium {
          position: absolute;
          top: 6px;
          left: 25px;
          width: 6px;
          height: 4px;
          background: #374151;
          border-radius: 2px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }

        .door-handle-premium {
          position: absolute;
          top: 16px;
          left: 65px;
          width: 10px;
          height: 2px;
          background: #6b7280;
          border-radius: 1px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.2);
        }

        .exhaust-premium {
          position: absolute;
          top: 28px;
          left: 155px;
          width: 4px;
          height: 6px;
          background: #374151;
          border-radius: 2px;
          box-shadow: 0 0 2px rgba(0,0,0,0.5);
        }

        .spoiler {
          position: absolute;
          top: -2px;
          left: 140px;
          width: 20px;
          height: 4px;
          background: linear-gradient(135deg, #1f2937, #111827);
          border-radius: 2px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .speed-lines-premium {
          position: absolute;
          top: 50%;
          right: -25px;
          width: 20px;
          height: 1px;
          background: linear-gradient(90deg, #ef4444, transparent);
          transform: translateY(-50%);
          animation: speedLinesPremium 0.3s ease-out infinite;
        }

        .air-flow {
          position: absolute;
          top: 8px;
          right: -15px;
          width: 12px;
          height: 1px;
          background: linear-gradient(90deg, #fbbf24, transparent);
          transform: translateY(-50%);
          animation: airFlow 0.4s ease-out infinite;
        }

        @keyframes premiumCarMove {
          0% {
            right: -180px;
            transform: translateY(-50%) scale(1);
          }
          50% {
            right: 50%;
            transform: translateY(-50%) scale(1.02);
          }
          100% {
            right: calc(100% + 180px);
            transform: translateY(-50%) scale(1);
          }
        }

        @keyframes wheelSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes speedLinesPremium {
          0% { opacity: 0; transform: translateY(-50%) translateX(0); }
          50% { opacity: 1; transform: translateY(-50%) translateX(-5px); }
          100% { opacity: 0; transform: translateY(-50%) translateX(-10px); }
        }

        @keyframes airFlow {
          0% { opacity: 0; transform: translateY(-50%) translateX(0); }
          50% { opacity: 0.8; transform: translateY(-50%) translateX(-3px); }
          100% { opacity: 0; transform: translateY(-50%) translateX(-6px); }
        }
      `}</style>
    </section>
  );
}
