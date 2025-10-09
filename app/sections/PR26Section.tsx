'use client';

import React from 'react';

// Hex Color Definitions:
const COLOR_BLACK = '#000000';
const COLOR_RED = '#ff0000'; // Accent color for titles and outlines
const COLOR_WHITE = '#FFFFFF';
const COLOR_LIGHT_GRAY_BORDER = '#E5E7EB'; // Matches StatCard base border
const COLOR_LIGHT_GRAY_DIVIDER = '#F3F4F6'; // Used for internal dividers

interface SpecItemProps {
  title: string;
  description: string;
  specs: { label: string; value: string }[];
}

/**
 * Renders a single technical specification item using the visual style 
 * derived from the TeamStats card, now with red accents.
 */
const SpecItem: React.FC<SpecItemProps> = ({ title, description, specs }) => (
  // Updated container styling to match StatCard aesthetic:
  // Rounded corners, light gray border, responsive scale/translate on hover, and corner accents.
  <div 
    className="group relative overflow-hidden rounded-2xl bg-[#FFFFFF] p-6 sm:p-8 
               border-2 transition-all duration-500 
               sm:hover:scale-[1.05] lg:hover:scale-105 sm:hover:shadow-2xl sm:hover:-translate-y-2"
    // Use inline styles for border colors to maintain the light/dark transition logic
    style={{ borderColor: COLOR_LIGHT_GRAY_BORDER, borderStyle: 'solid' }}
  >
    {/* Background/Hover effects - Simple white/black transition is kept subtle */}
    <div 
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[#FFFFFF]"
    ></div> 

    <div className="relative z-10">
      <h3 
        className="text-3xl font-bold mb-4 pb-3 border-b-2"
        // Title color is RED, internal border uses a lighter divider color
        style={{ color: COLOR_RED, borderColor: COLOR_LIGHT_GRAY_DIVIDER }}
      >
        {title}
      </h3>
      <p 
        className="text-base leading-relaxed mb-6"
        style={{ color: COLOR_BLACK }}
      >
        {description}
      </p>
      <div className="space-y-3">
        {specs.map((spec, index) => (
          <div 
            key={index} 
            className="flex justify-between items-start gap-4 py-2 border-b"
            style={{ borderColor: COLOR_LIGHT_GRAY_DIVIDER }}
          >
            <span 
              className="text-xs font-bold uppercase tracking-wider flex-shrink-0"
              style={{ color: COLOR_BLACK }}
            >
              {spec.label}
            </span>
            <span 
              className="text-sm font-medium text-right"
              style={{ color: COLOR_BLACK }}
            >
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </div>
    
    {/* Corner Accents (Matching StatCard Style) */}
    {/* Top-Right Accent - Now permanently RED */}
    <div 
      className="absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-12 rounded-tr-2xl transition-colors duration-300
                 border-t-2 border-r-2 border-[rgba(0,0,0,0.2)]"
      // Set the base color to RED
      style={{ borderColor: COLOR_RED }}
    ></div>
    {/* Bottom-Left Accent - Now permanently RED */}
    <div 
      className="absolute bottom-0 left-0 w-8 h-8 sm:w-12 sm:h-12 rounded-bl-2xl transition-colors duration-300
                 border-b-2 border-l-2 border-[rgba(0,0,0,0.2)]"
      // Set the base color to RED
      style={{ borderColor: COLOR_RED }}
    ></div>
    
    {/* Corner Glow/Circles - Background color is already RED */}
    <div 
      className="absolute top-0 left-0 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
      style={{ backgroundColor: COLOR_RED }}
    ></div>
    <div 
      className="absolute bottom-0 right-0 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
      style={{ backgroundColor: COLOR_RED }}
    ></div>
  </div>
);

export default function PR26Section() {

  const specifications: SpecItemProps[] = [
    {
      title: 'Chassis',
      description: 'Engineered for strength, designed for lightness. A compact tubular space frame chassis, optimized through simulation and analysis for peak rigidity to weight ratio. Every weld is intentional every millimeter counts.',
      specs: [
        { label: 'Material', value: 'Mild Steel AISI 4130' },
        { label: 'Length', value: '2000 mm' },
        { label: 'Weight', value: 'Optimized for minimum mass and maximum stiffness' },
      ],
    },
    {
      title: 'Powertrain',
      description: 'Precision-tuned performance. Powered by a KTM 390cc engine, refined to deliver smooth torque and high reliability. Seamlessly paired with electronic paddle shifters, ensuring rapid and consistent gear shifts on every lap.',
      specs: [
        { label: 'Engine', value: 'KTM 390cc Single Cylinder' },
        { label: 'Transmission', value: '6-Speed with Paddle Shift Integration' },
        { label: 'Cooling', value: 'Custom Radiator System' },
        { label: 'Fuel System', value: 'EFI with optimized mapping for efficiency' },
      ],
    },
    {
      title: 'Vehicle Dynamics',
      description: 'Every turn, calculated. Suspension geometry fine-tuned to maintain optimal tire contact and predictable handling at high speeds. Lightweight hubs, custom knuckles, and precision wishbones deliver unmatched control and balance.',
      specs: [
        { label: 'Suspension', value: 'Double Wishbone (Front & Rear)' },
        { label: 'Braking', value: 'Hydraulic Disc Brakes on all corners' },
        { label: 'Tires', value: 'Racing Compound for Grip and Feedback' },
      ],
    },
    {
      title: 'Aerodynamics',
      description: 'The science of speed. An all new aerodynamic package nose cone, front and rear wings, and undertray designed to balance downforce and drag for enhanced cornering stability.',
      specs: [
        { label: 'Downforce', value: 'Optimized via CFD Simulations' },
        { label: 'Components', value: 'Nose Cone, Sidepods, Diffuser, Rear Wing Assembly' },
      ],
    },
    {
      title: 'Electronics',
      description: 'Smarter, faster, safer. An integrated system that monitors, analyzes, and optimizes performance in real time. Custom electronics, built in house for reliability and innovation.',
      specs: [
        { label: 'Controller', value: 'In-house ECU' },
        { label: 'Data Logging', value: 'Real-time telemetry' },
        { label: 'Dashboard', value: 'Digital Interface with Driver Feedback System' },
      ],
    },
    {
      title: 'Weight & Balance',
      description: 'Because lightness is speed. PR-26 sheds every unnecessary gram without compromise to safety or performance. A car born from obsession engineered for results.',
      specs: [
        { label: 'Target Weight', value: '~220 kg' },
        { label: 'Weight Distribution', value: '45:55 (Front:Rear)' },
      ],
    },
  ];

  return (
    <section 
      id="pr26-specifications" 
      className="min-h-screen flex flex-col items-center px-4 sm:px-8 py-20 font-sans"
      style={{ backgroundColor: COLOR_WHITE }}
    >
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Header Section - Changed bottom border to RED */}
        <div className="text-center mb-16 pb-8 border-b-4" style={{ borderColor: COLOR_RED }}>
          <h1 
            className="text-5xl sm:text-6xl font-black mb-6 tracking-tight"
            style={{ color: COLOR_BLACK }}
          >
            PRECISION REDEFINED
          </h1>
          <div 
            className="w-24 h-1 mx-auto mb-6"
            style={{ backgroundColor: COLOR_RED }}
          ></div>
          <p 
            className="text-lg sm:text-xl max-w-4xl mx-auto mb-6 leading-relaxed"
            style={{ color: COLOR_BLACK }}
          >
            Every detail of <strong style={{ color: COLOR_RED }}>PR-26</strong> is engineered with purpose. From the lightest weld to the sharpest corner, it's a car born from obsession where design, performance, and innovation converge into one seamless form.
          </p>
          <p 
            className="text-xl font-black uppercase tracking-widest"
            style={{ color: COLOR_RED }}
          >
            This is precision, redefined.
          </p>
        </div>

        {/* Technical Specifications Heading - Changed bottom border to RED */}
        <div className="mb-12">
          <h2 
            className="text-center text-3xl sm:text-5xl font-black mb-8 pb-4 border-b-4 tracking-tighter"
            style={{ color: COLOR_BLACK, borderColor: COLOR_RED }}
          >
            TECHNICAL SPECIFICATIONS
          </h2>
        </div>

        {/* Specifications Grid - Responsive layout for 1 or 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-16">
          {specifications.map((item, index) => (
            <SpecItem 
              key={index} 
              title={item.title} 
              description={item.description} 
              specs={item.specs} 
            />
          ))}
        </div>

        {/* Footer Statement - Changed top border to RED, divider to RED */}
        <div 
          className="text-center mt-16 pt-12 border-t-4"
          style={{ borderColor: COLOR_RED }}
        >
          <h3 
            className="text-3xl sm:text-4xl font-black mb-6"
            style={{ color: COLOR_BLACK }}
          >
            BUILT BY ENGINEERS. DRIVEN BY PURPOSE.
          </h3>
          <div 
            className="w-24 h-1 mx-auto mb-6"
            style={{ backgroundColor: COLOR_RED }}
          ></div>
          <p 
            className="text-lg font-medium max-w-3xl mx-auto leading-relaxed"
            style={{ color: COLOR_BLACK }}
          >
            <strong style={{ color: COLOR_RED }}>PR-26</strong> is more than a car it's a statement. A symbol of teamwork, innovation, and the relentless pursuit of excellence.
          </p>
        </div>

      </div>
    </section>
  );
}
