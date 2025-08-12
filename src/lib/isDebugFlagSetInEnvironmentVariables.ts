export function isDebugFlagSetInEnvironmentVariables(): boolean {
  const flag: string | undefined =
    process.env.NEXT_PUBLIC_JALEXW_PORTFOLIO_DEBUG;
  if (typeof flag === "string" && flag.toLowerCase().includes("true")) {
    return true;
  }
  return false;
}

export default isDebugFlagSetInEnvironmentVariables;
