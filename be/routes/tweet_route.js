// routes/tweets.js
const express=require('express')
const router=express.Router()
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const Tweet=mongoose.model("Tweet")
const {JWT_SECRET}=require('../config')
const protected=require('../middleware/protected')

router.post('/tweet', protected, async (req, res) => {
  try {
    const { content } = req.body;
    const { _id } = req.user;


    // Create a new tweet
    const newTweet = new Tweet({
      content,
      tweetedBy: _id,
    });

    // Save the tweet to the database
    await newTweet.save();

    return res.status(201).json({ message: 'Tweet created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error while saving' });
  }
});

router.post('/tweet/:id/like', protected, async (req, res) => {
    try {
      const { id } = req.params;
      const { _id } = req.user;
  
      // Find the tweet
      const tweet = await Tweet.findById(id);
      if (!tweet) {
        return res.status(404).json({ message: 'Tweet not found' });
      }
  
      // Check if the tweet is already liked
      if (tweet.likes.includes(_id)) {
        return res.status(400).json({ message: 'Tweet already liked' });
      }
  
      // Add the user ID to the likes array
      tweet.likes.push(_id);
  
      // Save the tweet to the database
      await tweet.save();
  
      return res.status(200).json({ message: 'Tweet liked successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });


  router.post('/tweet/:id/dislike', protected, async (req, res) => {
    try {
      const { id } = req.params;
      const { _id } = req.user;
  
      // Find the tweet
      const tweet = await Tweet.findById(id);
      if (!tweet) {
        return res.status(404).json({ message: 'Tweet not found' });
      }
  
      // Check if the tweet is liked
      if (!tweet.likes.includes(_id)) {
        return res.status(400).json({ message: 'Tweet not liked' });
      }
  
      // Remove the user ID from the likes array
      console.log(_id)
      tweet.likes = tweet.likes.filter((like) => like.toString() !== _id.toString());
      console.log(tweet.likes)
      // Save the tweet to the database
      await tweet.save();
      
      return res.status(200).json({ message: 'Tweet disliked successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

router.post('/tweet/:id/reply', protected, async (req, res) => {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const { userId } = req;
  
      // Find the tweet
      const tweet = await Tweet.findById(id);
      if (!tweet) {
        return res.status(404).json({ message: 'Tweet not found' });
      }
  
      // Create a new reply tweet
      const newReply = new Tweet({
        content,
        tweetedBy: userId,
      });
  
      // Save the reply tweet to the database
      await newReply.save();
  
      // Add the reply tweet ID to the parent tweet's replies array
      tweet.replies.push(newReply._id);
  
      // Save the parent tweet to the database
      await tweet.save();
  
      return res.status(201).json({ message: 'Reply tweet created successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });


//   const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './images');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.originalname.split('.').pop();
//     const filename = `profile-pic-${Date.now()}.${ext}`;
//     cb(null, filename);
//   }
// });

// router.post('/api/user/:id/uploadProfilePic', multer({storage: storage}), async(req, res) => {
//   // Get the user ID from the request path
//   const id = req.params.id;

//   // Get the file from the request
//   const file = req.file;

//   // Save the file to disk
//   await file.save();

//   // Update the user profile picture in the database
//   const user = await User.findById(id);
//   user.profilePic = `/images/${file.filename}`;
//   await user.save();

//   // Return the success message
//   res.send('Profile picture uploaded successfully');
// });



module.exports = router;
