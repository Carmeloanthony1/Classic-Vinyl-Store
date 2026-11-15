const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").GoogleStrategy;
const mongoose = require("mongoose");

const user = mongoose.model("user");

passport.use(
    new GoogleStrategy(
        {
            clientID = process.env.GOOGLE_CLIENT_ID,
            clientSECRET = process.env.GOOGLE_SECRET,
            callbackURL = process.env.GOOGLE_CALLBACK,
        }, 
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ email: profile.emails[0].value });
                if(user){
                    return done (null, user);
                }

                user = new user({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: "google-oauth-login",
                });
                await user.save();
                return done(null, user);
            } catch (error) {
                return done(error, null);
            }

        }
    )
);

module.exports = passport;