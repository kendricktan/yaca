import { useState } from "react";

import { Space, Spin, Typography, Card } from "antd";

import AddRecipe from "./AddRecipe";
import RecipeModal from "./RecipeModal";
import styled from "styled-components";

import useGetGistContent from "../../containers/GetGistContent";

const CardWrapper = styled.div`
  width: 100%;
  padding: 30px;
  background: #ececec;
`;

const Image = styled.img`
  max-height: 240px;
  max-width: 240px;
`;

const Recipes = () => {
  const { isGetting, gistContent } = useGetGistContent.useContainer();

  const [visible, setVisible] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const recipes = Object.keys(gistContent || {});

  return (
    <>
      <RecipeModal
        visible={visible}
        setVisible={setVisible}
        recipeData={
          (gistContent && gistContent[selectedRecipeId])
            ? gistContent[selectedRecipeId]
            : {
                title: "",
                description: "",
                url: "",
                ingredients: [],
                instructions: [],
                image: "",
              }
        }
        recipeId={selectedRecipeId}
      />

      <Space direction="vertical">
        <AddRecipe></AddRecipe>

        <CardWrapper>
          {isGetting ? <Spin tip="loading..." /> : null}
          {!isGetting && recipes.length === 0 ? (
            <Typography.Text>No recipes found!</Typography.Text>
          ) : (
            recipes.map((recipeId) => {
              const { image, title } = gistContent[recipeId];

              return (
                <Card
                  style={{ width: "240px" }}
                  hoverable
                  cover={<Image alt="example" src={`${image}`} />}
                  onClick={() => {
                    setVisible(true);
                    setSelectedRecipeId(recipeId);
                  }}
                >
                  <Card.Meta title={title} />
                </Card>
              );
            })
          )}
        </CardWrapper>
      </Space>
    </>
  );
};

export default Recipes;
