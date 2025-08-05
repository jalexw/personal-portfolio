"use client";

export function useDebug(): boolean {
  try {
    if (process.env.NODE_ENV === "development") {
      return true;
    }
  } catch (e: unknown) {}
  return false;
}

export default useDebug;
