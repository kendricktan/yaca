import { useState } from "react";
import { Fieldset, Input, Button } from "@zeit-ui/react";

import useExtractAndConfirmRecipe from "../../containers/ExtractAndSaveRecipe";

const AddRecipe = () => {
  const {
    isProcessing,
    extractAndSaveRecipe,
  } = useExtractAndConfirmRecipe.useContainer();

  const [url, setURL] = useState("");

  return (
    <Fieldset>
      <Fieldset.Title>Add New Recipe</Fieldset.Title>
      <Fieldset.Subtitle>
        Input a URL below to automatically extract recipe information. You can add a custom recipe by leaving the URL blank.
      </Fieldset.Subtitle>
      <Input
        width="100%"
        placeholder={"https://sallysbakingaddiction.com/best-banana-cake/"}
        onChange={(e) => setURL(e.target.value)}
        value={url}
      />
      <Fieldset.Footer>
        <Fieldset.Footer.Status />
        <Fieldset.Footer.Actions>
          <Button auto onClick={() => setURL("")}>
            Clear
          </Button>
          <Button
            auto
            loading={isProcessing}
            onClick={() => extractAndSaveRecipe({ url })}
          >
            Add
          </Button>
        </Fieldset.Footer.Actions>
      </Fieldset.Footer>
    </Fieldset>
  );
};

export default AddRecipe;
