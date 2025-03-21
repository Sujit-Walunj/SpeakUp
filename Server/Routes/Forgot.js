const express = require("express");
const router = express.Router();
const { resetPassword, resetPasswordToken } = require("../Controllers/ResetPassword");

// Route to request a password reset token (no authentication required)


router.post("/reset-password-token", resetPasswordToken);

// Route to reset the password using the token (no authentication required)
router.post("/reset-password", resetPassword);

module.exports = router;