"use client";

import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useRef } from "react";

export default function RouteTransitionWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Extract top-level and depth
  const getSegments = (path: string) => {
    const parts = path.split("/").filter(Boolean);
    return {
      top: parts[0] || "home",
      depth: parts.length,
    };
  };

  const { top: currentTop, depth: currentDepth } = getSegments(pathname);

  // Refs to store last route details
  const lastTop = useRef(currentTop);
  const lastDepth = useRef(currentDepth);
  const keyRef = useRef(0);

  // Determine if animation should run
  const topChanged = currentTop !== lastTop.current;
  const depthChanged = currentDepth !== lastDepth.current;

  const shouldAnimate = (() => {
    // case 1: top-level changed → animate
    if (topChanged) return true;

    // case 2: inside projects, depth change = animate
    if (currentTop === "projects" && depthChanged) return true;

    // case 3: same top, same depth → no animation
    return false;
  })();

  // Only increment key when animation should run
  if (shouldAnimate) {
    keyRef.current += 1;
  }

  // Update refs
  lastTop.current = currentTop;
  lastDepth.current = currentDepth;

  return (
    <motion.div
      key={keyRef.current}
      initial={{
        opacity: 0,
        scale: 0.95,
        y: 20,
        filter: "blur(10px)",
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
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