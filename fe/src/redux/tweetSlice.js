import { createSlice,createSelector,createAsyncThunk,} from "@reduxjs/toolkit";
import axios from "axios";
// import {  useSelector } from "react-redux";
const CONFIG_OBJ={
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem("token")
    }
  }

  export const fetchTweets = createAsyncThunk(
    "tweets/fetchtweets", async (_, thunkAPI) => {     
       try {
          //const response = await fetch(`url`); //where you want to fetch data
          //Your Axios code part.
          const response = await axios.get(`http://localhost:4000/tweets`,CONFIG_OBJ);//where you want to fetch data
        //   const response=axios.get(`http://localhost:4000/tweets`,CONFIG_OBJ)
       
          return await response.data.tweets;
        } catch (error) {
           return thunkAPI.rejectWithValue({ error: error.message });
        }
  });

  export const fetchUserTweets = createAsyncThunk(
    "tweets/fetchusertweets", async (_, thunkAPI) => {     
       try {
          const response = await axios.get(`http://localhost:4000/mytweets`,CONFIG_OBJ);
          return await response.data.tweets;
        } catch (error) {
           return thunkAPI.rejectWithValue({ error: error.message });
        }
  });

  export const fetchReplyTweets = createAsyncThunk(
    "tweets/fetchreplytweets", async (tweet, thunkAPI) => {     
       try {
          const response = await axios.get(`http://localhost:4000/tweets/${tweet._id}/replies`,CONFIG_OBJ);
          debugger
          console.log("replies:= ",response)
          return await response.data.replies;
          
        } catch (error) {
           return thunkAPI.rejectWithValue({ error: error.message });
        }
  });



  const tweetSlice = createSlice({
    name: "tweets",
    initialState: {
       tweets: [],
    },
    reducers: {},
    extraReducers: (builder) => {
       builder.addCase(fetchTweets.pending, (state) => {
         state.tweets = [];
       });
       builder.addCase(
        fetchTweets.fulfilled, (state, { payload }) => {
             state.tweets = payload;
       });
       builder.addCase(
        fetchTweets.rejected,(state, action) => {
       });
       builder.addCase(fetchUserTweets.pending, (state) => {
         state.tweets = [];
       });
       builder.addCase(
        fetchUserTweets.fulfilled, (state, { payload }) => {
             // add the user tweets to the state
             state.tweets = payload;
       });
       builder.addCase(
        fetchUserTweets.rejected,(state, action) => {
       });
       builder.addCase(fetchReplyTweets.pending, (state) => {
        state.tweets = [];
      });
      builder.addCase(
        fetchReplyTweets.fulfilled, (state, { payload }) => {
            // add the user tweets to the state
            state.tweets = payload;
      });
      builder.addCase(
        fetchReplyTweets.rejected,(state, action) => {
      });
     }
 });
 
 
 export const selectTweets = createSelector(
   (state) => ({
      tweets: state.tweets
   }), (state) =>  state
 );

export default tweetSlice.reducer
