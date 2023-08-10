import { createSlice,createSelector,createAsyncThunk,} from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
const CONFIG_OBJ={
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem("token")
    }
  }


  export const addUser = createAsyncThunk(
    "users/adduser", async (_, thunkAPI) => {  
        const user=JSON.parse(localStorage.getItem("user"))
       try {
          const response = await axios.get(`http://localhost:4000/user/${user.id}`,CONFIG_OBJ);
          console.log(response.data.user)
          return await response.data.user;

        } catch (error) {
           return thunkAPI.rejectWithValue({ error: error.message });
        }
  });

//   export const removeUser = createAsyncThunk(
//     "users/removeuser", async (userId, thunkAPI) => {     
//        try {
//             const response = await axios.delete(`http://localhost:4000/users/{userId}`,CONFIG_OBJ);
//             return await response.data;
//             }
//         catch (error) {
//              return thunkAPI.rejectWithValue({ error: error.message });
//                     }
// });

// export const updateUser = createAsyncThunk(
// "users/updateuser", async (user, thunkAPI) => {     
// try {
// const response = await axios.put(`http://localhost:4000/users/{user.id}`,user,CONFIG_OBJ);
//           return await response.data;
//         } catch (error) {
//            return thunkAPI.rejectWithValue({ error: error.message });
//         }
//   });

  const userSlice = createSlice({
   
    name: "user",
    initialState: {
       user: {},
    },
    reducers: {},
    extraReducers: (builder) => {
       builder.addCase(addUser.pending, (state) => {
         state.user = [];
       });
       builder.addCase(
         addUser.fulfilled, (state, { payload }) => {
             state.user.push(payload);
       });
       builder.addCase(addUser.rejected,(state, action) => {
         
         toast.error("user not added to store please relogin")
         
       });
    //    builder.addCase(removeUser.pending, (state) => {
    //      state.users = [];
    //    });
    //    builder.addCase(
    //      removeUser.fulfilled, (state, { payload }) => {
    //          const index = state.users.indexOf(payload);
    //          state.users.splice(index, 1);
    //    });
    //    builder.addCase(removeUser.rejected,(state, action) => {
    //    });
    //    builder.addCase(updateUser.pending, (state) => {
    //      state.users = [];
    //    });
    //    builder.addCase(
    //      updateUser.fulfilled, (state, { payload }) => {
    //          const index = state.users.indexOf(payload);
    //          state.users.splice(index, 1, payload);
    //    });
    //    builder.addCase(updateUser.rejected,(state, action) => {
    //    });
     }
 });
 
 
 export const selectUsers = createSelector(
   (state) => ({
      user: state.user
   }), (state)=>state)

export default userSlice.reducer
