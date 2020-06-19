import { createContainer } from "unstated-next";
import React, { useState } from "react";
import { useToasts } from "@zeit-ui/react";
import useLocalStorageState from "use-local-storage-state";

const YACA_GITHUB_PAT_KEY = "YACA_GITHUB_PAT";
const YACA_GITHUB_USERNAME_KEY = "YAVA_GITHUB_USERNAME";

export function useGitHubAuthentication() {
  const [, setToast] = useToasts();

  const [personalAccessToken, setPersonalAccessToken] = useLocalStorageState(
    YACA_GITHUB_PAT_KEY,
    null
  );
  const [username, setUsername] = useLocalStorageState(
    YACA_GITHUB_USERNAME_KEY,
    null
  );

  const [isChecking, setIsChecking] = useState(false);

  const checkAndSetPersonalAccessToken = async ({ token }) => {
    setIsChecking(true);

    // Check to see if token is valid
    const tokenBase64 = Buffer.from(`username:${token}`).toString("base64");

    try {
      const resp = await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
          Authorization: `Basic ${tokenBase64}`,
        },
      });

      // Login is the username
      const { login } = await resp.json();

      if (login === undefined) {
        throw new Error("Invalid token");
      }

      setPersonalAccessToken(token);
      setUsername(login);

      setToast({
        text: "Logged In",
        type: "success",
      });
    } catch (e) {
      setToast({
        text: "Unable to Login",
        type: "error",
      });
    }

    setIsChecking(false);
  };

  return {
    username,
    personalAccessToken,
    setPersonalAccessToken,
    setUsername,
    checkAndSetPersonalAccessToken,
    isChecking,
  };
}

export default createContainer(useGitHubAuthentication);
