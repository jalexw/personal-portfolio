export const githubUser = "jalexw" as const satisfies string;

function githubUserPageLink<U extends string>(
  user: U,
): `https://github.com/${U}` {
  return `https://github.com/${user}`;
}

export const githubLink = githubUserPageLink(githubUser);
