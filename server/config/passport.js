const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const UserModel = require("../models/user");
const { secretOrKey } = require('./keys');
const cookieParser = require('cookie-parser'); // Ensure you have this middleware to parse cookies

// Custom extractor function to extract JWT from cookies
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['token']; // Replace 'token' with the name of your cookie
  }
  return token;
};

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]), // Use the custom cookie extractor
  secretOrKey,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      if (jwt_payload.userType === "external") {
        return done(null, true);
      } else {
        const user = await UserModel.findOne({ _id: jwt_payload.id });
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      }
    } catch (err) {
      return done(err, false);
    }
  })
);