import AddByURL from "./AddByURL";

import useGetGistContent from "../../containers/GetGistContent";

const AddRecipe = () => {
  const { gistContent } = useGetGistContent.useContainer();

  return (
    <>
      <AddByURL />
    </>
  );
};

export default AddRecipe;
