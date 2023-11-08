
import dynamic from "next/dynamic";

export const DynamicExperience = dynamic(
  () => import("./canvas"), {
  ssr: false
});
