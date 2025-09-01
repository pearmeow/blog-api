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
    validator.password.optional(),
    validator.confirm.optional(),
    validator.boolParamFactory("isAuthor").optional(),
    validator.boolParamFactory("isAdmin").optional(),
    validator.validateResults,
    async (req, res) => {
        const { userId } = req.params;
        if (!req.body) {
            return res.end();
        }
        const { password, confirm, isAuthor, authorCode, isAdmin, adminCode } =
            req.body;
        const errors = [];
        // edge case where user types password but leaves confirm empty
        let hashedPass = password;
        if (password && password !== confirm) {
            errors.push({ msg: "Passwords must match" });
        } else if (password) {
            hashedPass = await hashPassword(password);
        }
        if (isAuthor && authorCode !== process.env.AUTHOR_CODE) {
            errors.push({ msg: "Author code is invalid" });
        }
        if (isAdmin && adminCode !== process.env.ADMIN_CODE) {
            errors.push({ msg: "Admin code is invalid" });
        }
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }
        res.json(
            await db.updateUser({
                id: Number(userId),
                password: hashedPass,
                isAuthor,
                isAdmin,
            }),
        );
    },
];

export const delId = [
    passport.authenticate("jwt", { session: false }),
    validator.idParamFactory("userId"),
    validator.validateResults,
    async (req, res) => {
        const { userId } = req.params;
        if (req.user.id === Number(userId) || req.user.isAdmin) {
            return res.json(await db.deleteUser(Number(userId)));
        }
        return res.status(401).end();
    },
];
