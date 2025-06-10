import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcryptjs";
import User from "../models/userModel.js";
import { streamUpload } from "../utils/cloudinaryUpload.js";
import Job from "../models/jobModel.js";
import { sendMail } from "../utils/sendEmail.js";

import crypto from "crypto";

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

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   sameSite: "strict",
    //   maxAge: 24 * 60 * 60 * 1000,
    //   secure: process.env.NODE_ENV === "production",
    // });

    res.cookie("token", token, {
      httpOnly: false,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
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

// export const logoutUser = async (req, res) => {
//   res.clearCookie("token", {
//     httpOnly: true,
//     sameSite: "strict",
//     secure: process.env.NODE_ENV === "production",
//   });

//   return res.status(200).json({
//     success: true,
//     message: "User logged out successfully.",
//   });
// };

res.cookie("token", token, {
  hhttpOnly: false,
  sameSite: "none",
  secure: true,
});

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userToDelete = await User.findById(userId);

    if (!userToDelete) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    if (userToDelete.role === "superadmin") {
      return res.status(401).json({
        success: false,
        message: "Access denied.You can't delete Superadmins",
      });
    }
    await User.findOneAndDelete(userToDelete);
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const userProfile = async (req, res) => {
  const userId = req.user.userId;
  const user = await User.findById(userId);
  res.json(user);
};

export const allUsers = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { page = 1, limit = 10 } = req.query;

    const users = await User.find()
      .limit(Number(limit))
      .skip((page - 1) * limit);

    const total = await User.countDocuments(users);
    res.status(200).json({
      users: users,
      limit: Number(limit),
      page: Number(page),
      total: total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" });
    res.status(200).json({ admin: admins });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const message = `
      <h3>Password Reset Request</h3>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link expires in 1 hour.</p>
    `;

    await sendMail(user.email, "Password Reset", message);

    res.status(200).json({ message: "Reset link sent to your email." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Token is invalid or expired" });
    }

    user.password = await bcrypt.hash(password, 8);
    (user.resetPasswordToken = undefined),
      (user.resetPasswordExpires = undefined);
    await user.save();
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const allowedRoles = ["user", "admin", "superadmin"];
    if (!allowedRoles.includes(role)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid role specified." });
    }

    const userToUpdate = await User.findById(id);

    if (!userToUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    if (
      req.user.role === "superadmin" &&
      userToUpdate._id.toString() === req.user.userId.toString() &&
      role !== "superadmin"
    ) {
      return res.status(403).json({
        success: false,
        message: "A superadmin cannot demote their own role.",
      });
    }

    if (userToUpdate.role === "superadmin" && role !== "superadmin") {
      const superadminCount = await User.countDocuments({ role: "superadmin" });
      if (
        superadminCount === 1 &&
        userToUpdate._id.toString() === req.user.userId.toString()
      ) {
        return res.status(403).json({
          success: false,
          message: "Cannot demote the last superadmin.",
        });
      }
    }

    userToUpdate.role = role;
    await userToUpdate.save();

    res
      .status(200)
      .json({ success: true, message: `User role updated to ${role}.` });
  } catch (error) {
    console.error("Error updating user role:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during role update." });
  }
};
