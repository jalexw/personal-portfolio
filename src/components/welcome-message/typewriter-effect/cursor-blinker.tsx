"use client";

import { m } from "framer-motion";

export function CursorBlinker() {
  return (
    <m.span
      variants={{
        hidden: {
          opacity: 0,
          transitionEnd: {
            visibility: "hidden",
            display: "none"
          }
        },
        blinking: {
          opacity: [0, 0, 1, 1],
          transition: {
            duration: 1,
            repeat: Infinity,
            repeatDelay: 0,
            ease: "linear",
            times: [0, 0.5, 0.5, 1]
          },
          visibility: "visible",
        }
      }}
      initial="blinking"
      animate="blinking"
      exit="hidden"
      className="text-slate-900 dark:text-white inline-block"
      role='presentation'
    >
      |
    </m.span>
  );
}