import { useState } from "react";

import {
  Input,
  Spacer,
  Image,
  Display,
  Loading,
  Row,
  Text,
} from "@zeit-ui/react";

import useGetGistContent from "../../containers/GetGistContent";
import useGetGitHubGistId from "../../containers/GetGitHubGistId";
import useRecipeModal from "./useRecipeModal";

const ShowRecipes = () => {
  const { setIsModalOpen, setSelectedRecipeId } = useRecipeModal.useContainer();
  const { gistId } = useGetGitHubGistId.useContainer();
  const { isGetting, gistContent } = useGetGistContent.useContainer();

  const [searchTerm, setSearchTerm] = useState("");

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
      <Text h2>Recipes</Text>
      <Input
        value={searchTerm}
        width="100%"
        placeholder="Search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {recipeIds
        .filter((recipeId) => {
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
        })
        .map((recipeId) => {
          const { image, title } = gistContent[recipeId];

          return (
            <div key={recipeId}>
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
            </div>
          );
        })}
    </>
  );
};

export default ShowRecipes;
