const Group = require("../Models/Group");
const User = require("../Models/User");
const mongoose = require("mongoose");

const crypto = require('crypto');


exports.createGroup = async (req, res) => {
    try {
        const { groupName, groupDescription} = req.body;
        const { userId } = req.user;

        // Check for required fields
        if (!groupName || !groupDescription) {
            return res.status(400).json({
                success: false,
                message: "Group name, description are required."
            });
        }

        // Generate a unique group code
        const code = crypto.randomBytes(3).toString('hex'); // 6-character hex code

        const group = new Group({
            groupName,
            groupDescription,
            Admin: userId,
            code, // Include the generated code
            members: [userId]
        });

        await group.save();

        await User.findByIdAndUpdate(userId, {
            $push: { groups: group._id }
        });
        console.log("group created successfully");
         return res.status(200).json({
            success: true,
            message: "Group created successfully",
            group,
            code // Send the code in the response
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Failed to create group"
        });
    }
};


exports.renameGroup = async (req, res) => {
    try {
        const { groupId, newName } = req.body;
        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({
                success: false,
                message: "Group not found"
            });
        }

        const userId = req.user.id;
        const uid = new mongoose.Types.ObjectId(userId);
        const isAdmin = group.Admin.includes(uid);

        if (isAdmin) {
            group.groupName = newName;
            await group.save();

            res.status(200).json({
                success: true,
                message: "Group renamed successfully",
                group
            });
        } else {
            return res.status(403).json({
                success: false,
                message: "Only admin can rename group"
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to rename group"
        });
    }
};

exports.removeUser = async (req, res) => {
    try {
        const { groupId, userId } = req.body;

        const group = await Group.findByIdAndUpdate(groupId, {
            $pull: { members: userId }
        }, { new: true });

        if (!group) {
            return res.status(404).json({
                success: false,
                message: "Group not found"
            });
        }

        await User.findByIdAndUpdate(userId, {
            $pull: { groups: groupId }
        });

        res.status(200).json({
            success: true,
            message: "User removed from group successfully",
            group
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to remove user from group"
        });
    }
};

exports.joinGroup = async (req, res) => {
    try {
        const { code } = req.body;
        const userId = req.user.userId;

        if (!code || !userId) {
            return res.status(400).json({
                success: false,
                message: "Group code and user ID are required"
            });
        }

        // Check if the group exists
        const group = await Group.findOne({ code });
        if (!group) {
            return res.status(404).json({
                success: false,
                message: "Invalid Group Code"
            });
        }

        const uid = new mongoose.Types.ObjectId(userId);

        // Check if the user is already a member
        if (group.members.includes(uid)) {
            return res.status(200).json({
                success: true,
                message: "Already a member of the group"
            });
        }

        // Add user to the group
        group.members.push(uid);
        await group.save();

        // Update the user's group list
        await User.findByIdAndUpdate(
            uid,
            { $push: { groups: group._id } },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "User added to group successfully"
        });

    } catch (err) {
        console.error("Error joining group:", err);
        return res.status(500).json({
            success: false,
            message: "Cannot join group"
        });
    }
};
exports.leaveGroup = async (req, res) => {
    try {
        const { code } = req.body;
        const { userId } = req.user;

        const group = await Group.findOne({ code });
        if (!group) {
            return res.status(404).json({
                success: false,
                message: "Invalid Group Code"
            });
        }

        const uid = new mongoose.Types.ObjectId(userId);

        if (!group.members.includes(uid)) {
            return res.status(200).json({
                success: false,
                message: "Not a member of the group"
            });
        }

        group.members = group.members.filter(member => !member.equals(uid));
        await group.save();

        await User.findByIdAndUpdate(
            uid,
            { $pull: { groups: group._id } },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "User removed from group successfully"
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Cannot leave group"
        });
    }
};

exports.getAllGroups = async (req, res) => {
  try {

    const {userId} = req.user;
    
   
    let userDetails = await User.findById(userId)
      .populate('groups')
      .exec();

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userId}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: userDetails.groups,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getGroup = async (req, res) => {
    try {

       
        const { groupId } = req.params;

        const groupDetails = await Group.findById(groupId)
            .populate("Admin")
            .populate({
                path: "complaints",
                populate: {
                    path: "publisher",
                },
            })
            .populate({
                path:"members",
                populate:{
                    path:"username",
                }
            })
            .exec();

        if (!groupDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find group with id ${groupId}`,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Group details fetched successfully",
            data: groupDetails,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
