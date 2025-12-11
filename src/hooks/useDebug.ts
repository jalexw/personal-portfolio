"use client";

import isDebugFlagSetInEnvironmentVariables from "@/lib/isDebugFlagSetInEnvironmentVariables";

export function useDebug(): boolean {
  try {
    if (process.env.NODE_ENV === "development") {
      return true;
    }
  } catch (e: unknown) {
    void e; // no-op
  }

  try {
    if (isDebugFlagSetInEnvironmentVariables()) {
      return true;
    }
  } catch (e: unknown) {
    void e; // no-op
  }

  return false;
}

export default useDebug;
