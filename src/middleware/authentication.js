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
        let user;
        if (payload.type === "user") {
            user = await db.readUserById(payload.id);
            user.type = "user";
        } else if (payload.type === "author") {
            user = await db.readAuthorFromId(payload.id);
            user.type = "author";
        }
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
