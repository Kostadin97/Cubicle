const bcrypt = require("bcrypt");
const User = require("../models/User");

const saltRounds = 10;

const register = async ({ username, password }) => {
  let salt = await bcrypt.genSalt(saltRounds);
  let hash = await bcrypt.hash(password, salt);

  const user = new User({ username, password: hash });
  return await user.save();
};

module.exports = {
  register,
};
