import express from "express";
import { registerUser } from "../controllers/auth.controller.js";
import { loginUser } from "../controllers/auth.controller.js";
import { verifyEmail } from "../controllers/auth.controller.js";
import { refreshAccessToken, logoutUser } from "../controllers/auth.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify-email/:token", verifyEmail);
router.get("/refresh-token", refreshAccessToken);
router.post("/logout", logoutUser);

router.get("/protected", auth, (req, res) => {
  res.json({ message: "Protected route accessed!", userId: req.user });
});

export default router;
