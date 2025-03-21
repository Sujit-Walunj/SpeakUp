const User = require("../Models/User");
const Complaint = require("../Models/Complaint");
const Group = require("../Models/Group")


exports.deleteAccount = async (req, res) => {
    try {
      const id = req.user.id;
      console.log(id);
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // delete all complaints

      for (const complaintId of user.complaints) {
        await Complaint.findByIdAndDelete(
          complaintId
        );
      }
      // delete user from all present group

      for (const groupId of user.groups) {
        await Group.findByIdAndUpdate(
          groupId,
          { $pull: { members: id } },
          { new: true }
        );
      }
  
      await User.findByIdAndDelete({ _id: id });
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
     
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "User Cannot be deleted successfully" });
    }
  };