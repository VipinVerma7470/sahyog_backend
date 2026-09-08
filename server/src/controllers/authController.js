import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";


// ===============================
// Admin Login
// ===============================

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(admin._id);

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

// ===============================
// Change Admin Password
// ===============================

export const changePassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = req.body;

    // Required fields
    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "All password fields are required",
      });
    }

    // New password match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "New password and confirm password do not match",
      });
    }

    // Password length
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "New password must be at least 6 characters",
      });
    }

    // Logged-in admin ID middleware se milegi
    const admin = await Admin.findById(
      req.user.id
    );

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Current password verify
    const isPasswordMatch =
      await bcrypt.compare(
        currentPassword,
        admin.password
      );

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Hash new password
    const hashedPassword =
      await bcrypt.hash(newPassword, 10);

    admin.password = hashedPassword;

    await admin.save();

    res.status(200).json({
      success: true,
      message:
        "Password changed successfully",
    });

  } catch (error) {
    console.error(
      "Change Password Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to change password",
      error: error.message,
    });
  }
};