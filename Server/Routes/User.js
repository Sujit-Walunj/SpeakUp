const express = require("express");
const router = express.Router();
const { auth } = require("../Middlewares/auth");

const { sendOTP, login, signUp, reset } = require("../Controllers/Auth");

router.post("/sendotp", sendOTP);  // No auth required
router.post("/signup", signUp);    // No auth required
router.post("/login", login);      // No auth required
router.post("/update-password", reset); // No auth required

module.exports = router;