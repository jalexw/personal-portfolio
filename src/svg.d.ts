import type { FC, SVGProps } from "react";

declare module "*.svg" {
  const src: FC<SVGProps<SVGSVGElement>>;
  export default src;
}
