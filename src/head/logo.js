import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ color = '#4A90E2', textColor = '#333' }) => {
  return (
    <Link to="/">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="60 0 300 100"
        style={{width:"10rem", maxWidth: '100%', height: 'auto' }}
      >
        <text
          x="70"
          y="55"
          fontFamily="Arial, sans-serif"
          fontSize="33"
          fill={color}
          fontWeight="bold"
          style={{ textAnchor: 'center', dominantBaseline: 'middle',color:color }}
        >
          Picxel Academy
        </text>
      </svg>
    </Link>
  );
};

export default Logo;