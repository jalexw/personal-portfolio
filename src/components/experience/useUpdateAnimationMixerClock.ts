import { useFrame } from "@react-three/fiber";
import type { AnimationMixer } from "three";

export function useUpdateAnimationMixerClock(mixer: AnimationMixer) {
  useFrame((state, delta) => {
    if (!state.clock.running) {
      state.clock.start();
    }
    mixer.update(delta);
  });
}

export default useUpdateAnimationMixerClock;
