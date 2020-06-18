import { Row, Col } from "antd";
import styled from "styled-components";

import useQueryString from "./useQueryString";
import useGitHubAuthentication from "../../containers/GitHubAuthentication";

import Recipes from "../recipe/Recipes";
import SupplyGitHubPAT from "../supply-github-pat/SupplyGithubPat";

const Container = styled.div`
  padding: 7px;
`;

const RowFull = styled(Row)`
  height: 100vh;
`;

export default () => {
  const { personalAccessToken } = useGitHubAuthentication.useContainer();
  useQueryString();

  if (personalAccessToken === null) {
    return (
      <Container>
        <RowFull justify="space-around" align="middle">
          <Col span={8}>
            <SupplyGitHubPAT />
          </Col>
        </RowFull>
      </Container>
    );
  }

  return (
    <Container>
      <Row justify="center">
        <Col span={16}>
          <Recipes />
        </Col>
      </Row>
    </Container>
  );
};
