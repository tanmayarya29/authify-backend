const express = require("express");
const passport = require("passport");
const authController = require("../controller/authController");
const { generateTokenByRefresh } = require("../middleware/auth");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.post("/token", generateTokenByRefresh);

// Google OAuth
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  authController.googleCallback
);

module.exports = router;
