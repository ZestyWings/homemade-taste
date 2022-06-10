const { Schema, model } = require("mongoose");

const menuSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
  },
  dietary: {
    type: String,
  },
  allergies: {
    type: String,
  },
  item: {
    type: String,
  },
});

const Menu = model("Menu", menuSchema);

module.exports = Menu;
