import { useState } from "react";

import { Input, Spacer, Loading, Row, Text } from "@zeit-ui/react";

import useGetGistContent from "../../containers/GetGistContent";
import useGetGitHubGistId from "../../containers/GetGitHubGistId";
import useRecipeModal from "./useRecipeModal";

import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

import styled from "styled-components";

const GridListContainer = styled.div`
  display: flex;
  flexwrap: wrap;
  justifycontent: space-around;
  overflow: hidden;
`;

const GridListFull = styled(GridList)`
  width: 100%;
  height: 100%;
`;

const MyGridListTile = styled(GridListTile)`
  cursor: pointer;
`;

const DEFAULT_IMAGE = "https://i.imgur.com/rUPj2pR.jpg";

const ShowRecipes = () => {
  const { setIsModalOpen, setSelectedRecipeId } = useRecipeModal.useContainer();
  const { gistId } = useGetGitHubGistId.useContainer();
  const { isGetting, gistContent } = useGetGistContent.useContainer();

  const [searchTerm, setSearchTerm] = useState("");

  const recipeIds = Object.keys(gistContent || {});
  const filteredRecipeIds = recipeIds.filter((recipeId) => {
    const searchTermStandardized = searchTerm.trim().toLowerCase();
    const { title, tags } = gistContent[recipeId];

    // Display everything by default
    if (searchTermStandardized === "") {
      return true;
    }

    // Search by tag
    if (
      searchTermStandardized.slice(0, 5) === "tags:" ||
      searchTermStandardized.slice(0, 4) === "tag:"
    ) {
      const searchTags = searchTermStandardized.split(":")[1].split(",");

      for (const searchTag of searchTags) {
        for (const tag of tags) {
          if (tag.includes(searchTag)) {
            return true;
          }
        }
      }
    }

    // Else search by name
    return title.toLowerCase().includes(searchTermStandardized);
  });

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
      <Text h2>Recipes</Text>
      <Input
        value={searchTerm}
        width="100%"
        placeholder="Search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Spacer y={2} />
      <GridListContainer>
        <GridListFull cellHeight={180}>
          {filteredRecipeIds.map((recipeId) => {
            const { image, title } = gistContent[recipeId];

            return (
              <MyGridListTile
                onClick={() => {
                  setIsModalOpen(true);
                  setSelectedRecipeId(recipeId);
                }}
                key={recipeId}
              >
                <img src={image || DEFAULT_IMAGE} alt={title} />
                <GridListTileBar title={title} />
              </MyGridListTile>
            );
          })}
        </GridListFull>
      </GridListContainer>
    </>
  );
};

export default ShowRecipes;
