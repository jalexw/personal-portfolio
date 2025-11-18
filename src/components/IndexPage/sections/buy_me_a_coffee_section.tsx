"use client";

import BuyMeACoffeeButton from "@/components/BuyMeACoffeeButton";
import type { ReactElement } from "react";

export default function BuyMeACoffeeSection(): ReactElement {
  return (
    <section
      id="buy-me-a-coffee-section"
      className="w-full flex flex-row items-center justify-center h-[250px]"
    >
      <BuyMeACoffeeButton />
    </section>
  );
}
