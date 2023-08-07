// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default:'https://tse4.mm.bing.net/th?id=OIP.MXXcVA3-a55KwAUXCG5HAAHaE8&pid=Api&P=0&h=180'
  },
  location: String,
  dateOfBirth:{
    type:Date,
    default:1111-11-11
  } ,
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
