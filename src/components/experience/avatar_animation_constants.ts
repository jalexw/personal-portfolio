export interface AvatarAnimationConstants {
  fallTime: number;
  waveDuration: number;
}

export const avatarAnimationsConstants = {
  fallTime: 750,
  waveDuration: 2250,
} as const satisfies AvatarAnimationConstants;

export default avatarAnimationsConstants;
