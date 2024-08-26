import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

export type ExperienceAssetFileTypes = 'gltf';

export interface AssetDefinition<FileName extends string, URLPath extends string, FileType extends ExperienceAssetFileTypes> {
  name: FileName;
  url: URLPath;
  type: FileType;
};

export interface AssetRef<FileName extends string, FileType extends ExperienceAssetFileTypes> {
  name: FileName;
  type: FileType;
  asset: FileType extends 'gltf' ? GLTF : never;
}
