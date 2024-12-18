const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const DBconnection = require('./DBConn');
const Routes = require('./routes/ExpenseRoute');
const userRoute = require('./routes/UserRoute');


const passport = require("passport");
const session = require("express-session");
const userModel = require('./model/UserModel');

const OAuth2Strategy = require("passport-google-oauth20").Strategy;

const app = express();


const corsOptions = {
  origin: '*', 
  methods: 'GET,POST,PUT,DELETE', 
  credentials: true, 
};

dotenv.config();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors(corsOptions));

app.use("/",()=>{
  console.log("Welcome");
})

// ===============================================================================Google========================================================================================
// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  })
);

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL, // Ensure this matches the URL registered in Google Developer Console
      scope: ["profile", "email"], //Specifies the data to be retrieved from Google (profile information and email).
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log("accessToken",accessToken);
      // console.log("refreshToken",refreshToken);
       console.log("profile",profile);
      try {
        var user = await userModel.findOne({ googleId: profile.id });
       console.log("users",user);
        if (!user) {
          user = new userModel({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });
          await user.save();
        }
        return done(null, profile);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  // This function is used to store the user's information in the session.//+
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Google OAuth routes
app.get(
  "/google/auth",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/google/auth/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5174/expense",
    failureRedirect: "http://localhost:5174/login",
  })
);
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send({ message: "Unauthorized" });
};
//===============================================================================Google =====================================================================================
app.use("/api/v1/user",isAuthenticated, userRoute);
app.use("/api/v1",Routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    DBconnection();
 console.log("listening on",PORT)   
})