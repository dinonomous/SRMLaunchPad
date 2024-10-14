const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require("../models/user");
const jwt = require('jsonwebtoken');
const { secretOrKey, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('./keys');

// Extract token from cookies
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) token = req.cookies['token'];
  return token;
};

// JWT Strategy
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey,
};
passport.use(new JwtStrategy(jwtOpts, async (jwt_payload, done) => {
  try {
    if (jwt_payload.userType === "external") {
      return done(null, true); // Allow external users (e.g., via Google OAuth)
    }
    const user = await UserModel.findById(jwt_payload.id);
    if (user) return done(null, user);
    return done(null, false);
  } catch (err) {
    return done(err, false);
  }
}));

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:1267/api/v1/user/signin/google/callback',
  passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
  try {
    let user = await UserModel.findOne({ googleId: profile.id });
    if (!user) {
      user = new UserModel({
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
      });
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, secretOrKey, { expiresIn: '1d' });
    return done(null, { token, user });
  } catch (error) {
    return done(error, false);
  }
}));

module.exports = passport;
