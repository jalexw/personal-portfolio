export interface AvatarAnimationConstants {
  fallTime: number;
}

export const avatarAnimationsConstants = {
  fallTime: 750,
} as const satisfies AvatarAnimationConstants;
