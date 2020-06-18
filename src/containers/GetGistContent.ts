import { createContainer } from "unstated-next";
import React, { useState, useEffect } from "react";
import { notification } from "antd";

import useGetGitHubGistId, { YACA_GIST_FILENAME } from "./GetGitHubGistId";

export function useGetGistContent() {
  const [isGetting, setIsGetting] = useState(false);
  const [gistContent, setGistContent] = useState(null);

  const { gistId } = useGetGitHubGistId.useContainer();

  const getGistContent = async () => {
    setIsGetting(true);

    try {
      const resp = await fetch(`https://api.github.com/gists/${gistId}`);
      const respJson = await resp.json();

      const data = JSON.parse(respJson.files[YACA_GIST_FILENAME].content);

      setGistContent(data);
    } catch (e) {
      notification.error({
        message: "Failed to retrieve receipes",
        description: `https://gist.github.com${gistId} not found`,
      });
    }

    setIsGetting(false);
  };

  useEffect(() => {
    if (!gistId) return;

    getGistContent();
  }, [gistId]);

  return {
    isGetting,
    gistContent,
  };
}

export default createContainer(useGetGistContent);
