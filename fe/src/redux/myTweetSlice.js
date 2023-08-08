import { createSlice,createSelector,createAsyncThunk,} from "@reduxjs/toolkit";
import axios from "axios";
// import { useState } from "react";
const CONFIG_OBJ={
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem("token")
    }
  }

  export const fetchMyTweets = createAsyncThunk(
    "tweets/fetchmytweets", async (_, thunkAPI) => {     
       try {
          //const response = await fetch(`url`); //where you want to fetch data
          //Your Axios code part.
          const response = await axios.get(`http://localhost:4000/mytweets`,CONFIG_OBJ);//where you want to fetch data
        //   const response=axios.get(`http://localhost:4000/tweets`,CONFIG_OBJ)
       
          return await response.data.tweets;
        } catch (error) {
           return thunkAPI.rejectWithValue({ error: error.message });
        }
  });

  const myTweetSlice = createSlice({
    name: "mytweets",
    initialState: {
       mytweets: [],
    },
    reducers: {},
    extraReducers: (builder) => {
       builder.addCase(fetchMyTweets.pending, (state) => {
         state.mytweets = [];
       });
       builder.addCase(
        fetchMyTweets.fulfilled, (state, { payload }) => {
             state.mytweets = payload;
       });
       builder.addCase(
        fetchMyTweets.rejected,(state, action) => {
       });
     }
 });
 
 
 export const selectMyTweets = createSelector(
   (state) => ({
      mytweets: state.mytweets
   }), (state) =>  state
 );

export default myTweetSlice.reducer