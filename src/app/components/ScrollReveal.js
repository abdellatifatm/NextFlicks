"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  distance = 30,
  duration = 0.8,
  threshold = 0.3,
  once = true,
  stagger = 0,
  className = "",
}) {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const [isInView, setIsInView] = useState(false);
  
  // Create motion values for better performance
  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, {
    stiffness: 60,
    damping: 25,
    mass: 0.6,
    duration: duration * 1000
  });

  // Transform progress into actual animation values
  const opacity = useTransform(smoothProgress, [0, 1], [0, 1]);
  const scale = useTransform(smoothProgress, [0, 1], [0.98, 1]);
  
  // Direction-based transforms
  const transformX = useTransform(
    smoothProgress,
    [0, 1],
    direction === "left" ? [-distance, 0] : direction === "right" ? [distance, 0] : [0, 0]
  );
  
  const transformY = useTransform(
    smoothProgress,
    [0, 1],
    direction === "up" ? [distance, 0] : direction === "down" ? [-distance, 0] : [0, 0]
  );

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduceMotion(mediaQuery.matches);

    const handleChange = (e) => setShouldReduceMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Update progress when in view
  useEffect(() => {
    if (isInView) {
      progress.set(1, { delay: delay * 1000 });
    } else if (!once) {
      progress.set(0);
    }
  }, [isInView, delay, once, progress]);

  // If user prefers reduced motion, render without animation
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{
        opacity,
        scale,
        x: transformX,
        y: transformY,
        willChange: "transform",
        backfaceVisibility: "hidden"
      }}
      onViewportEnter={() => setIsInView(true)}
      onViewportLeave={() => !once && setIsInView(false)}
      viewport={{ amount: threshold }}
    >
      {children}
    </motion.div>
  );
}