const { Schema, model } = require("mongoose");

const menuSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  dietary: {
    type: String,
  },
  allergies: {
    type: String,
    required: true,
  },
});

const Menu = model("Menu", menuSchema);

module.exports = Menu;
