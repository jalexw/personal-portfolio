import type { AnimationAction } from "three";
import { LoopRepeat, LoopOnce } from "three";
import type { AvatarAnimationActions } from "./avatar_animation_actions";
import { avatarAnimationsConstants } from "./avatar_animation_constants";

export interface AvatarAnimationInputs {
  actions: AvatarAnimationActions;
  interactions: {
    lastEntryByFall: number;
    lastExitByJump: number | null;
    lastClickTime: number | null;
  };
}

export function avatarAnimation({
  actions,
  interactions,
}: AvatarAnimationInputs): void {
  const { fallAction, landAction, waveAction, idleAction, jumpingAction } =
    actions;

  const { lastEntryByFall, lastExitByJump, lastClickTime } = interactions;

  const now = Date.now();

  if (process.env.NODE_ENV === "development") {
    console.log(
      "Running avatar animation logic at t=",
      now,
      `(${new Date(now).toLocaleTimeString()})`,
    );
  }

  // Get how long the fall action takes
  // const fallActionDurationSeconds: number = fallAction.getClip().duration;
  // const fallActionDurationMs: number = fallActionDurationSeconds * 1000;
  const fallActionDurationMs: number = avatarAnimationsConstants.fallTime;

  // Get how long the landing action takes
  const landingActionDurationSeconds: number = landAction.getClip().duration;
  const landingActionDurationMs: number = landingActionDurationSeconds * 1000;

  const jumpingActionDurationSeconds: number = jumpingAction.getClip().duration;
  const jumpingActionDurationMs: number = jumpingActionDurationSeconds * 1000;

  const entryAnimationTotalDurationMs: number =
    fallActionDurationMs + landingActionDurationMs;

  const timeSinceLastEntryStart: number = now - lastEntryByFall;

  const hasEntered: boolean =
    entryAnimationTotalDurationMs < timeSinceLastEntryStart;

  if (process.env.NODE_ENV === "development") {
    console.log("[avatarAnimation] hasEntered: ", hasEntered);
    console.table({
      timeSinceLastEntryStart,
      entryAnimationTotalDurationMs,
    });
  }

  if (hasEntered) {
    if (typeof lastExitByJump === "number") {
      if (process.env.NODE_ENV === "development") {
        console.log(
          "[avatarAnimation] Entry complete, and supposed to jump out... Jumping!",
        );
      }

      // Fade out other animations
      fallAction.fadeOut(jumpingActionDurationSeconds / 4);
      idleAction.fadeOut(jumpingActionDurationSeconds / 4);
      waveAction.fadeOut(jumpingActionDurationSeconds / 4);
      landAction.fadeOut(jumpingActionDurationSeconds / 4);

      // Play jumping animation
      jumpingAction.setLoop(LoopOnce, 1).play();
      return;
    } else {
      if (process.env.NODE_ENV === "development") {
        console.log(
          "[avatarAnimation] Avatar has entered but not exited, idling...",
        );
      }
      idleAction
        .setEffectiveTimeScale(0.5)
        .setLoop(LoopRepeat, Infinity)
        .fadeIn(entryAnimationTotalDurationMs / 1000)
        .play();
      return;
    }
  } else {
    if (process.env.NODE_ENV === "development") {
      console.log("[avatarAnimation] Entry not yet complete, falling in...");
    }

    // Play falling animation
    fallAction.setLoop(LoopRepeat, Infinity).play();
    // Slowly merge the fall action into the landing action

    const entryTimer1 = setTimeout(() => {
      if (fallAction.isRunning() || fallAction.isScheduled()) {
        fallAction.fadeOut(0.2);
      }
      landAction.reset().setLoop(LoopOnce, 1).play();

      idleAction
        .fadeIn(landingActionDurationSeconds)
        .setEffectiveTimeScale(0.5)
        .setLoop(LoopRepeat, Infinity)
        .play();
    }, avatarAnimationsConstants.fallTime - 100);

    return;
  }

  throw new Error("Unhandled animation state");
}

export default avatarAnimation;
