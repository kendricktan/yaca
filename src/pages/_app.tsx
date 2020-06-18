import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import * as theme from 'antd/dist/antd.css'

import AuthenticationContainer from "../containers/GitHubAuthentication";
import GetGitHubGistIdContainer from "../containers/GetGitHubGistId";
import ExtractRecipeContainer from "../containers/ExtractRecipe";

const WithProviders = ({ children }) => (
  <AuthenticationContainer.Provider>
    <GetGitHubGistIdContainer.Provider>
      <ExtractRecipeContainer.Provider>
        {children}
      </ExtractRecipeContainer.Provider>
    </GetGitHubGistIdContainer.Provider>
  </AuthenticationContainer.Provider>
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <WithProviders>
        <Component {...pageProps} />
      </WithProviders>
    </ThemeProvider>
  );
}

export default MyApp;
