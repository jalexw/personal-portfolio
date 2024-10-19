import type { ReactElement } from "react";

import { DynamicExperience } from "@/components/experience";
import { useExperience } from "@/components/experience-loader";
import { HeaderBar } from "@/components/header";
import { WelcomeMessage } from "@/components/welcome-message";
import { AnimatePresence } from "framer-motion";

export function AvatarSection(): ReactElement {
  const experience = useExperience();

  return (
    <section className="h-full w-full overflow-hidden">
      <div
        id="dom-content"
        className="w-full h-[100vh] z-10 flex flex-col justify-start items-center overflow-y-scroll overflow-x-hidden"
      >
        <HeaderBar />

        <div
          id="welcome-message-container"
          className="w-full overflow-x-hidden flex items-center justify-center z-10 min-h-[40vh]"
        >
          <WelcomeMessage />
        </div>
      </div>

      <AnimatePresence>
        <DynamicExperience
          onReady={() => {
            experience.dispatch({
              type: "canvas_ready",
            });
          }}
        />
      </AnimatePresence>
    </section>
  );
}
