"use client";

import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useRef } from "react";

export default function RouteTransitionWrapper({children}: {children: React.ReactNode}) {
  const pathname = usePathname();
  
  // Extract top-level route
  const getTopLevelRoute = (path: string) => {
    return path.split("/")[1] || "home";
  };

  const currentTopLevel = getTopLevelRoute(pathname);
  
  // Store the top level in a ref that only updates when it changes
  const topLevelRef = useRef(currentTopLevel);
  const keyRef = useRef(0);
  
  // If top level changed, increment key
  if (currentTopLevel !== topLevelRef.current) {
    keyRef.current += 1;
    topLevelRef.current = currentTopLevel;
  }

  return (
    <motion.div
      key={keyRef.current}
      initial={{ 
        opacity: 0,
        scale: 0.95,
        y: 20,
        filter: "blur(10px)"
      }}
      animate={{ 
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)"
      }}
      transition={{ 
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ width: "100%", height: "100%" }}
    >
      {children}
    </motion.div>
  );
}