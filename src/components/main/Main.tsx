import { Row, Col } from "antd";
import styled from "styled-components";

import useQueryString from "./useQueryString";
import useGitHubAuthentication from "../../containers/GitHubAuthentication";

import Recipes from "../recipe/Recipes";
import SupplyGitHubPAT from "../supply-github-pat/SupplyGithubPat";

const Container = styled.div`
  margin-top: 24px;
  padding: 7px;
`;

export default () => {
  const { personalAccessToken } = useGitHubAuthentication.useContainer();
  // useQueryString();

  return (
    <Container>
      <Row justify="center">
        <Col span={16}>
          {personalAccessToken === null ? <SupplyGitHubPAT /> : <Recipes />}
        </Col>
      </Row>
    </Container>
  );
};
