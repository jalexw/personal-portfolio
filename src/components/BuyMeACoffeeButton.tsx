"use client";

import { ReactElement } from "react";
import Image from "next/image";
import BuyMeACoffeeUrl from "@/metadata/BuyMeACoffee";

const REAL_DIMENSIONS = {
  x: 1090,
  y: 306,
} as const;

const ASPECT_RATIO: number = REAL_DIMENSIONS.x / REAL_DIMENSIONS.y;

const DESIRED_WIDTH: number = 300;
const DESIRED_HEIGHT: number = DESIRED_WIDTH * ASPECT_RATIO;

export default function BuyMeACoffeeButton(): ReactElement {
  return (
    <a href={BuyMeACoffeeUrl} target="_blank" className="hover:cursor-pointer">
      <Image
        src={"/images/buymeacoffee.png"}
        alt="Buy @jalexw a coffee"
        width={DESIRED_WIDTH}
        height={DESIRED_HEIGHT}
      />
    </a>
  );
}
