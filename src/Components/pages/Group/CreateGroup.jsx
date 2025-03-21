import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { createGroup, joinGroup } from "../../../Services/Operations/groupAPI";
import Modal from "../../common/Modal";
import { setGroup } from "../../../Slices/groupSlice";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [code, setCode] = useState("");
  const [isCreatingGroup, setIsCreatingGroup] = useState(true);
  const [createdGroup, setCreatedGroup] = useState(null);

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!token) {
      toast.error("Authentication token not found");
      return;
    }

    if (isCreatingGroup) {
      const data = {
        groupName,
        groupDescription,
      };

      try {
        const response = await createGroup(data, token);

        if (response && response.success) {
          
          toast.success("Group created successfully");
          dispatch(setGroup(response.group));
          setCreatedGroup(response.group);
        } else {
          throw new Error(response ? response.message : "No response from server");
        }
      } catch (error) {
        console.error("Error creating group:", error);
        toast.error(error.message || "Failed to create group");
      }
    } else {
      const data = { code };

      try {
        const response = await joinGroup(token, data);

        if (response && response.success) {
          console.log("Joined Successfully:", response.message);
          toast.success("Joined the group successfully");
        } else {
          throw new Error(response ? response.message : "No response from server");
        }
      } catch (error) {
        console.error("Error joining group:", error);
        toast.error(error.message || "Failed to join group");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-6 bg-blue-50 text-slate-800 rounded-lg shadow-lg">
        {createdGroup ? (
          <Modal group={createdGroup} />
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">
              {isCreatingGroup ? "Create a New Group" : "Join an Existing Group"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {isCreatingGroup ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Group Name
                    </label>
                    <input
                      type="text"
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                      required
                      className="block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Group Description
                    </label>
                    <textarea
                      value={groupDescription}
                      onChange={(e) => setGroupDescription(e.target.value)}
                      required
                      className="block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Group Code
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    className="block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              )}


              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setIsCreatingGroup(!isCreatingGroup)}
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  {isCreatingGroup ? "Join a Group" : "Create a Group"}
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center mt-4 sm:mt-0 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                  justify-center"
                >
                  {isCreatingGroup ? "Create Group" : "Join Group"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateGroup;
