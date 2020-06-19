import React, { useState } from "react";
import { Row, Col, Text, Input, Button, Spacer } from "@zeit-ui/react";

import useGithubAuthentication from "../../containers/GitHubAuthentication";

const SupplyGithubPAT = () => {
  const {
    isChecking,
    checkAndSetPersonalAccessToken,
  } = useGithubAuthentication.useContainer();

  const [token, setToken] = useState("");

  return (
    <>
      <Text h2>YACA</Text>
      <Text style={{ color: "#ccc" }}>Yet Another Cooking App</Text>
      <Input
        width="100%"
        placeholder="Github personal access token"
        onChange={(e) => setToken(e.target.value)}
        value={token}
      />
      <Spacer />
      <Button
        type="success"
        style={{ width: "100%" }}
        loading={isChecking}
        onClick={() => checkAndSetPersonalAccessToken({ token })}
      >
        Login
      </Button>
    </>
  );
};

export default SupplyGithubPAT;
