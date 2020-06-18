import { createContainer } from "unstated-next";
import { useState, useEffect } from "react";

export function useExtractRecipe() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [sourceURL, setSourceURL] = useState("");

  const extractRecipe = async ({ url }) => {
    setIsProcessing(true);

    try {
      const structuredDataUrl = `https://ingredients.schollz.now.sh/\?url\=${url} `;
      const res = await fetch(structuredDataUrl);
      const data = await res.json();

      setImageURL(data.image);
      setDescription(data.description);
      setIngredients(data.ingredients);
      setSourceURL(data.url);
      setTitle(data.title);
      setInstructions(data.instructions);

      setIsSuccess(true);
    } catch (e) {
      setIsSuccess(false);
    }

    setIsProcessing(false);
  };

  return {
    isSuccess,
    isProcessing,
    extractRecipe,
    ingredients,
    instructions,
    imageURL,
    description,
    title,
    sourceURL,
  };
}

export default createContainer(useExtractRecipe);
