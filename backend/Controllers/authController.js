import bcrypt from "bcrypt";
import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Signup successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Signup failed",
      error: error.message
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, loginAs } = req.body;

    if (!email || !password || !loginAs) {
      return res.status(400).json({
        message: "Email, password and login type are required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Check selected login type with database role
    if (user.role !== loginAs) {
      return res.status(403).json({
        message: `This account is not registered as ${loginAs}`
      });
    }

    if (!user.password) {
      return res.status(400).json({
        message: "Please login using Google"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m"
      }
    );

    const refreshToken = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.status(200).json({
      message: "Login successful",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },

      accessToken,
      refreshToken
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);

    res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
};

export const refreshAccessToken = (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token required"
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const newAccessToken = jwt.sign(
      {
        userId: decoded.userId,
        role: decoded.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m"
      }
    );

    res.status(200).json({
      accessToken: newAccessToken
    });

  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired refresh token"
    });
  }
};
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    // res.status(200).json({
    //   message: "Password reset token generated",
    //   resetToken
    // });
    const resetLink =
  `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: email,
  subject: "Reset Your Password",
  html: `
    <h2>Password Reset</h2>

    <p>You requested to reset your password.</p>

    <p>Click the button below to create a new password:</p>

    <a href="${resetLink}"
      style="display:inline-block;
        padding:10px 20px;
        background:#000;
        color:#fff;
        text-decoration:none;
        border-radius:5px;">
      Reset Password
    </a>

    <p>This link will expire in 15 minutes.</p>

    <p>If you didn't request this, you can ignore this email.</p>
  `
});

res.status(200).json({
  message: "Password reset link sent to your email"
});

  } catch (error) {
  console.log("FORGOT PASSWORD ERROR:", error);

  res.status(500).json({
    message: "Failed to process request",
    error: error.message
  });
}
}

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        message: "New password is required"
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset token"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({
      message: "Password reset successful"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to reset password",
      error: error.message
    });
  }
};
// console.log("EMAIL USER:", process.env.EMAIL_USER);
// console.log("EMAIL PASS EXISTS:", !!process.env.EMAIL_PASS);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const googleLogin = async (req, res) => {
  try {
    const { credential, loginAs } = req.body;

    if (!credential) {
      return res.status(400).json({
        message: "Google credential is required"
      });
    }

    if (!loginAs) {
      return res.status(400).json({
        message: "Login type is required"
      });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    const email = payload.email;
    const name = payload.name;

    let user = await User.findOne({ email });

    // Existing account
    if (user) {

      if (user.role !== loginAs) {
        return res.status(403).json({
          message: `This account is not registered as ${loginAs}`
        });
      }

    } else {

      // New Google account
      user = await User.create({
        name,
        email,
        role: loginAs
      });
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h"
      }
    );

    const refreshToken = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.status(200).json({
      message: "Google login successful",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },

      accessToken,
      refreshToken
    });

  } catch (error) {
    console.log("GOOGLE LOGIN ERROR:", error);

    res.status(500).json({
      message: "Google login failed",
      error: error.message
    });
  }
};
