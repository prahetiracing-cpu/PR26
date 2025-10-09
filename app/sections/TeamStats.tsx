'use client';

import { useState, useEffect, useRef } from 'react';

// Hex Color Definitions used:
// Black: #000000
// White: #FFFFFF
// Light Gray Border: #E5E7EB (gray-200)

interface Stat {
  label: string;
  value: number;
  suffix: string;
  duration: number;
}

interface StatCardProps {
  stat: Stat;
  isVisible: boolean;
  index: number;
}

/**
 * Renders an animated statistics card.
 * Handles both the counting animation for the number and the slide-up animation for the card itself.
 */
const StatCard: React.FC<StatCardProps> = ({ stat, isVisible, index }) => {
  const [count, setCount] = useState<number>(0);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);

  // Effect for the number counting animation
  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
      let startTime: number | null = null;
      
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / stat.duration, 1);
        
        // Easing function (Ease Out Quart) for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
        const currentCount = Math.floor(easeOutQuart * stat.value);
        
        setCount(currentCount);
        
        if (percentage < 1) {
          requestAnimationFrame(animateCount);
        } else {
          setCount(stat.value);
        }
      };
      
      requestAnimationFrame(animateCount);
    }
  }, [isVisible, stat.value, stat.duration, hasAnimated]);

  return (
    <div id="team"
      // Responsive Container and Hover Effects
      className="group relative overflow-hidden rounded-2xl bg-[#FFFFFF] p-6 sm:p-8 
                 border-2 border-[#E5E7EB] hover:border-[#000000] 
                 transition-all duration-500 
                 sm:hover:scale-[1.05] lg:hover:scale-110 sm:hover:shadow-2xl sm:hover:-translate-y-2" // Added 'sm:' prefix to movement effects
      
      // Card entry animation (Slide Up)
      style={{
        // Apply animation only when visible, with a delay based on its index
        animation: isVisible 
          ? `slideUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards ${index * 150}ms` 
          : 'none',
        opacity: isVisible ? 1 : 0, // Ensure initial state is hidden
      }}
    >
      {/* Background/Hover effects - Simple white/black transition */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[#FFFFFF]"
      ></div> 
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-baseline justify-center mb-4">
          {/* Main Number - Removed font-extrabold and set to font-normal */}
          <span 
            className="text-6xl sm:text-7xl lg:text-8xl font-normal text-[#000000] transition-all duration-500"
            // Filter is used for hex-based drop shadow
            style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))' }}
          >
            {count}
          </span>
          {/* Suffix - Set to font-normal */}
          <span 
            className="text-4xl sm:text-5xl text-[#000000] ml-1 font-normal"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))' }}
          >
            {stat.suffix}
          </span>
        </div>
        
        <div className="relative">
          {/* Stat Label - Still font-bold for emphasis */}
          <p 
            className="text-xs sm:text-sm font-bold text-[#ff0000] text-center uppercase tracking-widest transition-colors duration-300"
          >
            {stat.label}
          </p>
        </div>
      </div>
      
      {/* Corner accents - Using custom class syntax for borders to make hex codes clear */}
      <div 
        className="absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-12 rounded-tr-2xl transition-colors duration-300
                   border-t-2 border-r-2 border-[rgba(0,0,0,0.2)] group-hover:border-[#000000]"
      ></div>
      <div 
        className="absolute bottom-0 left-0 w-8 h-8 sm:w-12 sm:h-12 rounded-bl-2xl transition-colors duration-300
                   border-b-2 border-l-2 border-[rgba(0,0,0,0.2)] group-hover:border-[#000000]"
      ></div>
      
      {/* Additional corner glow/accent circles - Black */}
      <div 
        className="absolute top-0 left-0 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg bg-[#000000]"
      ></div>
      <div 
        className="absolute bottom-0 right-0 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg bg-[#000000]"
      ></div>
    </div>
  );
};

export default function App() {
  // FIX: Correctly include setIsVisible in the useState destructuring
  const [isVisible, setIsVisible] = useState<boolean>(false); 
  const sectionRef = useRef<HTMLElement | null>(null);

  const stats: Stat[] = [
    { label: 'Years of Experience', value: 14, suffix: '+', duration: 2000 },
    { label: 'Team Members', value: 40, suffix: '+', duration: 2400 },
    { label: 'Vehicles Built', value: 5, suffix: '+', duration: 1600 },
    { label: 'Competitions', value: 10, suffix: '+', duration: 2200 },
    { label: 'Awards', value: 5, suffix: '+', duration: 1800 }
  ];

  // Intersection Observer for triggering animations when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Optional: Reset animation state if desired, but typically we keep it animated once seen
          // setIsVisible(false);
        }
      },
      { threshold: 0.3 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [setIsVisible]); // Added setIsVisible to dependencies to be thorough

  // Inject CSS Keyframes for the card slide-up animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideUp {
        0% {
          opacity: 0;
          transform: translateY(30px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section 
      id="teamstat" 
      ref={sectionRef}
      // Responsive padding and White background
      className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 py-20 relative overflow-hidden bg-[#FFFFFF] font-sans"
    >
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center mb-12 sm:mb-20">
          
          {/* Heading: Responsive sizing and Black text */}
          <h2 
            className="text-5xl sm:text-6xl lg:text-8xl font-black text-[#000000] mb-4 tracking-tight"
          >
            OUR LEGACY
          </h2>
          {/* Subheading: Black text and tracking */}
          <p 
            className="text-base sm:text-lg font-black text-[#000000] tracking-[0.3em] uppercase"
          >
            In Numbers
          </p>
          
        </div>
        
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              isVisible={isVisible}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
