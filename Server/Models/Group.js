const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true,
        trim: true
    },
    groupDescription: {
        type: String,
        trim: true
    },
    Admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    complaints: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Complaint"
    }],
    thumbnail: {
        type: String,
        trim: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    code: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Group", groupSchema);