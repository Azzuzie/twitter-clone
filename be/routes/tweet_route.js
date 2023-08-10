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
    const { content,image } = req.body;
    const { _id } = req.user;


    // Create a new tweet
    const newTweet = new Tweet({
      content,
      image,
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
  console.log("entern like")
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
    console.log("entern dislike")
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
  

// router.post('/tweet/:id/reply', protected, async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { content } = req.body;
//       const { _id } = req.user;
  
//       // Find the tweet
//       const tweet = await Tweet.findById(id);
//       if (!tweet) {
//         return res.status(404).json({ message: 'Tweet not found' });
//       }
  
//       // Create a new reply tweet
//       const newReply = new Tweet({
//         content,
//         tweetedBy: _id,
//       });
  
//       // Save the reply tweet to the database
//       await newReply.save();
  
//       // Add the reply tweet ID to the parent tweet's replies array
//       tweet.replies.push(newReply._id);
  
//       // Save the parent tweet to the database
//       await tweet.save();
  
//       return res.status(201).json({ message: 'Reply tweet created successfully' });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Internal Server Error' });
//     }
//   });


  //all users posts
  router.get("/tweets", protected, (req, res) => {
    // console.log("entered to get tweets")
    Tweet.find()
      .sort({ createdAt: -1 })
      .populate("tweetedBy", "_id name username profilePicture dateOfBirth location")
      // .populate("comments.commentedBy", "_id fullName ")
      .then((tweets) => {
        return res.status(200).json({ tweets: tweets });
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //replies of a paarticular tweet
  router.get("/tweets/:tweetId/replies", protected, (req, res) => {
    // console.log("entered replies restapi")
    const tweetId = req.params.tweetId;
    Tweet.findById(tweetId)
      .populate("replies.repliedBy", "_id name username profilePicture dateOfBirth location")
      .then((tweet) => {
        if (!tweet) {
          return res.status(404).json({ error: "Tweet not found" });
        }
        return res.status(200).json({ replies: tweet.replies });
      })
      .catch((error) => {
        console.log(error);
      });
  });

   //Add reply to a tweet
   router.post("/tweet/:tweetId/addReply", protected, (req, res) => {
    const tweetId = req.params.tweetId;
    const content = req.body.content;
   console.log("reply added to",tweetId)
    const newReply = new Tweet({
      content,
      tweetedBy: req.user.id,
    });
  
    Tweet.findByIdAndUpdate(
      tweetId,
      {
        $push: {
          replies: {
            content: newReply.content, // Add the content to the 'replies' array
            repliedBy: newReply.tweetedBy,
          },
        },
      },
      { new: true }
    )
      .then((tweet) => {
        if (!tweet) {
          return res.status(404).json({ error: "Tweet not found" });
        }
        return res.status(200).json({ tweet });
      })
      .catch((error) => {
        console.log(error);
      });
  });
  
  
  
  
  
  
  

module.exports = router;
