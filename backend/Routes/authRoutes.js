import express from "express";

import {
  signup,
  login,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
  googleLogin
} from "../Controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh", refreshAccessToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.post("/google", googleLogin);

export default router;