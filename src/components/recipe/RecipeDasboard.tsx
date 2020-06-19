import { Select, Spacer } from "@zeit-ui/react";
import styled from "styled-components";

import AddRecipe from "./AddRecipe";
import RecipeModal from "./RecipeModal";
import ShowRecipes from "./ShowRecipes";

import useGithubAuthentication from "../../containers/GitHubAuthentication";

const DivRight = styled.div`
  text-align: right;
`;

const RecipeDasboard = () => {
  const {
    setPersonalAccessToken,
    setUsername,
  } = useGithubAuthentication.useContainer();

  return (
    <>
      <DivRight>
        <Select placeholder="Account">
          <Select.Option
            value="logout"
            onClick={() => {
              setPersonalAccessToken(null);
              setUsername(null);
            }}
          >
            Logout
          </Select.Option>
        </Select>
      </DivRight>
      <Spacer y={1} />
      <AddRecipe />
      <Spacer y={1} />
      <ShowRecipes />
      <RecipeModal />
    </>
  );
};

export default RecipeDasboard;
