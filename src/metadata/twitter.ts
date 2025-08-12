export const twitterUser = "jalexwhitman" as const satisfies string;

function twitterUserPageLink<U extends string>(
  user: U,
): `https://www.x.com/${U}` {
  return `https://www.x.com/${user}`;
}

export const twitterLink = twitterUserPageLink(twitterUser);
export const xLink = twitterLink;
