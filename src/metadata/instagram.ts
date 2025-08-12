export const instagramUser = "jalexwhitman" as const satisfies string;

function instagramUserPageLink<U extends string>(
  user: U,
): `https://www.instagram.com/${U}` {
  return `https://www.instagram.com/${user}`;
}

export const instagramLink = instagramUserPageLink(instagramUser);
