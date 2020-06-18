import React, { useState } from "react";
import { Typography, Button, Input } from "antd";

import SpaceW from "../common/SpaceW";

import useGithubAuthentication from "../../containers/GitHubAuthentication";

const { Text } = Typography;

const SupplyGithubPAT = () => {
  const {
    isChecking,
    checkAndSetPersonalAccessToken,
  } = useGithubAuthentication.useContainer();

  const [token, setToken] = useState("");

  return (
    <>
      <SpaceW direction="vertical">
        <Text strong>YACA</Text>
        <Text type="secondary">Yet Another Cooking App</Text>

        <Input
          placeholder="Github personal access token"
          onChange={(e) => setToken(e.target.value)}
          value={token}
        />

        <Button
          type="primary"
          block
          loading={isChecking}
          onClick={() => checkAndSetPersonalAccessToken({ token })}
        >
          Login
        </Button>
      </SpaceW>
    </>
  );
};

export default SupplyGithubPAT;
