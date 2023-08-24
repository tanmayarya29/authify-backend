const express = require("express");
const passport = require("passport");
const authController = require("../controller/authController"); // Update the path accordingly

const router = express.Router();

// Local Signup
router.post("/signup", authController.signup);

// Local Login
router.post("/login", authController.login);

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
