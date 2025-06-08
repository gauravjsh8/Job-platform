import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { streamUpload } from "../utils/cloudinaryUpload.js";
import Job from "../models/jobModel.js";

export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists." });
    }

    let photoUrl = "";

    if (req.file) {
      const folder = req.file.mimetype.startsWith("image/")
        ? "user_photos"
        : "user_resumes";

      const resourceType = req.file.mimetype.startsWith("image/")
        ? "image"
        : "raw";
      try {
        const result = await streamUpload(
          req.file.buffer,
          folder,
          resourceType
        );
        photoUrl = result.secure_url;
      } catch (uploadErr) {
        return res
          .status(500)
          .json({ success: false, message: "Image upload failed." });
      }
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
      message: "User registered successfully.",
      newUser: userResponse,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
    });

    const userResponse = existingUser.toObject();
    delete userResponse.password;

    return res.status(200).json({
      success: true,
      message: "User logged in successfully.",
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

export const logoutUser = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(200).json({
    success: true,
    message: "User logged out successfully.",
  });
};

export const userProfile = async (req, res) => {
  const userId = req.user.userId;
  const user = await User.findById(userId);
  res.json(user);
};
