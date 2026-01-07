import jwt from "jsonwebtoken";
import db from "../models/index.js";
import { validPassword } from "../utils/authenticate.js";

export const post = [
    async (req, res) => {
        const { username, password } = req.body;
        const user = await db.readUserFromUsername(username);
        if (!user) {
            return res.status(401).end();
        }
        if (!(await validPassword(password, user.password))) {
            return res.status(401).end();
        }
        // TODO: Add back expiration time
        const options = {
            algorithm: "HS256",
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
