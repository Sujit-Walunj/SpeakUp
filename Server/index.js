const express = require("express");
const app = express();

const userRoutes = require("./Routes/User"); 
const adminRoutes = require("./Routes/Admin");
const complaintRoutes = require("./Routes/Complaints");
const forgotRoutes = require("./Routes/Forgot");
const memberRoutes = require("./Routes/Member");

const cloudinaryConnect = require("./config/cloudinary");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// cloudinary
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 4000;

// Database connection
database.connect();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp"
}));

// Cloudinary connection
cloudinaryConnect();

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/complaint", complaintRoutes);
app.use("/api/v1/forgotPassword", forgotRoutes);
app.use("/api/v1/member", memberRoutes);

// Default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is running...."
    });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong!"
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`App is running at port no ${PORT}`);
});
