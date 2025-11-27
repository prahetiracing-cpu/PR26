'use client';

import React, { useEffect, useState, useRef } from 'react';


const COLOR_BLACK = '#000000';
const COLOR_RED = '#ff0000';
const COLOR_WHITE = '#FFFFFF';

interface TeamPanelProps {
    title: string;
    teams: string[];
    side: 'left' | 'right';
    expanded: boolean;
}

export default function EventsSection() {
    
    return (
        <section
            id="events"
            className="min-h-screen flex flex-col items-center px-6 py-20 font-sans"
            style={{ backgroundColor: COLOR_WHITE }}
        >
            <div className="max-w-7xl w-full mx-auto">

                Working on it ...

            </div>
        </section>
    );
}
