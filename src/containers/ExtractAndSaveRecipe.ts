import { createContainer } from "unstated-next";
import { useState, useEffect } from "react";
import { useToasts } from "@zeit-ui/react";
import { v4 as uuidv4 } from "uuid";

import useRecipeModal from "../components/recipe/useRecipeModal";
import useSaveGitHubGists from "./SaveGitHubGist";

export function useExtractAndSaveRecipe() {
  const [, setToast] = useToasts();
  const [isProcessing, setIsProcessing] = useState(false);

  const { setIsModalOpen, setSelectedRecipeId } = useRecipeModal.useContainer();
  const { saveGithubGist } = useSaveGitHubGists.useContainer();

  const extractAndSaveRecipe = async ({ url }) => {
    setIsProcessing(true);

    // Create a new recipe id for it
    const newRecipeId = uuidv4();

    // If empty URL
    if (url === "") {
      // Save it
      await saveGithubGist({
        recipeId: newRecipeId,
        recipeData: {
          title: "Untitled",
          description: "",
          url: "",
          ingredients: [],
          instructions: [],
          image: "",
          tags: [],
        },
      });

      setToast({
        text: "Recipe added from URL",
        type: "success",
      });

      // Open up modal and set the selected recipe id
      setSelectedRecipeId(newRecipeId);
      setIsModalOpen(true);

      return;
    }

    try {
      // Extract data from
      const structuredDataUrl = `https://yaca-ingredients.netlify.app/?url=${url} `;
      const res = await fetch(structuredDataUrl, { mode: "cors" });
      const data = await res.json();

      // Ingredients just needs to be a list
      const newIngredients = data.ingredients
        ? data.ingredients.map((x) => x.line)
        : [];
      const newInstructions = data.instructions ? data.instructions : [];
      const newRecipeData = Object.assign({}, data, {
        ingredients: newIngredients,
        instructions: newInstructions,
        tags: [],
      });

      // Save it
      await saveGithubGist({
        recipeId: newRecipeId,
        recipeData: newRecipeData,
      });

      setToast({
        text: "Recipe added from URL",
        type: "success",
      });

      // Open up modal and set the selected recipe id
      setSelectedRecipeId(newRecipeId);
      setIsModalOpen(true);
    } catch (e) {
      setToast({
        text: "Failed to extract from URL",
        type: "error",
      });

      // Empty recipe data
      const newRecipeData = Object.assign(
        {},
        {
          ingredients: [],
          instructions: [],
          tags: [],
        }
      );

      // Save it
      await saveGithubGist({
        recipeId: newRecipeId,
        recipeData: newRecipeData,
      });

      // Open up modal and set the selected recipe id
      setSelectedRecipeId(newRecipeId);
      setIsModalOpen(true);
    }
    setIsProcessing(false);
  };

  return {
    isProcessing,
    extractAndSaveRecipe,
  };
}

export default createContainer(useExtractAndSaveRecipe);
