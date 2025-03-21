const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    attachment: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    vote: {
        type: Number,
        default: 0
    },
    votes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vote"
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model("Complaint", complaintSchema);
