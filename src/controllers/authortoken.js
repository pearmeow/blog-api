import jwt from "jsonwebtoken";
import db from "../models/index.js";
import * as validator from "../middleware/validator.js";
import { validPassword } from "../utils/authenticate.js";

export const post = [
    validator.username,
    validator.password,
    validator.validateResults,
    async (req, res) => {
        const { username, password } = req.body;
        const author = await db.readAuthorFromUsername(username);
        if (!author) {
            return res.status(401).end();
        }
        if (!(await validPassword(password, author.password))) {
            return res.status(401).end();
        }
        // TODO: Add expiration when pushing to production
        const options = {
            algorithm: "HS256",
        };
        jwt.sign(
            { id: author.id, type: "author" },
            process.env.JWT_SECRET,
            options,
            function (err, token) {
                if (err) {
                    return res.status(401).end();
                }
                return res.json(token);
            },
        );
    },
];
