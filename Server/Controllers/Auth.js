const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendVerificationEmail } = require("../utils/mailSender");
require("dotenv").config();
const otpGenerator = require("otp-generator");
const OTP = require("../Models/OTP");

// Send OTP
exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        console.log("email is ",email);
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({
                success: false,
                message: "User Already Exist",
            });
        }

        const otp = crypto.randomInt(100000, 1000000).toString(); // Generate a random 6-character OTP
        console.log("generated otp is:", otp);

        // Save OTP to database or send it via email
       
        const otpBody = await OTP.create({email,otp});  // create an entry in db for otp
        console.log(otpBody);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Failed to send OTP"
        });
    }
};

// Sign Up
exports.signUp = async (req, res) => {
    try {
        const { firstname, lastname, email, username, password,confirmPassword,otp } = req.body;


        if(!firstname || !lastname || !email || !username || !password || !confirmPassword  || !otp){
            return res.status(400).json({
                success: false,
                message: "All fields are required here debugging",
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        }

        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (recentOtp.length === 0) {
            return res.status(400).json({
                success: false,
                message: "OTP not found",
            });
        } else if (otp !== recentOtp[0].otp) {
            return res.status(400).json({
                success: false,
                message: "OTP does not match",
            });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstname,
            lastname,
            email,
            username,
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "User registered successfully"
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Failed to register user"
        });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are compulsory",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign(
            {   email:user.email,
                userId: user._id},
            process.env.JWT_SECRET,
            { expiresIn: "2m" }
        );

        user.token = token;
        user.password = undefined;

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            expires:new Date(Date.now()+3*24*60*60*1000)
        });

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user,
            token
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
// Reset Password
exports.reset = async (req, res) => {
    try {
        const { email,  oldPassword, newPassword, confirmNewPassword} = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "Confirm password does not match",
            });
        }

        const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isOldPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Old password does not match",
            });
        }



        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();



        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Failed to reset password"
        });
    }
};