import type { AnimationAction } from "three";

export interface AvatarAnimationActions {
  fallAction: AnimationAction;
  landAction: AnimationAction;
  waveAction: AnimationAction;
  idleAction: AnimationAction;
  jumpingAction: AnimationAction;
}
