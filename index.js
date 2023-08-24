const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("./model/user");
const productRouter = require("./routes/productRoutes");
const authRouter = require("./routes/authRoutes");
const config = require("./config/config");

const app = express();

// Passport middleware
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});

// Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: config.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
          return done(null, user);
        }
        const newUser = new User({
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          email: profile.emails[0].value,
          country_code: "",
          phone_number: "",
          role: "user",
          password: "",
          cart: [],
          wishlist: [],
          orders: [],
        });
        const savedUser = await newUser.save();
        return done(null, savedUser);
      } catch (error) {
        done(error);
      }
    }
  )
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use("/auth", authRouter);
app.use("/product", productRouter);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app
      .listen(config.PORT, () => {
        console.log(`Server is listening on port ${config.PORT}`);
      })
      .on("error", (err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });
