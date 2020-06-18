import AddRecipe from "./AddRecipe";

import useGetGitHubGistId from "../../containers/GetGitHubGistId";

const Recipes = () => {
  const { gistId } = useGetGitHubGistId.useContainer();

  return (
    <>
      <AddRecipe></AddRecipe>
    </>
  );
};

export default Recipes;
