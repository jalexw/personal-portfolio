import { githubUser } from "./github";

const repoName: string = "personal-portfolio";

export function getPortfolioGithubRepositoryHref(): string {
  return `https://github.com/${githubUser}/${repoName}`;
}

export default getPortfolioGithubRepositoryHref;
