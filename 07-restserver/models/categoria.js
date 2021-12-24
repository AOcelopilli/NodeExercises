const { Schema, model } = require("mongoose");
require("./user");

const CategorySchema = Schema({
  nombre: {
    type: String,
    required: [true, "el nombre es obligatorio."],
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = model("Category", CategorySchema);
