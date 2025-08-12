export const linkedInUser = "jalexwhitman" as const satisfies string;

function linkedInUserPageLink<U extends string>(
  user: U,
): `https://www.linkedin.com/in/${U}` {
  return `https://www.linkedin.com/in/${user}`;
}

export const linkedInLink = linkedInUserPageLink(linkedInUser);
