"use client";
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-scroll';

gsap.registerPlugin(ScrollTrigger);

interface GearItem {
  id: string;
  label: string;
  position: number;
}

const gearItems: GearItem[] = [
  { id: 'home', label: 'Home', position: 0 },
  { id: 'about', label: 'About', position: 1 },
  { id: 'team', label: 'Team', position: 2 },
  { id: 'events', label: 'Events', position: 3 },
  { id: 'sponsors', label: 'Sponsors', position: 4 }
];

export default function GearNavbar() {
  const gearboxRef = useRef<HTMLDivElement>(null);
  const gearRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [currentGear, setCurrentGear] = useState(0);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartPosition, setDragStartPosition] = useState(0);
  const [isUserDragging, setIsUserDragging] = useState(false);
  const [gearPositions, setGearPositions] = useState<number[]>([]);

  useEffect(() => {
    const gearElement = gearRef.current;
    const gearboxElement = gearboxRef.current;
    const containerElement = containerRef.current;
    if (!gearElement || !gearboxElement || !containerElement) return;

    // Calculate the center position of each gear item
    const calculateGearPositions = () => {
      const items = containerElement.querySelectorAll('.gear-item');
      const positions: number[] = [];
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const containerRect = gearboxElement.getBoundingClientRect();
        const centerX = rect.left - containerRect.left + rect.width / 2 - 30; // 30 is half of gear width (60px)
        positions.push(centerX);
      });
      setGearPositions(positions);
      return positions;
    };

    // Calculate positions after a small delay to ensure DOM is ready
    const initializeGear = () => {
      const positions = calculateGearPositions();
      
      // Set initial position and state
      if (positions.length > 0) {
        setCurrentGear(0); // Set current gear to Home (index 0)
        gsap.set(gearElement, { x: positions[0] });
      }
    };

    // Initialize immediately and after a small delay
    initializeGear();
    setTimeout(initializeGear, 100);

    const updateGearFromScroll = () => {
      if (isUserDragging || gearPositions.length === 0) return;
      
      const sections = gearItems.map(item => document.getElementById(item.id)).filter(Boolean);
      if (sections.length === 0) return;

      const scrollPosition = window.scrollY + window.innerHeight / 2;
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top + window.scrollY;
          const sectionBottom = sectionTop + rect.height;
          if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            if (currentGear !== i) {
              setCurrentGear(i);
              gsap.to(gearElement, { 
                x: gearPositions[i],
                duration: 0.4,
                ease: "back.out(1.2)"
              });
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', updateGearFromScroll);
    window.addEventListener('resize', calculateGearPositions);
    updateGearFromScroll();

    const handleMouseDown = (e: MouseEvent) => {
      if (gearPositions.length === 0) return;
      setIsDragging(true);
      setIsUserDragging(true);
      setDragStartX(e.clientX);
      const matrix = new DOMMatrixReadOnly(getComputedStyle(gearElement).transform);
      setDragStartPosition(matrix.m41);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || gearPositions.length === 0) return;
      const deltaX = e.clientX - dragStartX;
      const newX = dragStartPosition + deltaX;
      const clampedX = Math.max(gearPositions[0], Math.min(gearPositions[gearPositions.length - 1], newX));
      gsap.set(gearElement, { x: clampedX });
    };

    const handleMouseUp = () => {
      if (!isDragging || gearPositions.length === 0) return;
      setIsDragging(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';

      const matrix = new DOMMatrixReadOnly(getComputedStyle(gearElement).transform);
      const currentX = matrix.m41;

      // Find the nearest gear position
      let nearestIndex = 0;
      let minDistance = Math.abs(currentX - gearPositions[0]);
      
      for (let i = 1; i < gearPositions.length; i++) {
        const distance = Math.abs(currentX - gearPositions[i]);
        if (distance < minDistance) {
          minDistance = distance;
          nearestIndex = i;
        }
      }

      // Snap to nearest position
      setCurrentGear(nearestIndex);
      gsap.to(gearElement, {
        x: gearPositions[nearestIndex],
        duration: 0.4,
        ease: "back.out(1.2)"
      });
      
      // Scroll to the corresponding section
      const targetId = gearItems[nearestIndex].id;
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      
      setTimeout(() => {
        setIsUserDragging(false);
      }, 1000);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (gearPositions.length === 0) return;
      setIsDragging(true);
      setIsUserDragging(true);
      setDragStartX(e.touches[0].clientX);
      const matrix = new DOMMatrixReadOnly(getComputedStyle(gearElement).transform);
      setDragStartPosition(matrix.m41);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || gearPositions.length === 0) return;
      e.preventDefault();
      const deltaX = e.touches[0].clientX - dragStartX;
      const newX = dragStartPosition + deltaX;
      const clampedX = Math.max(gearPositions[0], Math.min(gearPositions[gearPositions.length - 1], newX));
      gsap.set(gearElement, { x: clampedX });
    };

    const handleTouchEnd = () => {
      if (!isDragging || gearPositions.length === 0) return;
      setIsDragging(false);

      const matrix = new DOMMatrixReadOnly(getComputedStyle(gearElement).transform);
      const currentX = matrix.m41;

      // Find the nearest gear position
      let nearestIndex = 0;
      let minDistance = Math.abs(currentX - gearPositions[0]);
      
      for (let i = 1; i < gearPositions.length; i++) {
        const distance = Math.abs(currentX - gearPositions[i]);
        if (distance < minDistance) {
          minDistance = distance;
          nearestIndex = i;
        }
      }

      // Snap to nearest position
      setCurrentGear(nearestIndex);
      gsap.to(gearElement, {
        x: gearPositions[nearestIndex],
        duration: 0.4,
        ease: "back.out(1.2)"
      });
      
      // Scroll to the corresponding section
      const targetId = gearItems[nearestIndex].id;
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      
      setTimeout(() => {
        setIsUserDragging(false);
      }, 1000);
    };

    gearElement.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    gearElement.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      gearElement.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      gearElement.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('scroll', updateGearFromScroll);
      window.removeEventListener('resize', calculateGearPositions);
    };
  }, [isDragging, currentGear, dragStartX, dragStartPosition, isUserDragging, gearPositions]);

  const handleGearClick = (position: number) => {
    if (gearPositions.length === 0 || !gearRef.current) return;
    
    setCurrentGear(position);
    gsap.to(gearRef.current, {
      x: gearPositions[position],
      duration: 0.4,
      ease: "back.out(1.2)"
    });
    
    const targetId = gearItems[position].id;
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 hidden lg:block">
      <div
        ref={gearboxRef}
        className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 rounded-full px-4 py-3 shadow-2xl border-2 border-red-500/30 backdrop-blur-md"
        style={{ width: '600px' }}
      >
        <div ref={containerRef} className="flex justify-between items-center relative">
          {gearItems.map((item, index) => (
            <div
              key={item.id}
              className="gear-item relative flex flex-col items-center cursor-pointer group"
              onClick={() => handleGearClick(index)}
            >
              <div className="w-16 h-16 rounded-full border-2 border-gray-600 group-hover:border-red-500/50 transition-colors duration-300 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800 group-hover:from-red-600/20 group-hover:to-red-800/20">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 group-hover:from-red-500 group-hover:to-red-600 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-bold group-hover:text-white transition-colors duration-300">
                    {item.position + 1}
                  </span>
                </div>
              </div>
              <span className="text-xs text-gray-300 mt-2 font-medium group-hover:text-red-400 transition-colors duration-300">
                {item.label}
              </span>
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 8 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-2 bg-gray-500 group-hover:bg-red-500 transition-colors duration-300"
                    style={{
                      top: '2px',
                      left: '50%',
                      transformOrigin: '50% 28px',
                      transform: `translateX(-50%) rotate(${i * 45}deg) translateY(-2px)`
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          ref={gearRef}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 pointer-events-auto cursor-grab active:cursor-grabbing z-10"
          style={{ width: '60px', height: '60px' }}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-700 shadow-lg border-2 border-red-400 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center">
                <span className="text-white text-lg font-bold">⚙</span>
              </div>
            </div>
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-3 bg-red-600 border border-red-500"
                style={{
                  top: '2px',
                  left: '50%',
                  transformOrigin: '50% 28px',
                  transform: `translateX(-50%) rotate(${i * 30}deg) translateY(-2px)`
                }}
              />
            ))}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gray-800 border border-gray-600"></div>
            <div className="absolute inset-0 animate-spin-slow">
              <div className="w-full h-full rounded-full border-2 border-red-400/30"></div>
            </div>
          </div>
        </div>

        <div className="absolute -top-2 -left-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-gray-600 rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
        </div>
        <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-6 h-0.5 bg-gradient-to-r from-transparent to-red-500/60"></div>
        <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-6 h-0.5 bg-gradient-to-l from-transparent to-red-500/60"></div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </div>
  );
}