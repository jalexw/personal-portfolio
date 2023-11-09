"use client";

import { MotionValue, m, useAnimate, useMotionValue, useTransform } from "framer-motion";
import { ReactElement, useEffect } from "react";
import { duration } from "../exit-duration";
import { useExperienceReady } from "@/components/experience-loader";
import { CursorBlinker } from "./cursor-blinker";

export function TypewriterEffectGreeting({ message }: { message: string[] }): ReactElement {
  const isReady = useExperienceReady()
  const count: MotionValue<number> = useMotionValue<number>(message.length);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText: MotionValue<string> = useTransform(rounded, (latest: number) => {
    return message.slice(0, latest).join("");
  });
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (isReady) {
      const controls = animate(count, 0, {
        type: "tween",
        duration,
        ease: "easeInOut",
      });
      return controls.stop;
    }
    return;
  }, [animate, message, count, isReady]);

  return (
    <h1 className="flex flex-row flex-nowrap items-center text-4xl absolute m-auto top-[50vh] pointer-events-none z-50">
      <m.span ref={scope}>{displayText}</m.span>
      <CursorBlinker />
    </h1>
  )
}