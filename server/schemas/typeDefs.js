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
    firstName: String
    lastName: String
    location: String
    bio: String
    phone: String
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

    updateUser(location: String, bio: String, phone: String): User

    updateMenu(_id: ID!, item: String): Menu

    addMenu(name: String!): Menu

    removeMenu(menuId: ID!): Menu
  }
`;

module.exports = typeDefs;
