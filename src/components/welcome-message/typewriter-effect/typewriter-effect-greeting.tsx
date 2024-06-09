"use client";

import { MotionValue, m, useAnimate, useMotionValue, usePresence, useTransform } from "framer-motion";
import { ReactElement, useEffect } from "react";
import { duration } from "../exit-duration";
import { useExperience, useExperienceReady } from "@/components/experience-loader";
import { CursorBlinker } from "./cursor-blinker";

export function TypewriterEffectGreeting({ message }: { message: string[] }): ReactElement {
  const experience = useExperience();
  // const isReady = useExperienceReady(['canvas', 'initial_assets'])
  const [isPresent, safeToRemove] = usePresence();

  const count: MotionValue<number> = useMotionValue<number>(message.length);
  const rounded = useTransform(
    count,
    (latest) => Math.round(latest))
  ;
  const displayText: MotionValue<string> = useTransform(
    rounded,
    (latest: number): string => {
      return message.slice(0, latest).join("");
    }
  );
  const [scope, animate] = useAnimate();

  useEffect(
    () => {
      if (!isPresent) {
        // if (process.env.NODE_ENV === 'development') {
        //   console.log("[TypewriterEffectGreeting] Calling animate()...");
        // }
        const controls = animate<number>(count, 0, {
          type: "tween",
          duration,
          ease: "easeInOut",
          onComplete(): void {
            if (count.get() < 1) {
              if (process.env.NODE_ENV === 'development') {
                console.log("[WelcomeMessage] Firing \"typewriter_effect_exit_complete\" event");
              }
              experience.dispatch({
                type: "typewriter_effect_exit_complete"
              });
              if (process.env.NODE_ENV === 'development') {
                console.log("[WelcomeMessage] Firing \"placeholder_exit_complete\" event");
              }
              experience.dispatch({
                type: 'placeholder_exit_complete'
              });
              safeToRemove();
            }
          }
        });
        return controls.stop;
      }
      return;
    },
    [animate, message, count, isPresent]
  );

  return (
    <h1 className="flex flex-row flex-nowrap items-center text-4xl absolute m-auto top-[50vh] pointer-events-none z-50">
      <m.span ref={scope}>{displayText}</m.span>
      <CursorBlinker />
    </h1>
  )
}