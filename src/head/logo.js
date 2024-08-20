import React from 'react';

const Logo = ({ color = '#4A90E2', textColor = '#333' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="60 10 300 100"
      style={{width:"10rem", maxWidth: '100%', height: 'auto' }}
    >
      <text
        x="90"
        y="55"
        fontFamily="Arial, sans-serif"
        fontSize="35"
        fill={textColor}
        fontWeight="bold"
        style={{ textAnchor: 'center', dominantBaseline: 'middle' }}
      >
        Picxel Academy
      </text>
    </svg>
  );
};

export default Logo;