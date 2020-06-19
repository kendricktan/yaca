import { AppProps } from "next/app";
import { CssBaseline, ZeitProvider } from "@zeit-ui/react";

import AuthenticationContainer from "../containers/GitHubAuthentication";
import GetGistContentContainer from "../containers/GetGistContent";
import GetGitHubGistIdContainer from "../containers/GetGitHubGistId";
import ExtractAndSaveRecipe from "../containers/ExtractAndSaveRecipe";
import SaveGithubGistContainer from "../containers/SaveGitHubGist";
import RecipeModalContainer from "../components/recipe/useRecipeModal";

function App({ Component, pageProps }: AppProps) {
  return (
    <ZeitProvider>
      <CssBaseline>
        <RecipeModalContainer.Provider>
          <AuthenticationContainer.Provider>
            <GetGitHubGistIdContainer.Provider>
              <GetGistContentContainer.Provider>
                <SaveGithubGistContainer.Provider>
                  <ExtractAndSaveRecipe.Provider>
                    <Component {...pageProps} />
                  </ExtractAndSaveRecipe.Provider>
                </SaveGithubGistContainer.Provider>
              </GetGistContentContainer.Provider>
            </GetGitHubGistIdContainer.Provider>
          </AuthenticationContainer.Provider>
        </RecipeModalContainer.Provider>
      </CssBaseline>
    </ZeitProvider>
  );
}

export default App;
