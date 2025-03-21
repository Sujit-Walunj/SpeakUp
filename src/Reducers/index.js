import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Slices/authSlice";
import profileReducer from "../Slices/profileSlice";
import groupReducer from "../Slices/groupSlice"

export const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    viewGroup: groupReducer, // Add the group reducer here
    
});
