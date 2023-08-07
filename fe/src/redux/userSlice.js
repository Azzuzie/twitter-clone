import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
}

export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        loginSuccess:(state,action)=>{
            state.currentUser=action.payload
        },
        loginError:(state)=>{
            state.currentUser=null
        }
    }
})

export const {loginError,loginSuccess}=userSlice.actions;

export default userSlice.reducer;