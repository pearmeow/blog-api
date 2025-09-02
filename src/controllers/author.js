import db from "../models/index.js";
import { hashPassword } from "../utils/authenticate.js";
import * as validator from "../middleware/validator.js";
import passport from "passport";

export const get = [
    passport.authenticate("jwt", { session: false }),
    validator.isAuthor,
    async (req, res) => {
        res.json(await db.readAuthor());
    },
];

export const getId = [
    passport.authenticate("jwt", { session: false }),
    validator.isAuthor,
    validator.idParamFactory("authorId"),
    validator.validateResults,
    async (req, res) => {
        const { authorId } = req.params;
        res.json(await db.readAuthorById(Number(authorId)));
    },
];

export const post = [
    validator.username,
    validator.password,
    validator.confirm,
    validator.validateResults,
    async (req, res) => {
        const { username, password, authorcode } = req.body;
        if (authorcode !== process.env.AUTHOR_CODE) {
            return res.status(401).end();
        }
        res.json(await db.createAuthor(username, await hashPassword(password)));
    },
];

export const putId = [
    passport.authenticate("jwt", { session: false }),
    validator.idParamFactory("authorId"),
    validator.password,
    validator.confirm,
    validator.validateResults,
    async (req, res) => {
        const { authorId } = req.params;
        if (!req.body) {
            return res.end();
        }
        const { password } = req.body;
        const hashedPass = await hashPassword(password);
        res.json(
            await db.updateAuthor({
                id: Number(authorId),
                password: hashedPass,
            }),
        );
    },
];

export const delId = [
    passport.authenticate("jwt", { session: false }),
    validator.isAuthor,
    validator.idParamFactory("authorId"),
    validator.validateResults,
    async (req, res) => {
        const { authorId } = req.params;
        if (req.user.id === Number(authorId)) {
            return res.json(await db.deleteAuthor(Number(authorId)));
        }
        return res.status(401).end();
    },
];
