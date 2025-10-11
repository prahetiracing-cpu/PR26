// "use client";
// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// export default function CarAnimation() {
//   const carRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: "body",
//         start: "top top",
//         end: "bottom bottom",
//         scrub: 1, // Smooth scrub for precise control
//         pin: false,
//       },
//     });

// // 🟢 0 → 100vh: move down + slight right
//     tl.to(carRef.current, {
//       x: "10vw",
//       y: "100vh",
//       ease: "none",
//       duration: 0.16, // proportional to 100vh of scroll
//     });

//     // 🟢 before 200vh: move right to middle of the screen
//     tl.to(carRef.current, {
//       x: "45vw",
//       ease: "none",
//       duration: 0.16, // covers scroll till before 200vh
//     });

//     // 🟢 200vh → 300vh: move down
//     tl.to(carRef.current, {
//       y: "250vh",
//       ease: "none",
//       duration: 0.16,
//     });

//     // 🟢 before 400vh: move right to the right corner
//     tl.to(carRef.current, {
//       x: "80vw",
//       ease: "none",
//       duration: 0.16,
//     });

//     // 🟢 400vh → 600vh: move down continually
//     tl.to(carRef.current, {
//       y: "550vh",
//       ease: "none",
//       duration: 0.36, // longer scroll segment
//     });
//     // Cleanup function
//     return () => {
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//     };

//   }, []);

//   return (
//     <div 
//       ref={carRef}
//       className="fixed z-50 pointer-events-none select-none"
//       style={{
//         fontSize: 'clamp(2.5rem, 5vw, 5rem)', // Larger, more prominent car
//         lineHeight: 1,
//         willChange: 'transform',
//         left: '30px', // Start from left corner
//         top: '30px', // Start from top corner
//         transform: 'translate(0, 0)', // Initial position
//         filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.5))', // Racing glow effect
//         transition: 'all 0.1s ease-out' // Smooth transitions
//       }}
//     >
//       <div className="relative">
//         🏎️
//         {/* Speed lines effect */}
//         <div 
//           className="absolute -left-8 top-1/2 transform -translate-y-1/2 opacity-0"
//           style={{
//             width: '20px',
//             height: '2px',
//             background: 'linear-gradient(90deg, transparent, #ef4444, transparent)',
//             animation: 'speedLines 0.5s ease-in-out infinite alternate'
//           }}
//         />
//         <div 
//           className="absolute -left-12 top-1/2 transform -translate-y-1/2 opacity-0"
//           style={{
//             width: '15px',
//             height: '1px',
//             background: 'linear-gradient(90deg, transparent, #ef4444, transparent)',
//             animation: 'speedLines 0.5s ease-in-out infinite alternate 0.2s'
//           }}
//         />
//       </div>
      
//       {/* Custom CSS for speed lines */}
//       <style jsx>{`
//         @keyframes speedLines {
//           0% { opacity: 0; transform: translate(-5px, -50%); }
//           100% { opacity: 1; transform: translate(0px, -50%); }
//         }
//       `}</style>
//     </div>
//   );
// }