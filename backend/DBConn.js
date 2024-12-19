const mongoose = require("mongoose");

const DBconnection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://1160meetsathvara:meet6878@cluster0.tjmhndb.mongodb.net/chats`
    );
    console.log("connect to database successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = DBconnection;
