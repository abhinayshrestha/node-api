const AuthModel = require("../model/user.model");
const bcrypt = require("bcrypt");
exports.signUpService = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    const auth = new AuthModel({
      fullName: req.body.fullName,
      password: hash,
      email: req.body.email,
    });
    const response = await auth.save();
    res.status(200).json({
      response,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

exports.loginService = async (req, res, next) => {
  try {
    const user = await AuthModel.findOne({ email: req.body.email });
    if (user) {
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        return res.status(200).json(user);
      } else {
        throw new Error("Password doesnot match");
      }
    } else {
      throw new Error("User doesnot exist");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: error.message ?? "Something went wrong",
    });
  }
};
