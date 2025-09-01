import db from "../models/index.js";
import { hashPassword } from "../utils/authenticate.js";
import * as validator from "../middleware/validator.js";
import passport from "passport";

export const get = [
    passport.authenticate("jwt", { session: false }),
    validator.isAdmin,
    async (req, res) => {
        res.json(await db.readUser());
    },
];

export const getId = [
    passport.authenticate("jwt", { session: false }),
    validator.isAdmin,
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
    validator.confirm,
    validator.validateResults,
    async (req, res) => {
        const { username, password } = req.body;
        res.json(await db.createUser(username, await hashPassword(password)));
    },
];

export const putId = [
    passport.authenticate("jwt", { session: false }),
    validator.idParamFactory("userId"),
    validator.boolParamFactory("isAuthor", "Author status").optional(),
    validator.boolParamFactory("isAdmin", "Admin status").optional(),
    validator.validateResults,
    async (req, res) => {
        const { userId } = req.params;
        const { isAuthor, isAdmin } = req.body;
        // TODO: add keys to validate if user can promote to Author/Admin
        // For now any user can promote themselves which is pretty dangerous
        // No need for password (!also dangerous!) because of jwt
        res.json(await db.updateUser({ userId, isAuthor, isAdmin }));
    },
];

export const delId = [
    passport.authenticate("jwt", { session: false }),
    validator.idParamFactory("userId"),
    validator.validateResults,
    async (req, res) => {
        const { userId } = req.params;
        if (req.user.id === userId || req.user.isAdmin) {
            return res.json(await db.deleteUser(userId));
        }
        return res.status(401).end();
    },
];
