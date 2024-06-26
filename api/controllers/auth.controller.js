import UserModel from "../Model/user.model.js";
import bcryptjs from "bcryptjs";
import compareSync from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
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
    next(errorHandler(400, "All Fields are Required"))
  }

  try {

    const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return next(errorHandler(404, 'User already exists'));
    }
    const hashedPassword = bcryptjs.hashSync(password, 10)

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.json({
      message: "SignUp successful",
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || password === "" || email === "") {
    return next(errorHandler(400, "All Fields are Required"));
  }
  try {
    const validUser = await UserModel.findOne({ email });

    if (!validUser) {
      return next(errorHandler(400, "User doesnot exist."));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(400, "Email or Password is incorrect."));
    }

    const token = jwt.sign(
      {
        id: validUser._id,
        isAdmin:validUser.isAdmin
      },

      process.env.JWT_SECRET
     
    );
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id,isAdmin:user.isAdmin }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      res.status(200).cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      }).json(rest)
    }
    else
    {
      const generatedPassword = Math.random().toString(36).slice(-8) + 
      Math.random().toString(36).slice(-8)
      const hashedPassword = bcryptjs.hashSync(generatedPassword,10)

      const newUser = new UserModel({
        username:name.toLowerCase().split(' ').join('')+Math.random().toString(9).slice(-4),
        email,
        password:hashedPassword,
        profilePicture:googlePhotoUrl
      })
      await newUser.save()
      const token = jwt.sign({ id: user._id, isAdmin:newUser.isAdmin }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      res.status(200).cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      }).json(rest)
    }
  } catch (error) {
    next(error);
  }
};
