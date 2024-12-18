const express = require('express');
const { LoginUserController, GetUserController, LogoutUserController, UpdateUserController } = require('../controller/UserController');


const userRoute = express.Router();

userRoute.post("/login",LoginUserController);
userRoute.get("/login/success",GetUserController);
userRoute.get("/logout",LogoutUserController);
userRoute.put("/update",UpdateUserController);


module.exports = userRoute;