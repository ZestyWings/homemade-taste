const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const { User, Menu } = require("../models");
const { signToken } = require("../util/auth");

const resolvers = {
  Query: {
    me: async (parent, args, ctx) => {
      // if ctx.user is undefined, then no token or an invalid token was
      // provided by the client.
      if (!ctx.user) {
        throw new AuthenticationError("Must be logged in.");
      }
      return User.findOne({ email: ctx.user.email }).populate("menus");
    },
    getUser: async (parent, args, ctx) => {
      // TODO: get another user
      if (!ctx.user) {
        throw new AuthenticationError("Must be logged in.");
      }
      return User.findOne({ _id: args.userId }).populate("menus");
    },
    getUserLocation: async (parents, { location }, ctx) => {
      if (!ctx.user) {
        throw new AuthenticationError("Must be logged in.");
      }

      return User.find({ location }).populate("menus");
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      try {
        const user = await User.create({ ...args });
        const token = await signToken(user);
        return { user, token };
      } catch (error) {
        if (error.name === "MongoError" && error.code === 11000) {
          const [[key, value]] = Object.entries(error.keyValue);
          throw new UserInputError(`${key} "${value}" already exists.`);
        }
        throw error;
      }
    },
    login: async (parent, args) => {
      const { email, password } = args;
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Invalid username or password");
      }
      const authentic = await user.isCorrectPassword(password);
      if (!authentic) {
        throw new AuthenticationError("Invalid username or password");
      }
      const token = await signToken(user);
      user.lastLogin = Date.now();
      await user.save();
      return { token, user };
    },
    updateMenu: async (parent, args, ctx) => {
      if (ctx.user) {
        return await Menu.findByIdAndUpdate(ctx.menu._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },

    updateUser: async (parent, args, ctx) => {
      if (ctx.user) {
        return await User.findByIdAndUpdate(ctx.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },

    addMenu: async (parent, args, ctx) => {
      if (ctx.user) {
        const menu = await Menu.create(args);
        const updatedUser = await User.findOneAndUpdate(
          { _id: ctx.user._id },
          { $addToSet: { menus: menu._id } }
        );

        return menu;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeMenu: async (parent, { menuId }, ctx) => {
      if (ctx.user) {
        const menu = await Menu.findOneAndDelete({
          _id: menuId,
        });

        await User.findOneAndUpdate(
          { _id: ctx.user._id },
          { $pull: { menus: menuId } }
        );

        return menu;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
