"use client";

import { loadFramerMotionFeatures } from "@/lib/lazy-framer";
import { LazyMotion } from "framer-motion";
import { useState, type PropsWithChildren, type ReactElement, useEffect } from "react";
import { PortfolioExperienceContext, type PortfolioExperienceLoadingState } from "./context";

export function PortfolioExperienceLoadingManager({ children }: PropsWithChildren): ReactElement {
  const [value, setValue] = useState<PortfolioExperienceLoadingState>({
    loadingStates: {
      three: false,
      assets: false
    }
  })

  useEffect(() => {
    setTimeout(() => {
      setValue({
        loadingStates: {
          three: true,
          assets: true
        }
      })
    }, 3000)
  })
  
  return (
    <PortfolioExperienceContext.Provider value={value}>
      <LazyMotion features={loadFramerMotionFeatures} strict>
        {children}
      </LazyMotion>
    </PortfolioExperienceContext.Provider>
  )
}
