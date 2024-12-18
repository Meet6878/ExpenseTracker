const userModel = require("../model/UserModel");


const LoginUserController = (req, res) => {
  try {
  } catch (error) {
    console.log("error", error.message);
    return res.status(400).send({ message: error.message });
  }
};

const GetUserController = (req, res) => {
  try {
     console.log("user in req",req.user);
    const email = req.user.emails[0].value;
    //  console.log("email",email);
    const photos = req.user.photos[0].value;
    // console.log("photos",photos);
    const displayName = req.user.displayName;
    // console.log("displayName",displayName);
    if (!email || !photos || !displayName) {
      return res.status(400).send({ message: "User data not found" });
    }
    return res.status(200).send({ user: { email, photos, displayName } });
  } catch (error) {
    console.log("error", error.message);
    return res.status(400).send({ message: error.message });
  }
};
const UpdateUserController = async (req, res) => {
  const { name } = req.body;
  //const userId = req.user.id;
  const googleUserId = req.user.id; // Assuming req.user contains authenticated user information
  console.log("userid", googleUserId);
  try {
    const user = await userModel.findOneAndUpdate(
      { googleId: googleUserId },
      { name: name },
      { new: true }
    );
    console.log("user", user);
    if (user) {
      res
        .status(200)
        .json({ success: true, message: "Name updated successfully", user });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Failed to update name" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
const LogoutUserController = (req, res) => {
  try {
    return res.status(200).cookie("connect.sid", "", { maxAge: 0 }).send({
      success: true,
      message: "user logged out",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  LoginUserController,
  GetUserController,
  LogoutUserController,
  UpdateUserController,
};
