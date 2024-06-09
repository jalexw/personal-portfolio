import type { AssetDefinition, ExperienceAssetFileTypes } from "./asset-def";

export const experienceAssetDefinitions = [
  {
    name: 'penguin',
    url: "/assets/models/penguin.gltf",
    type: 'gltf'
  }
] as const satisfies readonly AssetDefinition<string, string, ExperienceAssetFileTypes>[] 

export type ExperienceAssetFileNames = typeof experienceAssetDefinitions[number]['name'];
export type ExperienceAssetFileURLs = typeof experienceAssetDefinitions[number]['url'];