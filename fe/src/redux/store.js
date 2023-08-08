import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import tweetSlice from "./tweetSlice";
// import myTweetSlice from "./myTweetSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    tweets: tweetSlice
  },
});
