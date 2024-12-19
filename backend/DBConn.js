const mongoose = require("mongoose");

const DBconnection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://hcoder029:coderhacker@cluster0.kmahy.mongodb.net/ExpenseTracker`
    );
    console.log("connect to database successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = DBconnection;
