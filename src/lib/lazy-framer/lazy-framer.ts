import type { FeatureBundle } from 'framer-motion';

export async function loadFramerMotionFeatures(): Promise<FeatureBundle> {
  if (process.env.NODE_ENV === 'development') {
    console.log('loadFramerMotionFeatures - Attempting to lazy load framer-motion domAnimation')
  }
  const { domAnimation } = await import('framer-motion');
  if (process.env.NODE_ENV === 'development') {
    console.log('loadFramerMotionFeatures - Loaded framer-motion domAnimation')
  }
  return domAnimation;
}
