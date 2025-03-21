const Complaint = require("../Models/Complaint");
const User = require("../Models/User");
const Group = require("../Models/Group");
const {Upload} = require("../utils/Upload");
const mongoose = require("mongoose");
const Vote = require('../Models/Vote');
const { combineSlices } = require("@reduxjs/toolkit");
require("dotenv").config();

 // Assuming you have a separate Upload function for Cloudinary

// Add complaints
exports.postComplaint = async (req, res) => {
    try {
        const { description } = req.body;
        const { groupId } = req.params;
        const userId = req.user.userId;

        // Convert userId to ObjectId if necessary
        const uid = new mongoose.Types.ObjectId(userId);

        // Check if the group exists
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({
                success: false,
                message: "Group not found"
            });
        }

        // Check if the description is provided
        if (!description) {
            return res.status(400).json({
                success: false,
                message: "Please enter a description",
            });
        }

        // Handle file upload if an attachment is present
        let attachmentUrl = null;
        if (req.files && req.files.attachment) {
            const attachment = req.files.attachment;
            try {
                const result = await Upload(attachment, process.env.FOLDER);
                attachmentUrl = result.secure_url;
                console.log("File uploaded successfully");
            } catch (uploadError) {
                console.error("Error uploading file:", uploadError);
                return res.status(500).json({
                    success: false,
                    message: "Error uploading file",
                });
            }
        }

        // Check if the user is a member of the group
        if (!group.members.includes(uid)) {
            return res.status(403).json({
                success: false,
                message: "User is not a member of the group",
            });
        }

        // Create the complaint
        const newComplaint = await Complaint.create({
            publisher: userId,
            description,
            attachment: attachmentUrl,
        });

        // Add the complaint to the user and the group
        await User.findByIdAndUpdate(
            uid,
            { $push: { complaints: newComplaint._id } },
            { new: true }
        );

        await Group.findByIdAndUpdate(
            groupId,
            { $push: { complaints: newComplaint._id } },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Complaint posted successfully",
            complaint: newComplaint,  // Optional: Returning the newly created complaint
        });

    } catch (err) {
        console.error("Error in posting complaint:", err);
        return res.status(500).json({
            success: false,
            message: "Error in posting complaint",
        });
    }
};


// my complaints

exports.myComplaint = async (req, res) => {
    try {
        const userId = req.user.id;
        const complaints = await User.findById(userId)
            .populate({
                path: "complaints",
                select: "description attachment status vote",
            })
            .exec();

        return res.status(200).json({
            success: true,
            message: "All complaints fetched",
            data: complaints.complaints,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch complaints",
        });
    }
};

// delete complaints

exports.deleteComplaint = async (req, res) => {
    try {
        // Get complaint ID
        const { complaintId } = req.body;

        // Validate it
        if (!complaintId) {
            return res.status(404).json({
                success: false,
                message: "Please select a valid complaint",
            });
        }

        // Delete it from complaints
        await Complaint.findByIdAndDelete(complaintId);

        // Also remove the complaint reference from User and Group
        await User.updateMany(
            { complaints: complaintId },
            { $pull: { complaints: complaintId } }
        );
        await Group.updateMany(
            { complaints: complaintId },
            { $pull: { complaints: complaintId } }
        );

        return res.status(200).json({
            success: true,
            message: "Complaint deleted successfully",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Failed to delete complaint",
        });
    }
};

// update complaints
// get all complaint within a group
exports.getComplaintsByGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({
                success: false,
                message: "Group not found"
            });
        }


        const complaints = await Group.findById(groupId).populate(
            {
                path: 'complaints',
                populate: {
                    path: "publisher",
                    select: "email"
                },
                select: "description attachment status vote"
            }).exec();

        res.status(200).json({
            success: true,
            complaints
        });
    } catch (error) {
        console.error('Error retrieving complaints:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

exports.Resolve = async (req, res) => {
    try {

        console.log("inside resolve component");
        const complaintId = req.params.complaintId;
        const complaint = await Complaint.findById(complaintId);

        // Step 2: Check if the complaint exists
        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found",
            });
        }

        // Step 3: Toggle the status
        complaint.status = !complaint.status;

        // Step 4: Save the updated complaint
        await complaint.save();

        // Step 5: Respond to the client
        return res.status(200).json({
            success: true,
            message: `Complaint status updated to ${complaint.status ? 'resolved' : 'unresolved'}`,
            complaint,
        });

    } catch (err) {
        console.error("Error in toggling complaint status:", err);
        return res.status(500).json({
            success: false,
            message: "Error in updating complaint status",
        });
    }
};


// upvote 


exports.toggleVoteOnComplaint = async (req, res) => {
    console.log("inside vote controller");
    const { complaintId } = req.params;
    const userId = req.user.userId;

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "User not authenticated"
        });
    }

    try {
        // Check if the user has already voted on this complaint
        let existingVote = await Vote.findOne({ complaint: complaintId, user: userId });

        if (existingVote) {
            // User has voted before, toggle the vote type
            const newVoteType = existingVote.voteType === "upvote" ? "downvote" : "upvote";

            // Update the existing vote
            existingVote.voteType = newVoteType;
            await existingVote.save();

            // Update the complaint's vote count
            let complaint = await Complaint.findById(complaintId);
            if (existingVote.voteType === "upvote") {
                complaint.vote += 1;
            } else {
                complaint.vote -= 1;
            }
            await complaint.save();
        } else {
            // User hasn't voted yet, create a new vote (default to "upvote")
            await Vote.create({ user: userId, complaint: complaintId, voteType: "upvote" });

            // Update the complaint's vote count
            let complaint = await Complaint.findById(complaintId);
            complaint.vote += 1;
            await complaint.save();
        }

        res.status(200).json({
            success: true,
            message: "Vote toggled successfully"
        });
    } catch (error) {
        console.error("Error toggling vote on complaint:", error);
        res.status(500).json({
            success: false,
            message: "Error toggling vote"
        });
    }
};
