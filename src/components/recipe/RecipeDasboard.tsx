import { Text, Select, Spacer } from "@zeit-ui/react";
import styled from "styled-components";

import AddRecipe from "./AddRecipe";
import RecipeModal from "./RecipeModal";
import ShowRecipes from "./ShowRecipes";

import useGithubAuthentication from "../../containers/GitHubAuthentication";

const DivRight = styled.div`
  text-align: right;
  float: right;
  margin-top: 10px;
`;

const DivFull = styled.div`
  width: 100%;
  height: 50px;
`;

const RecipeDasboard = () => {
  const {
    setPersonalAccessToken,
    setUsername,
  } = useGithubAuthentication.useContainer();

  return (
    <>
      <DivFull>
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
        <Text h2>YACA</Text>
      </DivFull>
      <>
        <Spacer y={1} />
        <AddRecipe />
        <Spacer y={1} />
        <ShowRecipes />
      </>
    </>
  );
};

export default RecipeDasboard;
