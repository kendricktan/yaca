import { useEffect } from "react";
import queryString from "query-string";

import useGitHubAuthentication from "../../containers/GitHubAuthentication";

const useQueryString = () => {
  // const { personalAccessToken } = useGitHubAuthentication.useContainer();

  // useEffect(() => {
  //   const queryObj = queryString.parse(window.location.search);
  // }, [personalAccessToken]);

  return {};
};

export default useQueryString;
