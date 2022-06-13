import { gql } from "@apollo/client";

export const ME = gql`
  query me {
    me {
      _id
      lastLogin
      username
      email
    }
  }
`;

export const QUERY_GET_LOCATIONS = gql`
  query getUserLocation($location: String!) {
    getUserLocation(location: $location) {
      _id
      username
    }
  }
`;
