const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5 * 60 // expires in 5 minutes
    }
});

// A function to send verification email
async function sendVerificationEmail(email, otp) {
    try {
        const subject = "Your OTP for Verification";
        const message = `Your OTP for verification is: ${otp}. It will expire in 5 minutes. If you did not request this, please contact support.`;
        const mailResponse = await mailSender(email, message, subject);
        console.log("Email sent successfully", mailResponse);
    } catch (err) {
        console.error("Error sending email in OTP schema:", err);
        throw new Error("Failed to send OTP email");
    }
}

// Middleware to send verification email before saving
otpSchema.pre("save", async function(next) {
    try {
        await sendVerificationEmail(this.email, this.otp);
        next();
    } catch (err) {
        next(err); // Pass the error to the next middleware
    }
});

module.exports = mongoose.model("OTP", otpSchema);
