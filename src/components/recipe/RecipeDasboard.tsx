import { Spacer } from "@zeit-ui/react";

import AddRecipe from "./AddRecipe";
import RecipeModal from "./RecipeModal";
import ShowRecipes from "./ShowRecipes";

const RecipeDasboard = () => {
  return (
    <>
      <AddRecipe />
      <Spacer y={1} />
      <ShowRecipes />
      <RecipeModal />
    </>
  );
};

export default RecipeDasboard;
