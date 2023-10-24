import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import passport from "passport";
import { prisma } from "../index";
import { IJWT } from "./interfaces/authentication.interface";



export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: process.env.JWT_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload: IJWT, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { username: payload.user.username },
      });
      if (user) {
        done(null, user);
      } else {
        done({ code: "403" }, false);
      }
    } catch (e) {
      done(e, false);
    }
  }
);

passport.use(jwtStrategy);

export const authJwt = passport.authenticate("jwt", {
  session: false,
});
