const express = require("express");
const router = express.Router();
const { auth, isMember } = require("../Middlewares/auth");
const { joinGroup, leaveGroup, getAllGroups, getGroup } = require("../Controllers/Group");

// Join a group
router.post("/join-group",auth,joinGroup);

// Leave a group
router.post("/leave-group", auth, async (req, res, next) => {
    try {
        await leaveGroup(req, res);
    } catch (error) {
        next(error);
    }
});

// Get all groups
router.get("/get-all-groups", auth, getAllGroups)

// Get specific group
router.get("/get-details/:groupId", auth, isMember, getGroup);

module.exports = router;
