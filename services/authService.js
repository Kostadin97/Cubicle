const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/User");

const saltRounds = 10;
const secret = 'navcho';

const register = async ({ username, password }) => {
  let salt = await bcrypt.genSalt(saltRounds);
  let hash = await bcrypt.hash(password, salt);

  const user = new User({ username, password: hash });
  return await user.save();
};

const login = async ({ username, password }) => {
    //get user from db
    let user = await User.findOne({username});

    if (!user) {
        throw { message: 'User Not Found' };
    }
    //compare password hash
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw { message: 'Password does not match'};

    //generate token
    let token = jwt.sign({ _id: user._id }, secret);
    return token;
}

module.exports = {
  register,
  login
};
