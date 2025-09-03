import jwt from "jsonwebtoken";
import db from "../models/index.js";
import * as validator from "../middleware/validator.js";
import { validPassword } from "../utils/authenticate.js";

export const post = [
    validator.username,
    validator.password,
    async (req, res) => {
        const { username, password } = req.body;
        const user = await db.readUserFromUsername(username);
        if (!user) {
            return res.status(401).end();
        }
        if (!(await validPassword(password, user.password))) {
            return res.status(401).end();
        }
        const options = {
            algorithm: "HS256",
            expiresIn: "60m",
        };
        jwt.sign(
            { id: user.id, type: "user" },
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
