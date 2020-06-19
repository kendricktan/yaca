import { createContainer } from "unstated-next";
import React, { useState, useEffect } from "react";
import { useToasts } from "@zeit-ui/react";

import useGetGitHubGistId, { YACA_GIST_FILENAME } from "./GetGitHubGistId";
import useGetGistContent from "./GetGistContent";
import useGitHubAuthentication from "./GitHubAuthentication";

export function useSaveGithubGist() {
  const [, setToasts] = useToasts();
  const [isSaving, setIsSaving] = useState(false);

  const { gistId } = useGetGitHubGistId.useContainer();
  const { gistContent, setGistContent } = useGetGistContent.useContainer();
  const {
    username,
    personalAccessToken,
  } = useGitHubAuthentication.useContainer();

  const saveGithubGist = async ({ recipeId, recipeData }) => {
    setIsSaving(true);

    // Clone it so we don't mutate anything
    const updatedGistContentClone = Object.assign({}, gistContent, {
      [recipeId]: recipeData,
    });

    // Delete if null
    if (Object.keys(recipeData).length === 0) {
      delete updatedGistContentClone[recipeId];
    }

    const tokenBase64 = Buffer.from(
      `${username}:${personalAccessToken}`
    ).toString("base64");
    const headers = {
      Authorization: `Basic ${tokenBase64}`,
    };

    try {
      await fetch(`https://api.github.com/gists/${gistId}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          files: {
            [YACA_GIST_FILENAME]: {
              content: JSON.stringify(updatedGistContentClone, null, 4),
            },
          },
          description: "Yet another cooking app's database",
        }),
      });
      setGistContent(updatedGistContentClone);

      setToasts({
        text: "Successfully updated recipe",
        type: "success",
      });
    } catch (e) {
      setToasts({
        text: "Failed to updated recipe",
        type: "error",
      });
    }

    setIsSaving(false);
  };

  return {
    isSaving,
    saveGithubGist,
  };
}

export default createContainer(useSaveGithubGist);
