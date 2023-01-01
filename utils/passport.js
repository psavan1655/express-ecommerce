import * as dotenv from "dotenv";
dotenv.config();
import PassportJwt from "passport-jwt";
import User from "../models/User.js";
import passport from "passport";
import { fetchUserById } from "../controllers/user/user.service.js";
import chalk from "chalk";
const JwtStrategy = PassportJwt.Strategy;
const ExtractJwt = PassportJwt.ExtractJwt;

var options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  issuer: process.env.JWT_ISSUER,
};

passport.use(
  new JwtStrategy(options, async function (jwt_payload, done) {
    try {
      const user = await fetchUserById(jwt_payload._id);

      if (user) {
        return done(null, user);
      }

      return done(null, false);
    } catch (error) {
      console.log(chalk.bgRed(error));
      return done(error, false);
    }
  })
);

export const isUserAuthenticated = passport.authenticate("jwt", {
  session: false,
});
