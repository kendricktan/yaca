import { Text, Select, Spacer } from "@zeit-ui/react";

import AddRecipe from "./AddRecipe";
import RecipeModal from "./RecipeModal";
import ShowRecipes from "./ShowRecipes";

import useGithubAuthentication from "../../containers/GitHubAuthentication";

const RecipeDasboard = () => {
  const {
    setPersonalAccessToken,
    setUsername,
  } = useGithubAuthentication.useContainer();

  return (
    <>
      <div style={{ textAlign: "right" }}>
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
      </div>
      <Spacer y={1} />
      <AddRecipe />
      <Spacer y={1} />
      <ShowRecipes />
      <RecipeModal />
    </>
  );
};

export default RecipeDasboard;
