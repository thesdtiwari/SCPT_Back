const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const LoginSchema = new Schema({
  email: {
    type: String,
    unique: true, // `email` must be unique
  },
  password: String,
  details: String,
});

// The code in the UserScheme.pre() function is called a pre-hook.
// Before the user information is saved in the database, this function will be called,
// you will get the plain text password, hash it, and store it
LoginSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);

  user.password = hash;
  next();
});

// bcrypt hashes the password sent by the user for login
// and checks if the hashed password stored in the database matches the one sent.
// It will return true if there is a match.
// Otherwise, it will return false if there is not a match.
LoginSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

// create test model
const loginModel = mongoose.model("logintest", LoginSchema);

module.exports = loginModel;
