// routes/auth.js
const express=require('express')
const router=express.Router()
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const User=mongoose.model("User")
const {JWT_SECRET}=require('../config')

router.post('/register', async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if(!name || !email || !username || !password){
      return res.status(402).json({ error:'one or more fields required' });
    }
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } 
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!password || !email) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }
    User.findOne({ email: email })
        .then((userInDB) => {
            if (!userInDB) {
                return res.status(401).json({ error: "Invalid Credentials" });
            }
            bcryptjs.compare(password, userInDB.password)
                .then((didMatch) => {
                    if (didMatch) {
                        const jwttoken=jwt.sign({_id:userInDB._id},JWT_SECRET);
                        const userInfo={"id":userInDB._id,"email":userInDB.email,"fullName":userInDB.name,"username":userInDB.username,"dob":userInDB.dateOfBirth,"location":userInDB.location,"image":userInDB.profilePictu};

                        res.status(200).json({ result: {token:jwttoken,user:userInfo} });
                    } else {
                        return res.status(401).json({ error: "Invalid Credentials" });
                    }
                }).catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        })
});

module.exports = router;
