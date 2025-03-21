const express = require("express");
const router = express.Router();
const { createGroup, renameGroup, removeUser } = require("../Controllers/Group");
const { auth } = require("../Middlewares/auth");

router.post("/create-group", auth, createGroup);
router.post("/rename-group", auth, renameGroup);
router.post("/remove-user", auth, removeUser);

module.exports = router;