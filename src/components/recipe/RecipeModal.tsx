import {
  Modal,
  Input,
  Tabs,
  Text,
  Spacer,
  Link,
  Textarea,
  Button,
  Grid,
} from "@zeit-ui/react";
import { useState, useEffect } from "react";

import styled from "styled-components";

import useGetGitHubGistContent from "../../containers/GetGistContent";
import useSaveGitHubGist from "../../containers/SaveGitHubGist";
import useRecipeModal from "./useRecipeModal";

// Assume its desktop by default
let windowHeight;
try {
  windowHeight = window.innerHeight;
} catch (e) {
  windowHeight = 900;
}

const ScrollableDiv = styled.div`
  overflow-y: auto;
  height: ${windowHeight > 900 ? 600 : 400}px;
`;

const RecipeModal = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    selectedRecipeId,
  } = useRecipeModal.useContainer();
  const { gistContent } = useGetGitHubGistContent.useContainer();
  const { isSaving, saveGithubGist } = useSaveGitHubGist.useContainer();

  const recipeData =
    gistContent && gistContent[selectedRecipeId]
      ? gistContent[selectedRecipeId]
      : {
          title: "",
          description: "",
          url: "",
          ingredients: [],
          instructions: [],
          image: "",
          tags: [],
        };

  const { title, description, url, ingredients, instructions } = recipeData;

  const [nRecipeData, setNRecipeData] = useState(Object.assign({}, recipeData));
  const setNRecipeKV = (key, value) =>
    setNRecipeData(Object.assign({}, nRecipeData, { [key]: value }));

  const [isConfirmDelete, setIsConfirmDelete] = useState(false);

  useEffect(() => {
    if (!gistContent) return;
    if (!gistContent[selectedRecipeId]) return;

    setNRecipeData(recipeData);
  }, [recipeData]);

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsConfirmDelete(false);
        }}
      >
        <Modal.Title>{title}</Modal.Title>
        <Modal.Content
          style={{
            overflowY: "initial",
          }}
        >
          <Tabs initialValue="info">
            <Tabs.Item label="Info" value="info">
              <ScrollableDiv>
                <p>{description}</p>
                <p>
                  <Link href={url} color>
                    Original source
                  </Link>
                </p>
              </ScrollableDiv>
            </Tabs.Item>
            <Tabs.Item label="Items" value="items">
              <ScrollableDiv>
                <>
                  <ul>
                    {ingredients.map((x) => (
                      <li>{x}</li>
                    ))}
                  </ul>
                </>
              </ScrollableDiv>
            </Tabs.Item>
            <Tabs.Item label="Steps" value="steps">
              <ScrollableDiv>
                <ol>
                  {instructions.map((x) => (
                    <li>{x}</li>
                  ))}
                </ol>
              </ScrollableDiv>
            </Tabs.Item>
            <Tabs.Item label="Edit" value="edit">
              <ScrollableDiv>
                <Text h4>Origin</Text>
                <Input
                  width="100%"
                  onChange={(e) => setNRecipeKV("url", e.target.value)}
                  value={nRecipeData.url}
                />
                <Spacer y={1} />
                <Text h4>Image</Text>
                <Input
                  width="100%"
                  onChange={(e) => setNRecipeKV("image", e.target.value)}
                  value={nRecipeData.image}
                />
                <Spacer y={1} />
                <Text h4>Title</Text>
                <Input
                  width="100%"
                  onChange={(e) => setNRecipeKV("title", e.target.value)}
                  value={nRecipeData.title}
                />
                <Spacer y={1} />
                <Text h4>Info</Text>
                <Input
                  width="100%"
                  onChange={(e) => setNRecipeKV("description", e.target.value)}
                  value={nRecipeData.description}
                />
                <Spacer y={1} />
                <Text h4>Items</Text>
                <Textarea
                  width="100%"
                  onChange={(e) =>
                    setNRecipeKV("ingredients", e.target.value.split("\n"))
                  }
                  value={nRecipeData.ingredients.join("\n")}
                />
                <Spacer y={1} />
                <Text h4>Steps</Text>
                <Textarea
                  width="100%"
                  onChange={(e) =>
                    setNRecipeKV("instructions", e.target.value.split("\n\n"))
                  }
                  value={nRecipeData.instructions.join("\n\n")}
                />
                <Spacer y={1} />
                <Text h4>Tags</Text>
                <Input
                  width="100%"
                  onChange={(e) =>
                    setNRecipeKV("tags", e.target.value.split(","))
                  }
                  placeholder="dessert,favorite"
                  value={nRecipeData.tags.join(",")}
                />
                <Spacer y={1} />
                <Button
                  onClick={() =>
                    saveGithubGist({
                      recipeId: selectedRecipeId,
                      recipeData: nRecipeData,
                    })
                  }
                  loading={isSaving}
                  style={{ width: "100%" }}
                  type="success"
                >
                  Save
                </Button>
                <Spacer y={1} />
                {isConfirmDelete ? (
                  <>
                    <Button
                      onClick={() => setIsConfirmDelete(false)}
                      style={{ width: "100%" }}
                      type="secondary"
                    >
                      Cancel Delete
                    </Button>

                    <Spacer y={1} />

                    <Button
                      onClick={() => {
                        saveGithubGist({
                          recipeId: selectedRecipeId,
                          recipeData: {},
                        });
                        setIsConfirmDelete(false);
                        setIsModalOpen(false);
                      }}
                      loading={isSaving}
                      style={{ width: "100%" }}
                      type="error"
                    >
                      Confirm Delete
                    </Button>
                  </>
                ) : null}
                {!isConfirmDelete ? (
                  <Button
                    onClick={() => setIsConfirmDelete(true)}
                    loading={isSaving}
                    style={{ width: "100%" }}
                    type="error"
                  >
                    Delete
                  </Button>
                ) : null}
                <Spacer y={1} />
              </ScrollableDiv>
            </Tabs.Item>
          </Tabs>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default RecipeModal;
