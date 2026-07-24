import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/sound';

export default function TiltCard({ children, className = '', style = {}, onClick }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg tilt
    const rotateY = ((x - centerX) / centerX) * 10;

    setTilt({ rotateX, rotateY });
  };

  const handleMouseEnter = () => {
    sound.playHover();
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const handleClick = (e) => {
    sound.playClick();
    if (onClick) onClick(e);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`glass-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        ...style
      }}
    >
      {children}
    </motion.div>
  );
}
