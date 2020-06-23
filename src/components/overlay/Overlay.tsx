import React, { useEffect, useState } from "react";

import useRecipeModal from "../recipe/useRecipeModal";

const MockPage = ({ children }) => {
  const { isModalOpen, setIsModalOpen } = useRecipeModal.useContainer();

  return (
    <section className={isModalOpen ? "active" : ""}>
      {children}
      <style jsx>{`
        section {
          position: fixed;
          background-color: #fff;
          z-index: 1;
          top: -5000px;
          left: -5000px;
        }
        .active {
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
        }
      `}</style>
    </section>
  );
};

export default MockPage;
