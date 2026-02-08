import db from "../models/index.js";
import { hashPassword } from "../utils/authenticate.js";
import * as validator from "../middleware/validator.js";
import passport from "passport";

export const get = [
    passport.authenticate("jwt", { session: false }),
    validator.isAuthor,
    async (req, res) => {
        res.json(await db.readUser());
    },
];

export const getId = [
    passport.authenticate("jwt", { session: false }),
    validator.isAuthor,
    validator.idParamFactory("userId"),
    validator.validateResults,
    async (req, res) => {
        const { userId } = req.params;
        res.json(await db.readUserById(Number(userId)));
    },
];

export const post = [
    validator.username,
    validator.password,
    validator.confirm,
    validator.validateResults,
    async (req, res) => {
        const { username, password } = req.body;
        let userExists = await db.readUserFromUsername(username);
        if (userExists) {
            return res.status(400).json([{ msg: "User already exists" }]);
        }
        res.json(await db.createUser(username, await hashPassword(password)));
    },
];

export const putId = [
    passport.authenticate("jwt", { session: false }),
    validator.idParamFactory("userId"),
    validator.password,
    validator.confirm,
    validator.validateResults,
    async (req, res) => {
        const { userId } = req.params;
        if (!req.body) {
            return res.end();
        }
        const { password } = req.body;
        const hashedPass = await hashPassword(password);
        res.json(
            await db.updateUser({
                id: Number(userId),
                password: hashedPass,
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
        if (req.user.id === Number(userId) || req.user.type === "author") {
            return res.json(await db.deleteUser(Number(userId)));
        }
        return res.status(401).end();
    },
];
