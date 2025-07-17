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
  width = 60, 
  height = 36, 
  color = '#ffffff',
  strokeWidth = 3
}: VILogoProps) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 100 60" 
      className={className}
    >
      {/* Horizontal line - thinner and more refined */}
      <line 
        x1="22" 
        y1="10" 
        x2="58" 
        y2="10" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round"
        opacity="0.8"
      />
      
      {/* V shape - cleaner proportions */}
      <path 
        d="M25 20 L35 45 L45 20" 
        stroke={color} 
        strokeWidth={strokeWidth + 1} 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none"
      />
      
      {/* I shape - refined positioning */}
      <line 
        x1="55" 
        y1="20" 
        x2="55" 
        y2="45" 
        stroke={color} 
        strokeWidth={strokeWidth + 1} 
        strokeLinecap="round"
      />
    </svg>
  );
} 