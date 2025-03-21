import { createSlice } from "@reduxjs/toolkit";

const expiry = localStorage.getItem("tokenExpiry")

// const Temptoken = localStorage.getItem("token") 

// if (Date.now() > parseInt(expiry, 10)) {
//         Temptoken = null;
//     }


const initalState = {
        signupData : null,
        loading:false,
        token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")): null,
};

export const  authSlice = createSlice({


        name:"auth",
        initialState : initalState,
        reducers:{

                setSignupData(state,value){
                        state.signupData = value.payload;
                },

                setToken(state,value){
                    state.token = value.payload
                },
                setLoading(state,value){
                        state.loading = value.payload;
                }
        } 
})

export const {setSignupData, setLoading,setToken} = authSlice.actions;
export default authSlice.reducer;