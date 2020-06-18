import { Modal, Form, Input } from "antd";
import { useState, useEffect } from "react";

const RecipeModal = ({ visible, setVisible, recipeId, recipeData }) => {
  const {
    title,
    description,
    url,
    ingredients,
    instructions,
    image,
  } = recipeData;

  const [nTitle, setNTitle] = useState(title);
  const [nDescription, setNDescription] = useState(description);
  const [nURL, setNURL] = useState(url);
  const [nIngredients, setNIngredients] = useState(ingredients.join("\n"));
  const [nInstructions, setNInstructions] = useState(instructions);
  const [nImage, setNImage] = useState(image);

  useEffect(() => {
    setNTitle(title);
    setNDescription(description);
    setNURL(url);
    setNIngredients(ingredients.join("\n"));
    setNInstructions(instructions.join("\n"));
    setNImage(image);
  }, [title, description, url, ingredients, instructions, image]);

  console.log(nTitle);
  console.log(nDescription);
  console.log(nIngredients);

  return (
    <>
      <Modal
        title={recipeId}
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <Form>
          <Form.Item name={["recipe", "title"]} label="Title">
            <Input value={nTitle} onChange={(e) => setNTitle(e.target.value)} />
          </Form.Item>
          <Form.Item name={["recipe", "description"]} label="Description">
            <Input
              value={nDescription}
              onChange={(e) => setNDescription(e.target.value)}
            />
          </Form.Item>
          <Form.Item name={["recipe", "url"]} label="URL">
            <Input value={nURL} onChange={(e) => setNURL(e.target.value)} />
          </Form.Item>
          <Form.Item name={["recipe", "ingredients"]} label="Ingredients">
            <Input.TextArea
              value={nIngredients}
              onChange={(e) => setNIngredients(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RecipeModal;
