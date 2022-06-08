const { Schema, model } = require("mongoose");

const menuSchema = new Schema({
  /*    
        // name
        // ingredients
        // dietary
        // allergies
        // city <-- I would put this in the User schema instead of here if you want to query users/companies by city
        // reference to User
    */
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
