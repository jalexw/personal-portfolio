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
    setTimeout(() => {
      toast({
        title: "Site under construction...",
        description: "Check back later to learn more about me!"
      })
    }, 5500)
  }, [toast])
  
  return (
    <PortfolioExperienceContext.Provider value={value}>
      <LazyMotion features={loadFramerMotionFeatures} strict>
        {children}
      </LazyMotion>
    </PortfolioExperienceContext.Provider>
  )
}
