import React from 'react';

interface VILogoProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
}

export default function VILogo({
  className = '',
  width = 80,
  height = 48,
  color = '#ffffff',
  strokeWidth = 4,
}: VILogoProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 120 60" className={className}>
      {/* Horizontal line - adjusted for better centering */}
      <line
        x1="26"
        y1="5"
        x2="73"
        y2="5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* V shape - increased spacing and size */}
      <path
        d="M30 20 L40 45 L50 20"
        stroke={color}
        strokeWidth={strokeWidth + 1}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* I shape - moved further right with more spacing */}
      <line
        x1="70"
        y1="20"
        x2="70"
        y2="45"
        stroke={color}
        strokeWidth={strokeWidth + 1}
        strokeLinecap="round"
      />
    </svg>
  );
}
