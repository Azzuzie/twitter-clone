// models/Tweet.js
const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  tweetedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  retweetBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  image: String,
  replies: [{
    content: String,
    repliedBy: { type:mongoose.Schema.Types.ObjectId , ref: "User" }
  }],
}, { timestamps: true });

module.exports = mongoose.model('Tweet', tweetSchema);
