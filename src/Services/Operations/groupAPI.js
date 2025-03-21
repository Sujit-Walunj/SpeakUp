import { toast } from "react-hot-toast";
import apiConnector from "../apiConnector";
import { groupEndpoints } from "../apis";
import axios from 'axios';

const {
  GET_ALL_GROUP_API,
  GET_GROUP_API,
  CREATE_GROUP_API,
  DELETE_GROUP_API, // Ensure this endpoint is defined if needed
  JOIN_GROUP_APT,
} = groupEndpoints;



export const getAllGroup = async (token) => {
  let result = [];

  try {
    const headers = {
      Authorization: `Bearer ${token}`, // Correctly formatted header
    };

    const response = await apiConnector('GET', GET_ALL_GROUP_API, { headers });

    if (!response?.data?.success) {
      throw new Error("Could not fetch group data.");
    }
    
    result = response?.data?.data;
  } catch (error) {
    console.error("GET_ALL_GROUP_API API ERROR:", error);
    toast.error("Could not fetch group data.");
  }
  
  return result;
};


export const createGroup = async (data, token) => {
 
  let result = null;

  try {

    const headers = {
      Authorization: `Bearer ${token}`, // Make sure the token is correctly formatted
    };
    
    const response = await axios.post(CREATE_GROUP_API, data, { headers }); // Assuming axios is used
    
    if (!response?.data?.success) {
      throw new Error("Could not add group details.");
    }
    
    result = response.data; // Ensure you are accessing the correct property
  } catch (error) {
    console.error("CREATE_GROUP_API API ERROR:", error);
    toast.error("Could not create group.");
  }
  
  return result;
};

//  join a group
export const joinGroup = async (token,data)=>{
    let result = null;
  try {

    const headers = {
      Authorization: `Bearer ${token}`, // Make sure the token is correctly formatted
    };
    
    const response = await axios.post(JOIN_GROUP_APT, data, { headers }); // Assuming axios is used
    
    if (!response?.data?.success) {
      throw new Error("Could not add group details.");
    }
    
    result = response.data; // Ensure you are accessing the correct property
  } catch (error) {
    console.error("CREATE_GROUP_API API ERROR:", error);
    toast.error("Could not create group.");
  }
  
  return result;
};





// delete Group
export const deleteGroup = async (data, token) => {
  const toastId = toast.loading("Deleting group...");
  try {
    const response = await apiConnector(
      "DELETE",
      DELETE_GROUP_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error("Could not delete group.");
    }
    toast.success("Group deleted successfully.");
  } catch (error) {
    console.error("DELETE_GROUP_API API ERROR:", error);
    toast.error("Could not delete group.");
  }
  toast.dismiss(toastId);
};


// Get full details of a group
export const getGroup = async (token,groupId) => {


  let result = null;
  try {
    const headers = {
      Authorization: `Bearer ${token}`, // Make sure the token is correctly formatted
    };

    const url = GET_GROUP_API.replace(":groupId", groupId);
    const response = await axios.get(url, { headers });
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not get group details.");
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("GET_GROUP_API API ERROR:", error);
    toast.error("Could not get group details.");
  }
  return result;
};
