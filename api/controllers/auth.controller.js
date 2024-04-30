import UserModel from "../Model/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    password === "" ||
    email === ""
  ) {
    next(errorHandler(400,"All Fields are Required"))
  }
try{
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new UserModel({
    username,
    email,
    password: hashedPassword,
  });
}
catch(error)
{
    next(error)
}
  try {
    await newUser.save();
    res.json({
      message: "SignUp successful",
    });
  } catch (error) {
    next(error);
  }
};
