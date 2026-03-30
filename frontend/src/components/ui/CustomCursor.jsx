import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring physics for smooth trailing effect
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsHidden(true);
      return;
    }

    const moveCursor = (e) => {
      cursorX.set(e.clientX - (isHovering ? 24 : 8));
      cursorY.set(e.clientY - (isHovering ? 24 : 8));
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.classList.contains('cursor-pointer') ||
        getComputedStyle(e.target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeaveWindow = () => setIsHidden(true);
    const handleMouseEnterWindow = () => setIsHidden(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseLeaveWindow);
    window.addEventListener('mouseover', handleMouseEnterWindow);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseLeaveWindow);
      window.removeEventListener('mouseover', handleMouseEnterWindow);
    };
  }, [cursorX, cursorY, isHovering]);

  if (isHidden) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full mix-blend-difference bg-white"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        width: isHovering ? 48 : 16,
        height: isHovering ? 48 : 16,
      }}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        scale: isHovering ? 1.5 : 1
      }}
      transition={{ duration: 0.15 }}
    />
  );
};

export default CustomCursor;
