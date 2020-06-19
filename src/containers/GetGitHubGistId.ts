import { createContainer } from "unstated-next";
import React, { useState, useEffect } from "react";
import { useToasts } from "@zeit-ui/react";

import useGitHubAuthentication from "./GitHubAuthentication";

export const YACA_GIST_FILENAME = "yaca_database.json";

export function useGetGitHubGistId() {
  const [, setToasts] = useToasts();
  const [isProcessing, setIsProcessing] = useState(false);
  const [gistId, setGistId] = useState(null);

  const {
    username,
    personalAccessToken,
  } = useGitHubAuthentication.useContainer();

  const createYACAGistIfNotExists = async () => {
    setIsProcessing(true);

    // Basic authentication
    const tokenBase64 = Buffer.from(
      `${username}:${personalAccessToken}`
    ).toString("base64");
    const headers = {
      Authorization: `Basic ${tokenBase64}`,
    };

    // Get list of gists, and find filename
    const gistResp = await fetch(
      `https://api.github.com/users/${username}/gists`,
      {
        method: "GET",
        headers,
      }
    );
    const gistRespJson = await gistResp.json();

    // See if there's an existing 'database'
    let yacaGistId, hasExistingYACAGist;
    for (const { id, files } of gistRespJson) {
      for (const filename in files) {
        if (filename === YACA_GIST_FILENAME) {
          hasExistingYACAGist = true;
          yacaGistId = id;
          break;
        }
      }

      if (hasExistingYACAGist) break;
    }

    // Create a new gist
    if (!hasExistingYACAGist) {
      const createdResp = await fetch(`https://api.github.com/gists`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          files: {
            [YACA_GIST_FILENAME]: { content: "{}" },
          },
          public: true,
          description: "Yet another cooking app's database",
        }),
      });

      const createdJsonResp = await createdResp.json();

      yacaGistId = createdJsonResp.id;

      setToasts({
        text: "New recipe database created",
        type: "secondary",
      });
    } else {
      setToasts({
        text: "Found existing recipe database",
        type: "secondary",
      });
    }

    setGistId(yacaGistId);
    setIsProcessing(false);
  };

  useEffect(() => {
    if (!personalAccessToken) return;
    if (!username) return;

    createYACAGistIfNotExists();
  }, [personalAccessToken, username]);

  return {
    gistId,
    isProcessing,
  };
}

export default createContainer(useGetGitHubGistId);
