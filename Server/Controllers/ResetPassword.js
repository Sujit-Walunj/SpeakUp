const User = require("../Models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mailSender = require("../utils/mailSender");

exports.resetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User is not registered with us"
            });
        }

        const token = crypto.randomUUID();
        const resetTokenExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes from now

        await User.findOneAndUpdate({ email }, {
            resetToken: token,
            resetTokenExpiry
        }, { new: true });

        const url = `http://localhost:3000/update-password/${token}`;
        await mailSender(email, `Password Reset Link: ${url}`, "Password Reset Link");

        return res.status(200).json({
            success: true,
            message: "Email sent successfully"
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Error in sending email"
        });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        const user = await User.findOne({ resetToken: token });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid or expired token"
            });
        }

        if (user.resetTokenExpiry < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Token has expired"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Error in resetting password"
        });
    }
};