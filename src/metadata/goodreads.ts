export function getGoodreadsUsername(): string {
  if (
    typeof process.env.NEXT_PUBLIC_GOODREADS_USERNAME === "string" &&
    process.env.NEXT_PUBLIC_GOODREADS_USERNAME.length > 0
  ) {
    return process.env.NEXT_PUBLIC_GOODREADS_USERNAME;
  }
  return "jalexwhitman";
}

export const goodreadsUser: string = getGoodreadsUsername();

function goodreadsUserPageLink(
  user: string = getGoodreadsUsername(),
): `https://goodreads.com/${string}` {
  return `https://goodreads.com/${user}`;
}

export const goodreadsLink = goodreadsUserPageLink();
