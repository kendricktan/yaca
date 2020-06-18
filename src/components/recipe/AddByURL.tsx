import React, { useState } from "react";
import { Input } from "antd";
import useExtractRecipe from "../../containers/ExtractRecipe";

const ByURL = () => {
  const { extractRecipe } = useExtractRecipe.useContainer();

  return (
    <>
      <Input.Search
        placeholder={"https://sallysbakingaddiction.com/best-banana-cake/"}
        enterButton="Grab"
        onSearch={(url) => extractRecipe({ url })}
      />
    </>
  );
};

export default ByURL;
