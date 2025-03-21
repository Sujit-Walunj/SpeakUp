import { toast } from "react-hot-toast";
import apiConnector from "../apiConnector";

import { useParams } from "react-router-dom";
import { complaintEndpoints } from "../apis";
const {POST_COMPLAINTS_API,GET_COMPLAINTS_API,RESOLVE_COMPLAINT,VOTE_API}= complaintEndpoints

import axios from "axios";

export const postComplaint = async (data, token, groupId) => {

    let result = null;

    try {
    const headers = {
        Authorization: `Bearer ${token}`,};

        const response = await axios.post( POST_COMPLAINTS_API.replace(":groupId", groupId), data, { headers });

        if (!response?.data?.success) {
            throw new Error("Could not post complaint.");
        }

       
        result = response.data;
    } catch (error) {
        console.error("POST_COMPLAINTS_API API ERROR:", error);
        toast.error("Could not post complaint.");
    } 

    return result;
};






export const getComplaints = async (groupId, token) => {
   
    let result = [];

    try {
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        
        const response = await apiConnector("GET",GET_COMPLAINTS_API.replace(":groupId", groupId), { headers });

        if (!response?.data?.success) {
            throw new Error("Could not fetch complaints.");
        }
     
        result = response.data.complaints.complaints
        ; // Assuming complaints are under data.complaints
        toast.success("Complaints loaded successfully.");
    } catch (error) {
        console.error("GET_COMPLAINTS_API API ERROR:", error);
        toast.error("Could not load complaints.");
    }

    
    return result;
};


export const resolveComplaint = async (token, complaintId, groupId) => {
    try {
        
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        // Replace both placeholders correctly
        let url = RESOLVE_COMPLAINT.replace(":complaintId", complaintId);
        url = url.replace(":groupId", groupId);

     

        const response = await axios.post(url, null, { headers });

        if (!response?.data?.success) {
            throw new Error("Could not resolve the complaint.");
        }

        console.log("Complaint resolved:", response.data);
        return response.data;

    } catch (error) {
        console.error("RESOLVE_COMPLAINT API ERROR:", error);
        toast.error("Could not resolve the complaint.");
        return null;
    }
};

export const Vote = async (token, complaintId, groupId) => {
    try {
        
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        // Replace both placeholders correctly
        let url = VOTE_API.replace(":complaintId", complaintId);
        url = url.replace(":groupId", groupId);

     
        console.log("url:",url);
        const response = await axios.post(url, null, { headers });

        if (!response?.data?.success) {
            throw new Error("Could not resolve the complaint.");
        }

        console.log("Complaint resolved:", response.data);
        return response.data;

    } catch (error) {
        console.error("RESOLVE_COMPLAINT API ERROR:", error);
        toast.error("Could not resolve the complaint.");
        return null;
    }
};
