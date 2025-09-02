import db from "../models/index.js";
import jwt from "jsonwebtoken";
import { validPassword } from "../utils/authenticate.js";

export const post = [
    async (req, res) => {
        const { username, password } = req.body;
        const user = await db.readUserFromUsername(username);
        if (!user) {
            return res.status(404).end();
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
