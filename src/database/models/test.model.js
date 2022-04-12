const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestSchema = new Schema({
  test1: String,
  test2: String,
  test3: Number,
});

// create test model
const testModel = mongoose.model("test", TestSchema);

module.exports = testModel;
