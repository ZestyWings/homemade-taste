const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Auth {
    token: ID
    user: User
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    firstName: String!
    lastName: String!
    location: String!
    bio: String
    contactInfo: String!
    menus: [Menu]
  }

  type Menu {
    _id: ID!
    name: String!
    ingredients: String
    dietary: String
    allergies: String
    item: String
  }

  type Query {
    me: User
    menu(_id: ID!): [Menu]
    getUser(userId: ID!): User
    getUserLocation(location: String!): [User]
  }

  type Mutation {
    createUser(
      email: String!
      password: String!
      username: String!
      location: String
    ): Auth
    login(email: String!, password: String!): Auth
    createMenuEntry(_id: ID!): Menu
    updateMenu(_id: ID!, item: String): Menu
    addMenu(
      name: String!
      item: String
      ingredients: String
      dietary: String
      allergies: String
    ): Menu
    removeMenu(menuId: ID!, item: String): Menu
  }
`;

module.exports = typeDefs;
