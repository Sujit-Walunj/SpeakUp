const express = require("express");
const router = express.Router();
const { auth, isMember, isAdmin } = require("../Middlewares/auth");
const { deleteComplaint, myComplaint, postComplaint ,getComplaintsByGroup, Resolve,toggleVoteOnComplaint } = require("../Controllers/Complaints");


router.post("/group/:groupId/post-complaint", auth,isMember, postComplaint);

router.delete("/delete-complaint/:complaintId", auth, isMember, deleteComplaint);

router.get("/my-complaints", auth, isMember, myComplaint);

router.get('/group/:groupId/complaints', auth, getComplaintsByGroup);

router.post('/resolve-complaint/:groupId/:complaintId',auth,isAdmin,Resolve)

router.post('/vote-complaint/:groupId/:complaintId',auth,isMember,toggleVoteOnComplaint)

module.exports = router;