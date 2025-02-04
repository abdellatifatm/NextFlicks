"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const defaultAnimationVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.98,  // Reduced scale for less jarring entry
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 60,    // Lower stiffness for smoother motion
      damping: 25,      // Higher damping for more control
      mass: 0.6,        // Slightly lighter feel
      duration: 0.8,    // Slightly longer for smoother effect
    },
  },
};

export default function ScrollReveal({
  children,
  direction = "up",     // up, down, left, right
  delay = 0,           // Delay in seconds
  distance = 30,       // Travel distance in pixels
  duration = 0.8,      // Animation duration in seconds
  threshold = 0.3,     // Viewport threshold
  once = true,         // Only animate once?
  stagger = 0,         // Stagger children animations
  className = "",      // Additional CSS classes
}) {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduceMotion(mediaQuery.matches);

    const handleChange = (e) => setShouldReduceMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Define direction-based variants
  const getDirectionalVariants = () => {
    const directions = {
      up: { y: distance },
      down: { y: -distance },
      left: { x: -distance },
      right: { x: distance },
    };

    const directionValue = directions[direction] || directions.up;

    return {
      hidden: {
        opacity: 0,
        scale: 0.98,  // Reduced scale
        ...directionValue,
      },
      visible: {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 60,    // Lower stiffness
          damping: 25,      // Higher damping
          mass: 0.6,        // Slightly lighter feel
          duration: duration,
          delay: delay,
          staggerChildren: stagger,
        },
      },
    };
  };

  // If user prefers reduced motion, render without animation
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: once, amount: threshold }}
      variants={getDirectionalVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
}
