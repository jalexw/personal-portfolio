import type { AnimationAction } from "three";
import { LoopRepeat, LoopOnce } from "three";
import type { AvatarAnimationActions } from "./avatar_animation_actions";
import avatarAnimationsConstants from "./avatar_animation_constants";

const debug: boolean = process.env.NODE_ENV === "development";

export interface IAvatarAnimationInputs {
  debug: boolean;
  actions: AvatarAnimationActions;
  interactions: {
    lastEntryByFall: number;
    lastExitByJump: number | null;
    lastClickTime: number | null;
  };
}

function playFallAndLandAnimation(
  actions: AvatarAnimationActions,
): UnsubscribeFn {
  if (debug) {
    console.log("[playFallAndLandAnimation]");
  }

  // cancel other animations
  actions.waveAction.stop();
  actions.idleAction.stop();
  actions.jumpingAction.stop();

  // Play falling animation
  actions.fallAction.reset().setLoop(LoopRepeat, Infinity).play();
  // Slowly merge the fall action into the landing action

  const entryTimer = setTimeout(function onFallAnimationFinish(): void {
    if (actions.fallAction.isRunning() || actions.fallAction.isScheduled()) {
      actions.fallAction.fadeOut(0.2);
    }
    actions.landAction.reset().setLoop(LoopOnce, 1).play();

    const landActionDuration: number = actions.landAction.getClip().duration;

    if (debug) {
      console.log(
        "[onFallAnimationFinish] Fading landing animation into idle animation over duration of: ",
        landActionDuration,
      );
    }
    playIdleAnimation(actions, landActionDuration);
  }, avatarAnimationsConstants.fallTime - 100);

  const unsubscribe: UnsubscribeFn = (): void => {
    clearTimeout(entryTimer);
  };
  return unsubscribe;
}

function millisecondsToSeconds(ms: number): number {
  if (typeof ms !== "number") {
    throw new Error("Expected first argument to be a number!");
  }
  return ms / 1000;
}

function secondsToMilliseconds(secs: number): number {
  if (typeof secs !== "number") {
    throw new Error("Expected first argument to be a number!");
  }
  return secs * 1000;
}

function playJumpToExitAnimation(actions: AvatarAnimationActions): void {
  if (debug) {
    console.log("[playJumpToExitAnimation]");
  }

  const jumpingActionDurationSeconds: number =
    actions.jumpingAction.getClip().duration;

  // Fade out other animations
  actions.fallAction.fadeOut(jumpingActionDurationSeconds / 4);
  actions.idleAction.fadeOut(jumpingActionDurationSeconds / 4);
  actions.waveAction.fadeOut(jumpingActionDurationSeconds / 4);
  actions.landAction.fadeOut(jumpingActionDurationSeconds / 4);

  // Play jumping animation
  actions.jumpingAction.reset().setLoop(LoopOnce, 1).play();
  return;
}

function playWaveAnimation(actions: AvatarAnimationActions): UnsubscribeFn {
  if (debug) {
    console.log("[playWaveAnimation]");
  }

  actions.fallAction.stop();
  actions.landAction.stop();

  const waveDurationSeconds: number = actions.waveAction.getClip().duration;

  actions.waveAction
    .crossFadeFrom(actions.idleAction, waveDurationSeconds / 5)
    .reset()
    .play();
  const timer = setTimeout(
    function onWaveAnimationFinished(): void {
      if (debug) {
        console.log(
          "Wave animation should be done, resuming idle animation...",
        );
      }
      playIdleAnimation(actions, waveDurationSeconds / 5);
      return;
    },
    secondsToMilliseconds(waveDurationSeconds) * 0.8,
  );

  const unsubscribe: UnsubscribeFn = (): void => {
    clearTimeout(timer);
  };
  return unsubscribe;
}

function playIdleAnimation(
  actions: AvatarAnimationActions,
  fadeIn: number | undefined = undefined,
): void {
  if (debug) {
    console.log("[playIdleAnimation] Fading out non-idle animations...");
  }

  const fadeOutOthersTime: number = typeof fadeIn === "number" ? fadeIn : 0.2;
  actions.waveAction.fadeOut(fadeOutOthersTime);
  actions.landAction.fadeOut(fadeOutOthersTime);
  actions.fallAction.fadeOut(fadeOutOthersTime);

  if (debug) {
    console.log("[playIdleAnimation] Starting idle animation...");
  }

  const effectiveIdleActionTimeScale: number = 0.5;

  if (typeof fadeIn === "number") {
    if (debug) {
      console.log(
        "[playIdleAnimation] Fading in idle animation over custom duration: ",
        fadeIn,
      );
    }

    actions.idleAction
      .reset()
      .fadeIn(fadeIn)
      .setEffectiveTimeScale(effectiveIdleActionTimeScale)
      .setLoop(LoopRepeat, Infinity)
      .play();
  } else {
    if (debug) {
      console.log(
        "[playIdleAnimation] Playing idle animation without a custom 'fadeIn' time set...",
      );
    }

    actions.idleAction
      .reset()
      .setEffectiveTimeScale(effectiveIdleActionTimeScale)
      .setLoop(LoopRepeat, Infinity)
      .play();
  }
  return;
}

type UnsubscribeFn = () => void;

export function avatarAnimation({
  debug,
  actions,
  interactions,
}: IAvatarAnimationInputs): void | UnsubscribeFn {
  const { lastEntryByFall, lastExitByJump, lastClickTime } = interactions;

  const now: number = Date.now();

  if (debug) {
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
  const landingActionDurationSeconds: number =
    actions.landAction.getClip().duration;
  const landingActionDurationMs: number = landingActionDurationSeconds * 1000;

  const entryAnimationTotalDurationMs: number =
    fallActionDurationMs + landingActionDurationMs;

  const timeSinceLastEntryStart: number = now - lastEntryByFall;

  const hasEntered: boolean =
    entryAnimationTotalDurationMs < timeSinceLastEntryStart;

  let shouldAvatarBePresent: boolean = false;
  if (typeof lastExitByJump !== "number") {
    shouldAvatarBePresent = true;
  } else {
    // an exit time is set
    console.assert(
      typeof lastEntryByFall === "number" && typeof lastExitByJump === "number",
    );
    if (lastEntryByFall > lastExitByJump) {
      shouldAvatarBePresent = true;
    }
  }

  if (debug) {
    console.table({
      timeSinceLastEntryStart,
      entryAnimationTotalDurationMs,
      shouldAvatarBePresent,
      hasEntered,
      lastClickTime,
      lastEntryByFall,
      lastExitByJump,
    });
  }

  if (!shouldAvatarBePresent) {
    if (
      actions.jumpingAction.isRunning() ||
      actions.jumpingAction.isScheduled()
    ) {
      return;
    }
    playJumpToExitAnimation(actions);
    return;
  }

  if (hasEntered) {
    if (typeof lastClickTime === "number") {
      const msSinceLastClick = Math.abs(now - lastClickTime);
      if (msSinceLastClick < avatarAnimationsConstants.waveDuration) {
        return playWaveAnimation(actions);
      }
    }

    playIdleAnimation(actions);
    return;
  } else {
    if (debug) {
      console.log("[avatarAnimation] Entry not yet complete, falling in...");
    }
    return playFallAndLandAnimation(actions);
  }

  throw new Error("Unhandled animation state");
}

export default avatarAnimation;
