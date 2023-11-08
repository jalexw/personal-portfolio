import { MotionValue, m, useAnimate, useMotionValue, useTransform } from "framer-motion";
import { ReactElement, useEffect } from "react";
import { duration } from "./exit-duration";
import { useExperienceReady } from "@/components/experience-loader";

function CursorBlinker() {
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
    <h1 className="flex flex-row flex-nowrap items-center text-4xl absolute m-auto top-[50vh] pointer-events-none">
      <m.span ref={scope}>{displayText}</m.span>
      <CursorBlinker />
    </h1>
  )
}