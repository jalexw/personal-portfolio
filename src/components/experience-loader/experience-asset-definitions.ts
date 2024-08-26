import type { AssetDefinition, ExperienceAssetFileTypes } from "./asset-def";

export const experienceAssetDefinitions = [
  {
    name: 'avatar',
    url: "/assets/models/alex_avatar.glb",
    type: 'gltf'
  }
] as const satisfies readonly AssetDefinition<string, string, ExperienceAssetFileTypes>[];

export type ExperienceAssetFileNames = typeof experienceAssetDefinitions[number]['name'];
export type ExperienceAssetFileURLs = typeof experienceAssetDefinitions[number]['url'];