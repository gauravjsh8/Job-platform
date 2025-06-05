import User from "../models/userModel.js";
import { streamUpload } from "../utils/cloudinaryUpload.js";

import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    if (!name || !email || !password || !role) {
      return res
        .status(403)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already Exist" });
    }

    let photoUrl = "";
    if (req.file) {
      const result = await streamUpload(req.file.buffer);
      console.log("RESULT_PHOTO", result);
      photoUrl = result.secure_url;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      photoUrl,
    });

    const userResponse = newUser.toObject();

    delete userResponse.password;

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      newUser: userResponse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res
        .status(403)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User is not registered with this email.",
      });
    }

    if (existingUser.role !== role) {
      return res.status(401).json({
        success: false,
        message: "Invalid role provided.",
      });
    }
    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordMatch) {
      return res.status(403).json({
        success: false,
        message: "Invalid Password.",
      });
    }

    const userResponse = existingUser.toObject();

    delete userResponse.password;
    return res.status(200).json({
      success: true,
      message: "User loggedin successfully.",
      user: userResponse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
