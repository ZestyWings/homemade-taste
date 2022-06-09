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
    menu: [Menu]
  }

  type Menu {
    _id: ID!
  }

  type Query {
    me: User
    menu(_id: ID!): Menu
  }

  type Mutation {
    createUser(email: String!, password: String!, username: String!): Auth
    login(email: String!, password: String!): Auth
    createMenuEntry(_id: ID!): Menu
  }
`;

module.exports = typeDefs;
