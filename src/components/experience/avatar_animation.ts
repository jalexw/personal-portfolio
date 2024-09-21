import type { AnimationAction } from "three";
import { LoopRepeat, LoopOnce } from "three";

export function avatarAnimation(
  fallAction: AnimationAction,
  landAction: AnimationAction,
  waveAction: AnimationAction,
  idleAction: AnimationAction,
  jumpingAction: AnimationAction,
) {
  // Play falling animation
  fallAction.reset().play();
  fallAction.setLoop(LoopRepeat, Infinity);

  // After 1 second, transition to landing
  setTimeout(() => {
    const landingActionDurationSeconds: number = landAction.getClip().duration;
    const landingActionDurationMs: number = landingActionDurationSeconds * 1000;
    // Slowly merge the fall action into the landing action
    fallAction.fadeOut(landingActionDurationSeconds / 4);
    landAction
      .reset()
      .fadeIn(landingActionDurationSeconds / 8)
      .play();
    landAction.setLoop(LoopOnce, 1);

    // Start the idle action
    idleAction.fadeIn(landingActionDurationSeconds).play();
    idleAction.setEffectiveTimeScale(0.5);
    idleAction.setLoop(LoopRepeat, Infinity);

    landAction.fadeOut(landingActionDurationSeconds);
    fallAction.fadeOut(landingActionDurationSeconds);
  }, 1000);
}
