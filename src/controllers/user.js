import db from "../models/index.js";
import { hashPassword } from "../utils/authenticate.js";
import * as validator from "../middleware/validator.js";
import passport from "passport";

// TODO: Figure out if this is useless
export const get = async (req, res) => {
    res.json(await db.readUser());
};

// TODO: Figure out if this is useless
export const getId = [
    validator.idParamFactory("userId"),
    validator.validateResults,
    async (req, res) => {
        const { userId } = req.params;
        res.json(await db.readUser(Number(userId)));
    },
];

export const post = [
    validator.username,
    validator.password,
    validator.validateResults,
    async (req, res) => {
        const { username, password } = req.body;
        res.json(await db.createUser(username, await hashPassword(password)));
    },
];

// TODO: validate passcodes for isAuthor and isAdmin to promote user status
// must be logged in to use this route
// maybe separate out password or make it unchangeable so it's not
// coupled with privileges
export const putId = [
    passport.authenticate("jwt", { session: false }),
    validator.idParamFactory("userId"),
    validator.password,
    validator.boolParamFactory("isAuthor", "Author status"),
    validator.boolParamFactory("isAdmin", "Admin status"),
    validator.validateResults,
    async (req, res) => {
        const { userId } = req.params;
        const { password, isAuthor, isAdmin } = req.body;
        res.json(await db.updateUser(userId, password, isAuthor, isAdmin));
    },
];

// TODO: validate if user is admin so deleting is allowed
export const delId = [
    passport.authenticate("jwt", { session: false }),
    validator.idParamFactory("userId"),
    async (req, res) => {
        const { userId } = req.params;
        res.json(await db.deleteUser(userId));
    },
];
