const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    googleId: String,
    name: String,
    image: String,
    role:{
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      //required: true,
    },
  },
  { timeseries: true }
);



const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
