export const facebookUser = "jalexwhitman" as const satisfies string;

function facebookUserPageLink<U extends string>(
  user: U,
): `https://www.facebook.com/${U}` {
  return `https://www.facebook.com/${user}`;
}

export const facebookLink = facebookUserPageLink(facebookUser);
