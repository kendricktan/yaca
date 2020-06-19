import { useState } from "react";

import { Spacer, Image, Display, Loading, Row, Text } from "@zeit-ui/react";

import useGetGistContent from "../../containers/GetGistContent";
import useGetGitHubGistId from "../../containers/GetGitHubGistId";
import useRecipeModal from "./useRecipeModal";

const ShowRecipes = () => {
  const { setIsModalOpen, setSelectedRecipeId } = useRecipeModal.useContainer();
  const { gistId } = useGetGitHubGistId.useContainer();
  const { isGetting, gistContent } = useGetGistContent.useContainer();

  const recipeIds = Object.keys(gistContent || {});

  if (isGetting || !gistId) {
    return (
      <Row style={{ padding: "10px 0" }}>
        <Loading>Loading</Loading>
      </Row>
    );
  }

  if (gistId && !isGetting && recipeIds.length === 0) {
    return (
      <Text style={{ color: "#ccc" }}>
        No recipes found! Add one to get started
      </Text>
    );
  }

  return (
    <>
      {recipeIds.map((recipeId) => {
        const { image, title } = gistContent[recipeId];

        return (
          <>
            <Display
              style={{ cursor: "pointer" }}
              onClick={() => {
                setIsModalOpen(true);
                setSelectedRecipeId(recipeId);
              }}
              shadow
              caption={
                <span style={{ display: "block", marginTop: "-1rem" }}>
                  {title}
                </span>
              }
            >
              <Image
                width={435}
                height={200}
                src={image}
                style={{ objectFit: "cover", maxHeight: "200px" }}
              />
            </Display>

            <Spacer y={1} />
          </>
        );
      })}
    </>
  );
};

export default ShowRecipes;
