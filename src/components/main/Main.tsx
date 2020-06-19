import { Page } from "@zeit-ui/react";

import useGitHubAuthentication from "../../containers/GitHubAuthentication";

import RecipeDasboard from "../recipe/RecipeDasboard";
import SupplyGitHubPAT from "../supply-github-pat/SupplyGithubPat";

export default () => {
  const { personalAccessToken } = useGitHubAuthentication.useContainer();

  return (
    <Page size='large'>
      {personalAccessToken === null ? <SupplyGitHubPAT /> : <RecipeDasboard />}
    </Page>
  );
};
