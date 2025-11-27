"use client";
import { Link } from "react-scroll";
import { useState, useRef, useEffect } from "react";

const navItems = [
  { id: "home", label: "Home" },
  { id: "events", label: "Events" },
  { id: "pr", label: "PR26" },
  { id: "about", label: "About" },
  { id: "sponsors", label: "Sponsors" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('/click.wav');
    audioRef.current.volume = 0.9; // Set volume to 50%
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Click sound handler
  const playClickSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset to beginning
      audioRef.current.play().catch(console.error);
    }
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap');
        
        .nav-font {
          font-family: 'Zen Dots', sans-serif;
        }
        
        .nav-link {
          position: relative;
        }
        
        .nav-link::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: 8px;
          transform: translateX(-50%);
          width: 0%;
          height: 3px;
          transition: width 0.3s ease-in-out;
        }
        
        .nav-link:hover::after {
          width: 70%;
        }
        
        .nav-divider::after {
          content: "";
          position: absolute;
          right: -4px;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 20px;
          background: rgba(255, 255, 255, 0.2);
        }
        
        .mobile-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0%;
          height: 3px;
          background-color: #ffb703;
          transition: width 0.3s ease-in-out;
        }
        
        .mobile-link:hover::after {
          width: 100%;
        }
      `}</style>

      <nav className="fixed top-0 left-0 right-0 bg-black text-white z-[1000] border-b border-white/10 h-[110px]" 
           style={{ boxShadow: '0 4px 20px rgba(193, 18, 31, 0.3)' }}>
        
        {/* Desktop Layout */}
        <div className="h-full w-full px-10 grid grid-cols-[1fr_2fr_1fr] items-center gap-5 max-md:hidden">
          
          {/* Left Logo */}
          <div className="flex items-center justify-start pl-[60px]">
            <Link to="home">
            <img
              src="./logo.png" 
              alt="Praheti Racing Logo" 
              className="h-20 w-auto object-contain transition-transform duration-300 hover:scale-105"
              style={{ filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))' }}
            />
            </Link>
          </div>

          {/* Center Nav Links */}
          <ul className="flex justify-center items-center list-none m-0 p-0 nav-font gap-2">
            {navItems.map((item, index) => (
              <li key={item.id} className={`relative ${index !== navItems.length - 1 ? 'nav-divider' : ''}`}>
                <Link
                  to={item.id}
                  smooth={true}
                  duration={600}
                  offset={-110}
                  onClick={playClickSound}
                  className={`nav-link ${item.id === "pr"?  "text-[#ff0000]":"text-white"} relative no-underline text-[1.08rem] font-bold px-[18px] py-3 transition-all duration-300 tracking-wide block rounded cursor-pointer hover:text-[#ff0011] hover:bg-[rgba(255,183,3,0.1)] hover:-translate-y-0.5`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Logo */}
          <div className="flex items-center justify-end pr-[60px]">
            <Link to="pr">
            <img
              src="./logo2.png" 
              alt="Secondary Logo" 
              className="h-20 w-auto object-contain transition-transform duration-300 hover:scale-105"
              style={{ filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))' }}
            />
            </Link>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="hidden max-md:flex h-full w-full px-5 items-center justify-between relative">
          {/* Left Logo */}
          <div className="flex items-center">
            <Link to="home">
            <img
              src="./logo.png" 
              alt="Praheti Racing Logo" 
              className="h-[60px] w-auto object-contain"
              style={{ filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))' }}
            />
            </Link>
          </div>

          {/* Right Logo */}
          <div className="flex items-center">
            <Link to ='pr'>
            <img
              src="./logo2.png" 
              alt="Secondary Logo" 
              className="h-[60px] w-auto object-contain"
              style={{ filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))' }}
            />
            </Link>
          </div>

          {/* Hamburger Menu Icon - Right side */}
          <div 
            className="text-white text-[2rem] cursor-pointer hover:text-[#ff0011] transition-colors ml-4"
            onClick={() => {
              playClickSound();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
          >
            &#9776;
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed top-[110px] right-0 bg-[#c1121f] w-[70vw] max-w-[320px] h-[calc(100vh-110px)] z-[2000] shadow-[-2px_0_12px_rgba(0,0,0,0.2)]">
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => {
                  playClickSound();
                  setIsMobileMenuOpen(false);
                }}
                className="text-white text-2xl hover:text-[#ffb703] transition-colors duration-300 cursor-pointer"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            
            {/* Navigation Links */}
            <ul className="flex flex-col items-start justify-start gap-6 nav-font px-4">
              {navItems.map((item) => (
                <li key={item.id} className="w-full">
                  <Link
                    to={item.id}
                    smooth={true}
                    duration={600}
                    offset={-110}
                    onClick={() => {
                      playClickSound();
                      setIsMobileMenuOpen(false);
                    }}
                    className="mobile-link text-[1.3rem] px-6 py-3 text-white tracking-[2px] font-bold no-underline transition-all duration-300 relative block cursor-pointer hover:bg-[rgba(255,183,3,0.15)] hover:translate-x-2"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}