export function getGeographicLocation(): string {
  if (
    typeof process.env.NEXT_PUBLIC_GEOGRAPHIC_LOCATION === "string" &&
    process.env.NEXT_PUBLIC_GEOGRAPHIC_LOCATION.length > 0
  ) {
    return process.env.NEXT_PUBLIC_GEOGRAPHIC_LOCATION;
  }
  return "Halifax, NS 🇨🇦";
}

export const geographic_location: string = getGeographicLocation();
export default geographic_location;
