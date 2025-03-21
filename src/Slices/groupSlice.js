import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState  = {
    group:[],
    myGroup:[],
}

const groupSlice = createSlice({
    name:"viewGroup",
    initialState,
    reducers : {
        setGroup:(state,action)=>{
            state.group = action.payload
        },
        setMyGroup:(state,action)=>{
            state.myGroup = action.payload
        }
    },
});

export const {setGroup,setMyGroup} = groupSlice.actions

export default groupSlice.reducer