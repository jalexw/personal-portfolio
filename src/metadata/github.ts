export function getGithubUsername(): string {
  if (
    typeof process.env.NEXT_PUBLIC_GITHUB_USERNAME === "string" &&
    process.env.NEXT_PUBLIC_GITHUB_USERNAME.length > 0
  ) {
    return process.env.NEXT_PUBLIC_GITHUB_USERNAME;
  }
  return "jalexw";
}

export const githubUser: string = getGithubUsername();

function githubUserPageLink<U extends string>(
  user: U,
): `https://github.com/${U}` {
  return `https://github.com/${user}`;
}

export const githubLink = githubUserPageLink(githubUser);
