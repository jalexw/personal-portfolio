export default function domain(): string {
  if (
    typeof process.env.NEXT_PUBLIC_WEB_DOMAIN === "string" &&
    process.env.NEXT_PUBLIC_WEB_DOMAIN.length > 0
  ) {
    return process.env.NEXT_PUBLIC_WEB_DOMAIN;
  }
  return "jalexw.ca";
}
