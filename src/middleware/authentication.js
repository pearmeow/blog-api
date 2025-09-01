import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import db from "../models/index.js";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    algorithms: ["HS256"],
};

const verify = async (payload, done) => {
    try {
        const user = await db.readUserById(payload.id);
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (err) {
        done(err);
    }
};

passport.use(new Strategy(options, verify));
