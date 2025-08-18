import { LoadingManager } from "three";
import type {
  AssetDefinition,
  ExperienceAssetFileTypes,
  AssetRef,
} from "./experience-asset-definition";
import { type GLTF, GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import type {
  ExperienceAssetFileNames,
  ExperienceAssetFileURLs,
} from "@/lib/experience-asset-definitions";

export class PortfolioExperienceLoadManager {
  // Debug flag
  private readonly _debug: boolean;

  // Loading managers
  private loadingManager: LoadingManager;
  private gltfLoader: GLTFLoader;

  // Assets to load
  private readonly _initial_assets: readonly AssetDefinition<
    ExperienceAssetFileNames,
    ExperienceAssetFileURLs,
    ExperienceAssetFileTypes
  >[];

  // Loaded assets
  private _assets: Map<
    ExperienceAssetFileNames,
    AssetRef<ExperienceAssetFileNames, ExperienceAssetFileTypes>
  >;

  private onAssetLoad(...args: unknown[]): void {
    if (this.debug) {
      console.log("[onAssetLoad] Successfully loaded asset: ", args);
    }
  }

  private onAssetLoadProgress(...args: unknown[]): void {
    if (this.debug) {
      console.log("[onAssetLoadProgress] Progress Event:", args);
    }
  }

  public constructor(
    initial_assets: readonly AssetDefinition<
      ExperienceAssetFileNames,
      ExperienceAssetFileURLs,
      ExperienceAssetFileTypes
    >[],
    debug: boolean = false,
  ) {
    this._debug = debug;

    this.loadingManager = new LoadingManager(
      this.onAssetLoad,
      this.onAssetLoadProgress,
    );
    this.gltfLoader = new GLTFLoader(this.loadingManager);

    this._initial_assets = initial_assets;
    this._assets = new Map<
      ExperienceAssetFileNames,
      AssetRef<ExperienceAssetFileNames, ExperienceAssetFileTypes>
    >();
  }

  private get debug(): boolean {
    return this._debug;
  }

  private async loadGLTFAsset(
    asset_def: AssetDefinition<
      ExperienceAssetFileNames,
      ExperienceAssetFileURLs,
      "gltf"
    > & { type: "gltf" },
  ): Promise<GLTF> {
    if (this._assets.has(asset_def.name)) {
      try {
        const cached = this._assets.get(asset_def.name);
        if (!cached) {
          throw new Error("Failed to retrieve cached asset");
        }
        return cached.asset;
      } catch (e: unknown) {
        // no-op
        if (this.debug) {
          console.warn(`Error loading cached asset \"${asset_def.name}\"`);
        }
      }
    }

    const asset = await this.gltfLoader.loadAsync(
      asset_def.url,
      this.onAssetLoadProgress,
    );
    this._assets.set(asset_def.name, {
      name: asset_def.name,
      type: asset_def.type,
      asset,
    });
    return asset;
  }

  public async loadInitialAssets(): Promise<void> {
    const debug: boolean = this.debug;
    if (debug) {
      console.log(
        "[PortfolioExperienceLoadManager] loadInitialAssets() - Loading assets: ",
        this._initial_assets,
      );
    }
    await Promise.all(
      this._initial_assets.map(async (asset_def): Promise<void> => {
        if (asset_def.type !== "gltf") {
          throw new Error("Currently only GLTF assets are supported!");
        }
        const gltf = await this.loadGLTFAsset(asset_def);
        if (debug) {
          console.log(
            "[PortfolioExperienceLoadManager] loadInitialAssets() - Loaded asset: ",
            gltf,
          );
        }
      }),
    );
  }

  public get assets() {
    return this._assets;
  }
}

export default PortfolioExperienceLoadManager;
