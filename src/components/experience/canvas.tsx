"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, type ReactElement } from "react";
import { Scene } from "./scene";
import { AnimatePresence, m } from "framer-motion";
import { useExperienceReady } from "@/components/experience-loader";
import { welcomeMessageExitDuration } from "@/components/welcome-message";

export function ExperienceCanvas(): ReactElement {
  const isReady: boolean = useExperienceReady()

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('ExperienceCanvas ready status: ', isReady)
    }
  })

  return (
    <m.div
      id="experience-canvas-fade-in-effect"
      key="experience-canvas-fade-in-effect"
      variants={{
        hidden: {
          opacity: 0,
          transitionEnd: {
            visibility: "hidden",
            display: "none"
          }
        },
        visible: {
          opacity: 1,
          transition: {
            delay: welcomeMessageExitDuration + 0.5,
            duration: 2
          },
          visibility: "visible",
          display: "block"
        }
      }}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="w-full h-full fixed top-0 left-0"
    >
      <Canvas
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          top: 0,
          left: 0
        }}
      >
        <Scene />
      </Canvas>
    </m.div>
  )
}

export default ExperienceCanvas;
