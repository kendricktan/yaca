import { createContainer } from "unstated-next";
import { useState, useEffect } from "react";

export function useRecipeModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  return {
    isModalOpen,
    setIsModalOpen,
    selectedRecipeId,
    setSelectedRecipeId,
  };
}

export default createContainer(useRecipeModal);
