"use client";

import dynamic from "next/dynamic";

export const DynamicExperience = dynamic(
  () => import("./canvas").then((mod) => mod.default),
  {
    ssr: false,
  },
);

export default DynamicExperience;
