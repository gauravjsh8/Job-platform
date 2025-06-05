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

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      newUser: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
