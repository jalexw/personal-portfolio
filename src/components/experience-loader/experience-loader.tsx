"use client";

import { loadFramerMotionFeatures } from "@/lib/lazy-framer";
import { LazyMotion } from "framer-motion";
import { useState, type PropsWithChildren, type ReactElement, useEffect } from "react";
import { PortfolioExperienceContext, type PortfolioExperienceLoadingState } from "./context";
import { useToast } from "@/components/ui/use-toast"


export function PortfolioExperienceLoadingManager({ children }: PropsWithChildren): ReactElement {
  const [value, setValue] = useState<PortfolioExperienceLoadingState>({
    loadingStates: {
      three: false,
      assets: false
    }
  })
  const { toast } = useToast();

  useEffect(() => {
    setTimeout(() => {
      setValue({
        loadingStates: {
          three: true,
          assets: true
        }
      })
    }, 3000)
  }, [toast])
  
  return (
    <PortfolioExperienceContext.Provider value={value}>
      <LazyMotion features={loadFramerMotionFeatures} strict>
        {children}
      </LazyMotion>
    </PortfolioExperienceContext.Provider>
  )
}
