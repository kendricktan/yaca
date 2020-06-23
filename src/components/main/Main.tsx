import { Page } from "@zeit-ui/react";

import useGitHubAuthentication from "../../containers/GitHubAuthentication";
import useRecipeModal from "../recipe/useRecipeModal";

import RecipeModal from "../recipe/RecipeModal";
import RecipeDasboard from "../recipe/RecipeDasboard";
import SupplyGitHubPAT from "../supply-github-pat/SupplyGithubPat";

import { createGlobalStyle } from "styled-components";

export default () => {
  const { personalAccessToken } = useGitHubAuthentication.useContainer();
  const { isModalOpen } = useRecipeModal.useContainer();

  // Disable scroll for the modal
  const GlobalStyle = createGlobalStyle`
    body {
      overflow: ${isModalOpen ? "hidden" : "auto"};
    }
  `;

  return (
    <>
      <GlobalStyle />
      <Page size="small">
        {personalAccessToken === null ? (
          <SupplyGitHubPAT />
        ) : (
          <RecipeDasboard />
        )}
      </Page>
      <RecipeModal />
    </>
  );
};
