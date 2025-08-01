import type { RefObject } from "react";
import type { Object3D, Object3DEventMap } from "three";

export type TAvatarRefData = Object3D<Object3DEventMap>;

export type TAvatarRef = RefObject<TAvatarRefData | null>;
