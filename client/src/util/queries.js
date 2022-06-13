import { gql } from "@apollo/client";

export const ME = gql`
  query me {
    me {
      _id
      username
      email
      bio
      location
      phone
      menus {
        _id
        name
      }
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

export const UPDATE_USER = gql`
  mutation updateUser($location: String, $bio: String, $phone: String) {
    updateUser(location: $location, bio: $bio, phone: $phone) {
      _id
      bio
      location
      phone
    }
  }
`;

export const ADD_MENU = gql`
  mutation addMenu($name: String!) {
    addMenu(name: $name) {
      _id
      name
    }
  }
`;

export const REMOVE_MENU = gql`
  mutation removeMenu($menuId: ID!) {
    removeMenu(menuId: $menuId) {
      _id
    }
  }
`;
