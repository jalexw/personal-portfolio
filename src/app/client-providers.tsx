"use client";

import {
  Toaster,
  TooltipProvider,
  BrightnessThemeProvider,
  LazyFramerMotionProvider,
} from "@schemavaults/ui";
import type { PropsWithChildren, ReactElement } from "react";

export interface IClientAppVisualsProviderProps extends PropsWithChildren {}

export function ClientProviders({
  children,
}: IClientAppVisualsProviderProps): ReactElement {
  return (
    <BrightnessThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <LazyFramerMotionProvider strict>
        <TooltipProvider>{children}</TooltipProvider>
      </LazyFramerMotionProvider>
      <Toaster />
    </BrightnessThemeProvider>
  );
}

export default ClientProviders;
