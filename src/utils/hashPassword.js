// Utility function to see the hash of given plaintext password
const bcrypt = require("bcrypt");
const saltRounds = 10;

const hash = async (plainText) => {
  const hashedText = await bcrypt.hash(plainText, saltRounds);
  console.log("hashedText", hashedText);
  return hashedText;
};

const args = process.argv[2]
console.log("string to be hashed:",args);

hash(args);

module.exports = hash;
