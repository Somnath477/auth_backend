import User from "../models/User.model.js";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.js";
import jwt from "jsonwebtoken";

// ================================================
// REGISTER USER
// ================================================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Create user
    const newUser = await User.create({
      name,
      email,
      password,
      verificationToken,
    });

    // Verification Link
    const verifyUrl = `http://localhost:5000/api/auth/verify-email/${verificationToken}`;

    const html = `
      <h2>Verify Your Email</h2>
      <p>Please click below to verify your account:</p>
      <a href="${verifyUrl}">Verify Email</a>
    `;

    // Send email
    await sendEmail(newUser.email, "Verify Your Email", html);

    return res.status(201).json({
      message: "Registration successful! Please verify your email.",
    });

  } catch (error) {
    console.log("Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// ================================================
// LOGIN USER
// ================================================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // OPTIONAL: Block login if email is not verified
    // if (!user.isVerified) {
    //   return res.status(403).json({ message: "Verify your email first" });
    // }

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Set refresh token in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // make true in production (HTTPS)
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Response
    res.json({
      message: "Login successful",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    });

  } catch (error) {
    console.log("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};




// ================================================
// VERIFY EMAIL
// ================================================
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Find user with this token
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Update user verification
    user.isVerified = true;
    user.verificationToken = undefined;

    await user.save();

    res.json({ message: "Email verified successfully!" });

  } catch (error) {
    console.log("Verify Email Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const refreshAccessToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    // Verify refresh token
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);

    // Generate new access token
    const newAccessToken = generateAccessToken(decoded.userId);

    return res.json({
      accessToken: newAccessToken,
    });

  } catch (error) {
    console.log("Refresh Token Error:", error);
    return res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
};
