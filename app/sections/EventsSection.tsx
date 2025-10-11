'use client';

import React, { useEffect, useState, useRef } from 'react';

// Hex Color Definitions
const COLOR_BLACK = '#000000';
const COLOR_RED = '#ff0000'; // Accent color
const COLOR_WHITE = '#FFFFFF';

const technicalTeams = [
    'Vehicle Dynamics',
    'Powertrain',
    'Power Electronics',
    'Design & Aerodynamics',
];
const nonTechnicalTeams = [
    'Sponsorship & Logistics',
    'PR & Events',
    'Content Creation & Media',
    'Web Ops & Documentation',
];

// --- Styled Component for the Team Overview Panels ---
interface TeamPanelProps {
    title: string;
    teams: string[];
    side: 'left' | 'right';
    expanded: boolean;
}

const TeamPanel: React.FC<TeamPanelProps> = ({ title, teams, side, expanded }) => {
    const isLeft = side === 'left';

    return (
        <div id="recruitment" className={`
      md:flex flex-col hidden justify-start py-8 transition-all duration-[2000ms] ease-in-out
      shadow-2xl overflow-hidden rounded-2xl {/* Keep shadow and rounded corners */}
      ${side === 'left'
                ? 'items-end text-right'
                : 'items-start text-left'}
      ${expanded
                ? 'w-[28vw]  min-w-[280px] px-8 opacity-100'
                : 'w-0 min-w-0 px-0 opacity-0'}
    `}
            style={{ backgroundColor: COLOR_WHITE }}
        >
            {expanded && (
                <>
                    <h3 className={`
            text-2xl font-black tracking-widest uppercase mb-10 pb-2
            ${isLeft ? 'border-b-4 border-red-500' : 'border-b-4 border-red-500'}
          `}
                        style={{ color: COLOR_RED }}
                    >
                        {title}
                    </h3>

                    {/* Creative Styling: Unordered List with Hover Effect (Numbering removed) */}
                    <ul className={`space-y-4 w-full list-none p-0 ${isLeft ? 'ml-0' : 'mr-0'}`}>
                        {teams.map((team, index) => (
                            <li
                                key={team}
                                className={`
                  relative font-extrabold text-lg transition-all duration-300 transform
                  cursor-pointer group hover:scale-[1.03]
                `}
                            >
                                {/* Team Name Block - REMOVED BORDER */}
                                <div
                                    className={`
                    px-4 py-2 rounded-lg text-center shadow-md
                    transition-all duration-500
                    text-black bg-white {/* Default Black text, no border */}
                    group-hover:bg-red-500 group-hover:text-white group-hover:shadow-lg
                    ${isLeft ? 'float-right clear-both' : 'float-left clear-both'}
                  `}
                                >
                                    {team}
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default function EventsSection() {
    // Animation state for sliding panels
    const [expanded, setExpanded] = useState(false);


    const audioRef2 = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef2.current = new Audio('/carRace.wav');
        audioRef2.current.loop = true;
        audioRef2.current.volume = 0.7;

        return () => {
            if (audioRef2.current) {
                audioRef2.current.pause();
                audioRef2.current = null;
            }
        };
    }, []);

    const handleClick = () => {
        if (audioRef2.current) {
    const audio = audioRef2.current;

    // Start playing
    audio.play().catch(console.error);

    // Stop after 5 seconds no matter what
    setTimeout(() => {
      if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0; // resets to the beginning
      }
    }, 2000);
    }
    }
    useEffect(() => {
        const timeout = setTimeout(() => setExpanded(true), 500);
        return () => clearTimeout(timeout);
    }, []);

    const centralImageSrc = '/e1.png';

    // Fallback function for image loading errors
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null;
        // Fallback to a vertical placeholder with red text
        target.src = 'https://placehold.co/400x600/000000/ff0000?text=Recruitment+Image';
        target.style.objectFit = 'cover';
    };

    return (
        <section
            id="events"
            className="min-h-screen flex flex-col items-center px-6 py-20 font-sans"
            style={{ backgroundColor: COLOR_WHITE }}
        >
            <div className="max-w-7xl w-full mx-auto">

                {/* Main Heading with 'NOW' in red */}
                <div className="text-center mb-12 pb-4">
                    <h2 className=" md:text-6xl text-4xl font-black tracking-wider text-black mb-4">
                        RECRUITMENTS OPEN <a href="https://forms.gle/99zMzTsuwzNApFKb8"><span onClick={handleClick} className="text-white bg-red-500 px-5 py-1 rounded-xl shadow-lg">NOW</span></a>
                    </h2>
                    <div className="w-32 h-2 mx-auto bg-red-500 rounded-full mt-2"></div>
                </div>

                <div className="text-center  mt-10 md:mt-14 pt-10 md:pt-12 border-t-4 border-red-500">
                    <p className="text-xl font-bold max-w-3xl mx-auto leading-relaxed text-black">
                        Join our journey. Explore roles in <span className="bg-red-500 text-white px-2 rounded-md">technical innovation</span> and <span className="bg-red-500 text-white px-2 rounded-md">strategic outreach</span>. Click below to start your application!
                    </p>
                    <a href="https://forms.gle/99zMzTsuwzNApFKb8">
                    <button onClick={handleClick} className="mt-8 md:px-12 md:py-5 px-10 py-3 text-xl font-black uppercase tracking-widest rounded-full transition-all duration-700 ease-in-out hover:scale-105 bg-red-500 text-white border-4 border-black shadow-[5px_5px_0_#000]">
                        APPLY TODAY
                    </button>
                    </a>
                </div>

                {/* --- Central Content Area (Image + Panels) --- */}
                <div className="flex items-center justify-center w-full mt-5">
                    {/* Left Panel */}
                    <TeamPanel title="Technical Team" teams={technicalTeams} expanded={expanded} side="left" />

                    {/* Center Image */}
                    <div className="flex items-center justify-center h-auto w-full shadow-2xl rounded-2xl z-10 transition-all duration-700 hover:shadow-red-500/50 hover:border-red-500">
                        <img
                            src={centralImageSrc}
                            alt="Central recruitment focus image"
                            className="w-full h-full rounded-2xl"
                            
                            onError={handleImageError}
                        />
                    </div>

                    {/* Right Panel */}
                    <TeamPanel title="Non-Technical Team" teams={nonTechnicalTeams} expanded={expanded} side="right" />
                </div>

            </div>
        </section>
    );
}
