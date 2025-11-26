export function getContactEmail(): string {
  if (
    typeof process.env.NEXT_PUBLIC_CONTACT_EMAIL === "string" &&
    process.env.NEXT_PUBLIC_CONTACT_EMAIL.length > 0
  ) {
    return process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  }
  return "contact@jalexw.ca";
}

export const email: string = getContactEmail();
