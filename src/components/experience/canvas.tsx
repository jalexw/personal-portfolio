"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, type ReactElement } from "react";
import Scene from "./scene";
import useExperienceReady from "@/hooks/use-experience-ready";

function ExperienceCanvasRenderer(): ReactElement {
  const isReady: boolean = useExperienceReady(
    ["start_load", "canvas", "placeholder_exit", "initial_assets"],
    "ExperienceCanvasRenderer",
  );
  if (!isReady) {
    return <></>;
  }
  return (
    <Canvas
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -10,
      }}
      className="-z-10"
      gl={{ alpha: true }}
    >
      <Scene />
    </Canvas>
  );
}

export interface ExperienceCanvasOptions {
  onReady: () => void;
}

export function ExperienceCanvas({
  onReady,
}: ExperienceCanvasOptions): ReactElement {
  useEffect((): void => {
    onReady();
  }, [onReady]);
  return <ExperienceCanvasRenderer />;
}

export default ExperienceCanvas;
