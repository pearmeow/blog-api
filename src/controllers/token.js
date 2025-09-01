import db from "../models/index.js";
import jwt from "jsonwebtoken";
import { validPassword } from "../utils/authenticate.js";

export const post = [
    async (req, res) => {
        const { username, password } = req.body;
        const user = await db.readUserFromUsername(username);
        if (!(await validPassword(password, user.password))) {
            return res.status(401).json({});
        }
        const options = {
            algorithm: "HS256",
            expiresIn: "30s",
        };
        jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            options,
            function (err, token) {
                if (err) {
                    return res.status(401).json({});
                }
                return res.json(token);
            },
        );
    },
];
