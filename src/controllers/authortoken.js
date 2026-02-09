import jwt from "jsonwebtoken";
import db from "../models/index.js";
import { validPassword } from "../utils/authenticate.js";

export const post = [
    async (req, res) => {
        const { username, password } = req.body;
        const author = await db.readAuthorFromUsername(username);
        if (!author) {
            return res.status(401).end();
        }
        if (!(await validPassword(password, author.password))) {
            return res.status(401).end();
        }
        const options = {
            algorithm: "HS256",
            expiresIn: "10h",
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
