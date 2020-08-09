import { gql } from "apollo-boost";

export const LOGIN = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;
