import { AppProps } from "next/app";
import "antd/dist/antd.css";

import AuthenticationContainer from "../containers/GitHubAuthentication";
import GetGistContentContainer from "../containers/GetGistContent";
import GetGitHubGistIdContainer from "../containers/GetGitHubGistId";
import ExtractRecipeContainer from "../containers/ExtractRecipe";

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthenticationContainer.Provider>
      <GetGitHubGistIdContainer.Provider>
        <GetGistContentContainer.Provider>
          <ExtractRecipeContainer.Provider>
            <Component {...pageProps} />
          </ExtractRecipeContainer.Provider>
        </GetGistContentContainer.Provider>
      </GetGitHubGistIdContainer.Provider>
    </AuthenticationContainer.Provider>
  );
}

export default App;
