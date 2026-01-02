import React, { useState } from 'react';

const ZoomableImage = ({ src, alt }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
  };

  const handleMouseEnter = () => {
    setShowZoom(true);
  };

  return (
    <div 
      className="w-full overflow-hidden rounded-lg cursor-zoom-in relative bg-gray-50 dark:bg-gray-800"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-auto object-contain transition-transform duration-100 ease-linear"
        style={{
            transformOrigin: `${position.x}% ${position.y}%`,
            transform: showZoom ? "scale(2)" : "scale(1)"
        }}
      />
      {/* Hint overlay on mobile or first interaction */}
      {!showZoom && (
        <div className="absolute top-2 right-2 bg-white/80 dark:bg-black/50 p-1 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600 dark:text-gray-300">
             <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
            </svg>
        </div>
      )}
    </div>
  );
};

export default ZoomableImage;
