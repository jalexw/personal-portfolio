export function getLinkedInUsername(): string {
  if (
    typeof process.env.NEXT_PUBLIC_LINKEDIN_USERNAME === "string" &&
    process.env.NEXT_PUBLIC_LINKEDIN_USERNAME.length > 0
  ) {
    return process.env.NEXT_PUBLIC_LINKEDIN_USERNAME;
  }
  return "jalexwhitman";
}

export const linkedInUser = getLinkedInUsername();

function linkedInUserPageLink<U extends string>(
  user: U,
): `https://www.linkedin.com/in/${U}` {
  return `https://www.linkedin.com/in/${user}`;
}

export const linkedInLink = linkedInUserPageLink(linkedInUser);
