const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  id: Number,
  brand: String,
  description: String,
  image: String,
  price: Number,
});

module.exports = mongoose.model("tasks", TaskSchema);
