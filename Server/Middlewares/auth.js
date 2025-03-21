const jwt = require("jsonwebtoken");
const User = require("../Models/User");
require("dotenv").config();
const Group = require('../Models/Group')

const cleanToken = (token) => {
    // Remove any extra quotes or spaces from the token
    return token.replace(/['"]+/g, '').trim();
};

exports.auth = async (req, res, next) => {
  try {
      // Extract token from cookies, body, or header
      const token = req.cookies.token ||
                    req.body.token ||
                    (req.header("Authorization") ? req.header("Authorization").replace("Bearer ", "") : null);

 
      if (!token) {
          return res.status(401).json({
              success: false,
              message: "Authentication token is missing"
          });
      }

      // Clean the token to remove any extra quotes
      const cleanedToken = cleanToken(token);

      try {
          // Verify the cleaned token
          const decoded = jwt.verify(cleanedToken, process.env.JWT_SECRET);
         

          req.user = decoded;
         console.log("auth middleware working fine");
          next(); // Proceed to the next middleware or route handler
      } catch (err) {
          console.error('Token verification error:', err.message);
          return res.status(401).json({
              success: false,
              message: "Invalid or expired token",
              error: err.message // Include error message for more context
          });
      }
  } catch (err) {
      console.error('Unexpected error in auth middleware:', err.message);
      return res.status(500).json({
          success: false,
          message: "Internal server error in auth middleware",
          error: err.message // Include error message for more context
      });
  }
};



exports.isMember = async (req, res, next) => {
    try {

        const groupId = req.params.groupId;
       
        if (!groupId) {
            return res.status(400).json({
                success: false,
                message: "Group ID is missing",
            });
        }

        const user = await User.findById(req.user.userId).populate('groups');
       
        const isMember = user.groups.some(group => group._id.toString() === groupId);

        if (!isMember) {
            return res.status(403).json({
                success: false,
                message: "User is not a member of this group",
            });
        }
        console.log("is memeber is working fine");
        next();
    } catch (err) {
        console.error('Error in isMember middleware:', err);
        return res.status(500).json({
            success: false,
            message: "Internal server error in isMember middleware",
            error: err.message,
        });
    }
};


exports.isAdmin = async (req, res, next) => {
    try {
        // Check if user is defined and has the accountType property
        console.log("check 1");
        const groupId = req.params.groupId;
        const complaintId = req.params.complaintId;
       console.log("group id is ",groupId);
        const admin = await Group.findById(groupId).populate("Admin");
        console.log("check 2");
        if(!admin){
            return res.status(404).json({
                success: false,
                message: "group not found to isAdmin middleware"
            });
        }
        
        if (req.user.userId == admin.Admin._id) {
            console.log("check 3");
            console.log("admin middleware working fire");
            return next();
        } else {
            return res.status(403).json({
                success: false,
                message: "Access restricted to Admins only"
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Unable to verify user role"
        });
    }
};