// routes/auth.js
const express=require('express')
const router=express.Router()
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const User=mongoose.model("User")
const Tweet=mongoose.model("Tweet")
const {JWT_SECRET}=require('../config')
const protected=require('../middleware/protected')

router.get('/user/:id', protected, async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the user by ID
      const user = await User.findById(id)
        .select('-password') // Exclude the password field
        .populate('followers', 'name username') // Populate followers with selected fields
        .populate('following', 'name username'); // Populate following with selected fields
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });



router.post('/user/:id/follow',protected, async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;

    // Check if the logged-in user is trying to follow themselves
    if (id === _id) {
      return res.status(400).json({ message: 'You cannot follow yourself' });
    }

    // Find the logged-in user
    const loggedInUser = await User.findById(_id);
    if (!loggedInUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the user to follow
    const userToFollow = await User.findById(id);
    if (!userToFollow) {
      return res.status(404).json({ message: 'User to follow not found' });
    }

    // Check if the logged-in user is already following the user
    if (loggedInUser.following.includes(id)) {
      return res.status(400).json({ message: 'You are already following this user' });
    }

    // Add the user to follow ID to the logged-in user's following array
    loggedInUser.following.push(id);
    await loggedInUser.save();

    // Add the logged-in user's ID to the user to follow's followers array
    userToFollow.followers.push(_id);
    await userToFollow.save();

    return res.status(200).json({ message: 'User followed successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});



router.post('/user/:id/unfollow',protected, async (req, res) => {
    try {
      const { id } = req.params;
      const { _id } = req.user;
  
      // Check if the logged-in user is trying to unfollow themselves
      if (id === _id) {
        return res.status(400).json({ message: 'You cannot unfollow yourself' });
      }
  
      // Find the logged-in user
      const loggedInUser = await User.findById(_id);
      if (!loggedInUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find the user to unfollow
      const userToUnfollow = await User.findById(id);
      if (!userToUnfollow) {
        return res.status(404).json({ message: 'User to unfollow not found' });
      }
  
      // Check if the logged-in user is following the user to unfollow
      if (!loggedInUser.following.includes(id)) {
        return res.status(400).json({ message: 'You are not following this user' });
      }
  
      // Remove the user to unfollow ID from the logged-in user's following array
      loggedInUser.following = loggedInUser.following.filter((followId) => followId.toString() !== id);
      await loggedInUser.save();
  
      // Remove the logged-in user's ID from the user to unfollow's followers array
      userToUnfollow.followers = userToUnfollow.followers.filter((followerId) => followerId.toString() !== _id.toString());
      await userToUnfollow.save();
  
      return res.status(200).json({ message: 'User unfollowed successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  // Endpoint PUT /api/user/:id/
// Only allow name, date of birth, and location data of the user
// Because other data once created can’t be changed eg. username, email
// accept the name, date of birth and location data from req.body
// Add the necessary validations
// Finally save the edited user in DB

router.put('/user/:id', protected, async(req, res) => {
    // Get the user ID from the request path
    const {id} = req.params;
    console.log(req.body)
    // Get the name, date of birth, and location from the request body
    const {name,dateOfBirth,location} = req.body;
  
    // Validate the data
    if (!name) {
      res.status(400).send('Please provide a name');
      return;
    }
  
    if (!dateOfBirth) {
      res.status(400).send('Please provide a date of birth');
      return;
    }
  
    if (!location) {
      res.status(400).send('Please provide a location');
      return;
    }
  
    // Update the user in the database
    const user = await User.findById(id);
    user.name = name;
    user.dateOfBirth = dateOfBirth;
    user.location = location;
    await user.save();
  
    // Return the updated user
    res.send(user);
  });

  // Endpoint POST /api/user/:id/tweets
// This API will return list of all the tweets tweeted by a user

router.post('/user/:id/tweets', protected, async(req, res) => {
    // Get the user ID from the request path
    const {id} = req.params;
    // Get the tweets from the database
    const tweets = await Tweet.find({
        tweetedBy: id
    });
  console.log(tweets)
    // Return the tweets
    res.send(tweets);
  });
  

  

  module.exports = router;